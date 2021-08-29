const {
    createCipher
} = require('crypto');
const TwitterPackage = require('twitter');
const Twittxt = require('twitter-text');
const config = require('../config/default');
const fs = require('fs');
const {
    off
} = require('process');

async function TwitterUpdateStatus(status, username, replyID) {
    const res = await statusUpdate(status, username, replyID);
    return res;
}

async function TwitterUserShow(_screen_name, username) {
    const res = await userShow(_screen_name, username);
    return res;
}

function statusUpdate(status, username, replyID) {
    return new Promise((resolve, reject) => {
        var secret = config[`${username}`][0].auth; //config[twitter_id];
        var Twitter = new TwitterPackage(secret);
        Twitter.post('statuses/update', {
            status: status,
            in_reply_to_status_id: replyID
        }, function (error, tweet, response) {
            if (error) reject(error);
            else resolve(tweet);
        });
    })
}

function userShow(_screen_name, username) {
    return new Promise((resolve, reject) => {
        var secret = config[`${username}`][0].auth;
        var Twitter = new TwitterPackage(secret);
        Twitter.get('/users/show', {
            screen_name: _screen_name
        }, function (error, data, response) {
            if (error) reject(error);
            else resolve(data);
        });
    })
}

function TwitterUploadMedia(code, username) {
    return new Promise((resolve, reject) => {
        var secret = config[`${username}`][0].auth;
        var Twitter = new TwitterPackage(secret);
        var data = require('fs').readFileSync(`./public/media/${code}.jpg`);
        Twitter.post('media/upload', {
            media: data
        }, function (error, media, response) {
            if (error) reject(error);
            else resolve(media);
        });
    });

}

function TwitterStartTweet(total_msg_tweet, username, media) {
    return new Promise((resolve, reject) => {
        var status = {
            status: total_msg_tweet,
            media_ids: media.media_id_string // Pass the media id string
        }
        var secret = config[`${username}`][0].auth;
        var Twitter = new TwitterPackage(secret);
        Twitter.post('statuses/update', status, function (error, tweet, response) {
            if (error) reject(error);
            else {
                console.log("tweeted!");
                resolve(tweet);
            }
        });
    })

}
async function TwitterUploadVideo(code, total_msg_tweet, username, replyID) {
    var secret = config[`${username}`][0].auth;
    var Twitter = new TwitterPackage(secret);
    var mediaType = 'video/mp4';
    var file_path = `./public/media/${code}.mp4`;
    let mediaData = require('fs').readFileSync(file_path);
    let mediaSize = require('fs').statSync(file_path).size;
    console.log(mediaSize);

    let media = await initUpload();
    let append = await appendUpload(media, mediaSize);
    let returnValue = "";
    console.log("----------APPEND MEDIA RESULT----------", append);
    if (append == "failed") {
        console.log("failed: return value");
        returnValue = append;
        // Failed to Upload Video Then ffmpeg
    } else {
        let finalize = await finalizeUpload(media.media_id_string);
        if (finalize == "failed") {
            //Failed to Upload Video
            returnValue = finalize;
        } else {
            console.log("Media ID : " + media.media_id_string);
            const tweet = await tweetvideo();
            returnValue = tweet;
        }
    }
    console.log('---Return Value is --', returnValue);
    return returnValue;

    function tweetvideo() {
        return new Promise((resolve, reject) => {
            var clean_msg_tweet = total_msg_tweet;
            var status = {
                status: clean_msg_tweet,
                media_ids: media.media_id_string, // Pass the media id string
                in_reply_to_status_id: replyID
            }
            console.log("Start Tweet");

            Twitter.post('statuses/update', status, function (error, tweet, response) {
                if (error) reject(error);
                else resolve(tweet);
            });
        })
    }
    // You now have an uploaded movie/animated gif
    // that you can reference in Tweets, e.g. `update/statuses`
    // will take a `mediaIds` param.'

    // You now have an uploaded movie/animated gif
    // that you can reference in Tweets, e.g. `update/statuses`
    // will take a `mediaIds` param.'
    /**
     * Step 1 of 3: Initialize a media upload
     * @return Promise resolving to String mediaId
     */
    async function initUpload() {
        console.log('--INIT--');
        const data = await makePost('media/upload', {
            command: 'INIT',
            media_category: 'tweet_video',
            total_bytes: mediaSize,
            media_type: mediaType,
        })
        return data;
    }

    /**
     * Step 2 of 3: Append file chunk
     * @param String mediaId    Reference to media object being uploaded
     * @return Promise resolving to String mediaId (for chaining)
     */
    async function appendUpload(media, mediaSize) {
        console.log('--APPEND--');
        var bytes_sent = 0;
        var segment_id = 0;
        var mediaID_Set = [];
        var bufferLength = 5000000;
        var theBuffer = Buffer.alloc(bufferLength);
        var segment_index = 0;
        var offset = 0;
        let appendChunk = "";

        try {
            const fd = await readFileFunction(file_path);
            console.log("fd", fd);
            var bytesRead, data;
            while (offset < mediaSize) {
                console.log("chunk number ", segment_index);
                bytesRead = fs.readSync(fd, theBuffer, 0, bufferLength, null);
                data = bytesRead < bufferLength ? theBuffer.slice(0, bytesRead) : theBuffer;
                var request_data = {
                    command: "APPEND",
                    media_id: media.media_id_string,
                    segment_index: segment_index,
                    media_data: data.toString('base64')
                };
                appendChunk = await makePost('media/upload', request_data);
                offset += bufferLength;
                segment_index++

                if (offset >= mediaSize) {
                    return appendChunk;
                }
            }


        } catch (e) {
            console.log(e);
            return "failed";
        }



    }


    function readFileFunction(file_path) {
        return new Promise((resolve, reject) => {
            fs.open(file_path, 'r', function (err, fd) {
                if (!err) resolve(fd);
                else reject(err);
            });
        })
    }
    /**
     * Step 3 of 3: Finalize upload
     * @param String mediaId   Reference to media
     * @return Promise resolving to mediaId (for chaining)
     */
    async function finalizeUpload(mediaId) {
        console.log('--FINALIZE--');
        const final = await makePost('media/upload', {
            command: 'FINALIZE',
            media_id: mediaId
        });
        return final;
    }

    /**
     * (Utility function) Send a POST request to the Twitter API
     * @param String endpoint  e.g. 'statuses/upload'
     * @param Object params    Params object to send
     * @return Promise         Rejects if response is error
     */
    function makePost(endpoint, params) {
        return new Promise((resolve, reject) => {
            Twitter.post(endpoint, params, (error, data, response) => {
                //console.log("ENDPOINT IS :  " + endpoint);
                //console.log(params);
                console.log(response.body);
                if (error) {
                    console.log(error);
                    resolve("failed");
                } else {
                    //console.log(params);
                    if (params.command == 'FINALIZE') {
                        var mediaID = params.media_id;
                        var status = {
                            command: 'STATUS',
                            media_id: mediaID
                        }

                        var chkProcess = "";
                        var myVar;
                        var index = 0;
                        var count = 0;
                        myFunction();

                        function myFunction() {
                            myVar = setTimeout(myFunction, 5000);
                            if (count <= 10) {

                                Twitter.get('media/upload', status, function (error, result, response) {
                                    console.log("------------------------RESULT OF STATUS --------------------");
                                    if (!error) {
                                        console.log(result);
                                        var chkProcess = result.processing_info.state;
                                        console.log("Check Process ::::::: " + chkProcess);
                                        if (chkProcess == "succeeded") { //success
                                            clearTimeout(myVar);
                                            resolve(data);
                                        } else if (chkProcess == "failed") { //failed
                                            clearTimeout(myVar);
                                            resolve("failed");
                                        }
                                        index += 1;
                                        if (index == 100) {
                                            clearTimeout(myVar);
                                        }
                                    } else {
                                        clearTimeout(myVar);
                                        reject(error);
                                        console.log(error);
                                    }
                                })
                            } else {
                                clearTimeout(myVar);
                                resolve("failed");
                            }


                            count++;
                        }

                    } else {
                        resolve(data);
                    }

                }
            });
        });
    }
}

