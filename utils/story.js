const config = require('../config/default')
const PrivateAPI = require('./private-api');
const moment = require('moment')
const momentTz = require('moment-timezone');
var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const store = require('json-fs-store');
//Constaints
const session_id = config.session_id;
const somzid = config.somzid;
const dbURL = "mongodb+srv://admin:admin@schebot-8rhzu.mongodb.net/test?retryWrites=true";
const dbName = 'igbot';

function getTime() {
    return 'Current Time in Unix Timestamp: ' + Math.floor(Date.now() / 1000);
}


async function CheckStory(username, nMin) {
    try {
        var chklastMin = moment().subtract(nMin, 'minute').format('YYYY-MM-DD HH:mm:00');
        var unixLastMin = moment(chklastMin).unix();
        var userID = 1428247354;//347146908;// config[`${username}`][0].id
        const stories = await PrivateAPI.getStories({ id: userID, userid: somzid, sessionid: session_id })

        console.log(stories)
        //end store
        for (const item of stories.items) {
            const chkTime = await CheckValidTime(item, nMin);
            if (chkTime == false) { //Change to True
                //Start Post
                console.log("1------START POST-----");
                var itemCode = item.code;
                const chkdb = await CheckExistDatabase(itemCode);
                console.log("4------Await Check Exist in Database ----- ", chkdb);
                if (chkdb == false) {
                    //NO POST YET
                    var media_type = item.media_type;


                    if (media_type == 1) {

                        var original_width = item.original_width;
                        var original_height = item.original_height;
                        var img_ver2 = item.image_versions2;

                        console.log(original_height, original_width);
                        var candidate = item.image_versions2.candidates;
                        console.log(img_ver2);
                        let img = candidate.find(elem => elem.width == original_width && elem.height == original_height);
                        console.log(img);
                        // var candidates_length = item.image_versions2.candidates.length;
                        // var caption = config[`${username}`][0].title_story + config[`${username}`][0].hashtag + time_taken;
                        // console.log("4.) Candidate Length: ", candidates_length);
                        // for (var i = 0; i < candidates_length; i++) {
                        //     if (img_ver2.candidates[i].width == original_width && img_ver2.candidates[i].height == original_height) { // Maxinum,Original Image
                        //         console.log("5.) found : " + original_width, original_height);
                        //         var img_url = img_ver2.candidates[i].url;
                        //         console.log("6.) Image URL : " + img_url);
                        //         var uploadImage = await UploadMediatoServer(img_url, itemCode, "jpg");
                        //         if (uploadImage == true) {
                        //             console.log("7.) Upload Image Status " + uploadImage);
                        //             //Start Tweet
                        //             await TweetImageAsync(itemCode, caption, username);
                        //         }
                        //     }
                        // }
                    }
                    if (media_type == 2) { //Video
                        // var video_url = item.video_versions[0].url;
                        // console.log("VIDEO URL : " + video_url);

                        // var caption = config[`${username}`][0].title_story + "\n" + config[`${username}`][0].hashtag + "\n" + time_taken;

                        // var uploadVideo = await UploadMediatoServer(video_url, itemCode, "mp4");
                        // if (uploadVideo == true) {
                        //     console.log("3.) Upload Video Status : ", uploadVideo);
                        //     var file_path = `./public/media/${itemCode}.mp4`;
                        //     TweetVideo(file_path, caption, username, itemCode);
                        // }


                    }
                }
            }
        }

    } catch (e) {
        console.error(e.message)
    }

}

async function CheckExistDatabase(itemCode) {
    try {
        const client = await MongoClient.connect(dbURL, { useUnifiedTopology: true });
        const db = client.db(dbName);
        console.log("2---CONNECTED MONGODB---");
        let chkShortCode = await findShortCode_(db, itemCode);
        console.log("3-----Check Short Code----- ", chkShortCode)
        return chkShortCode;
    } catch (e) {
        return e;
    }
}
function CheckValidTime(item, nMin) {
    return new Promise((resolve, reject) => {
        try {
            var taken_at = item.taken_at;
            var taken_at_mm = moment.unix(taken_at);

            var time_taken = momentTz.tz(taken_at_mm, "Asia/Seoul").format('MMM DD YYYY, HH:mm');
            var time_taken_forchk = moment(taken_at_mm).format('YYYY-MM-DD HH:mm:00');
            var chklastMin = moment().subtract(nMin, 'minute').format('YYYY-MM-DD HH:mm:00');
            var validStory = moment(time_taken_forchk).isSameOrAfter(chklastMin);
            resolve(validStory);
        } catch (e) {
            reject(e);
        }

    })
}
const findShortCode_ = function (db, shortcode) {
    // Get the documents collection
    return new Promise((resolve, reject) => {
        try {
            const collection = db.collection('db_ars');
            // Find some documents
            collection.find({ 'shortcode': shortcode }).sort({ 'shortcode': -1 }).toArray(function (err, docs) {
                assert.equal(err, null);
                if (err) reject(err);
                // console.log(docs);
                if (docs.length > 0) {
                    resolve(true);
                } else resolve(false);

            });
        } catch (e) {
            reject(e);
        }

    })

}

module.exports = {
    getTime,
    CheckStory
}