async function readFile(code) {
    return new Promise((resolve, reject) => {
        try {
            data = require('fs').readFileSync(`./public/media/${code}.jpg`);
            resolve(data);
        } catch (e) {
            reject(e.message);
        }
    })
}
async function TwitterCarouselImageTweet(allData, clean_msg_tweet, username, replyID) {
    try {
        var secret = config[`${username}`][0].auth;
        var Twitter = new TwitterPackage(secret);
        console.log("------Start Carousel Image Function--------");
        console.log(allData);
        var mediaIDSet = [];

        for (var i = 0; i < allData.length; i++) {
            let media = await TwitterUploadMedia(allData[i], username);

            console.log("=====================MEDIA======================");
            console.log(media);
            mediaIDSet.push(media.media_id_string);
            console.log(mediaIDSet.length);
            console.log(mediaIDSet);
            if (mediaIDSet.length == allData.length) {
                //TWEET MESSAGE

                var status = {
                    status: clean_msg_tweet,
                    media_ids: `${mediaIDSet}`, // Pass the media id string
                    in_reply_to_status_id: replyID
                }
                const result = await tweetUpdate(Twitter, status);
                return result;
            }


        }

    } catch (e) {
        console.log(e);
        // return e.message;
    }
}

async function tweetUpdate(Twitter, status) {
    return new Promise((resolve, reject) => {
        try {
            Twitter.post('statuses/update', status, function (error, tweet, response) {
                if (!error) {
                    resolve(tweet);
                } else reject(error);
            });
        } catch (e) {
            console.log(e);
        }
    })

}
async function CleanTotalMessageTweet(fistfixedTxt, hashtagLink, timestmp, num_twt, txtcaption) {
    return new Promise((resolve, reject) => {
        try {
            var moretxt = "...";
            let igcaption = "";
            let total_msg_tweet = "";
            fistfixedTxt = fistfixedTxt; //.replace(/./g, "/.");
            txtcaption = txtcaption.replace(/@/g, "@.");

            let all_msg = fistfixedTxt + hashtagLink + timestmp + txtcaption + num_twt + moretxt;
            var range_all = Twittxt.parseTweet(all_msg);
            if (range_all.valid == false) {
                var range_title = Twittxt.parseTweet(fistfixedTxt + hashtagLink + timestmp + num_twt + moretxt);
                if (range_title.valid == true) { //All must true

                    var valid_range_caption = range_all.validRangeEnd - range_title.validRangeEnd;
                    igcaption = txtcaption.substring(0, valid_range_caption - 30).trim();
                    total_msg_tweet = fistfixedTxt + igcaption + moretxt + num_twt + hashtagLink + timestmp;
                    resolve(total_msg_tweet);
                }
            } else {
                total_msg_tweet = fistfixedTxt + txtcaption + num_twt + hashtagLink + timestmp;
                console.log("tweet valid is true");
                resolve(total_msg_tweet);
            }

        } catch (e) {
            console.log(e);
            reject(e.message);
        }
    })
}
module.exports = {
    TwitterUpdateStatus,
    TwitterUserShow,
    TwitterUploadMedia,
    TwitterStartTweet,
    TwitterUploadVideo,
    TwitterCarouselImageTweet,
    CleanTotalMessageTweet
}