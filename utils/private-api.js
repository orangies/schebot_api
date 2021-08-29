const fetch = require('isomorphic-fetch')
const request = require("request");
//config
const config = require('../config/default');
const sessionid = config.session_id;
const userid = config.somzid;


async function getStories(owner_id) {
    try {
        const headers = {
            'x-ig-capabilities': '3w==',
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            host: 'i.instagram.com'
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://i.instagram.com/api/v1/feed/user/${owner_id}/reel_media/`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
        return e.message;
    }

}


async function getUserInfo(id) {
    try {
        const headers = {
            'x-ig-capabilities': '3w==',
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            host: 'i.instagram.com'
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://i.instagram.com/api/v1/users/${id}/info/`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

async function getUsernameInfo(username) {
    try {
        const headers = {
            'x-ig-capabilities': '3w==',
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            host: 'i.instagram.com'
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://i.instagram.com/api/v1/users/${username}/usernameinfo/`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

async function getFeedUser(username) {
    try {
        const headers = {
            'x-ig-capabilities': '3w==',
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            host: 'i.instagram.com'
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://i.instagram.com/api/v1/feed/user/${username}/username/`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}

async function getMedia(shortcode) {

    try {
        const headers = {
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            'Accept': '*/*',
            'Accept-Language': 'en-US',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'close',
            'Referer': 'https://www.instagram.com',
            'x-requested-with': 'XMLHttpRequest',
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://www.instagram.com/graphql/query/?query_hash=8c1ccd0d1cab582bafc9df9f5983e80d&variables=%7B%22shortcode%22%3A%22${shortcode}%22%2C%22child_comment_count%22%3A3%2C%22fetch_comment_count%22%3A40%2C%22parent_comment_count%22%3A24%2C%22has_threaded_comments%22%3Atrue%7D`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

async function getMediaNormal(shortcode) {
    return new Promise((resolve, reject) => {
        request({
            url: `https://www.instagram.com/p/${shortcode}/?__a=1`,
            json: true
        }, function (error, response, body) {
            if (!error) {
                var nodes = body.graphql.shortcode_media;
                console.log(nodes);
                resolve(nodes);
            } else reject(error);

        });
    })

}

async function getReels(user_highlight_id) {
    //https://i.instagram.com/api/v1/feed/reels_media/?user_ids=highlight:18142006969109114
    try {
        const headers = {
            'x-ig-capabilities': '3w==',
            'user-agent': 'Instagram 9.5.1 (iPhone9,2; iOS 10_0_2; en_US; en-US; scale=2.61; 1080x1920) AppleWebKit/420+',
            host: 'i.instagram.com'
        }
        const _options = {
            headers: Object.assign(headers, {
                cookie: `sessionid=${sessionid}; ds_user_id=${userid}`
            })
        };

        const res = await fetch(`https://i.instagram.com/api/v1/feed/reels_media/?user_ids=highlight:${user_highlight_id}`, _options);
        const data = await res.json();
        return data;
    } catch (e) {
        console.log(e);
    }
}
module.exports = {
    getStories,
    getUserInfo,
    getUsernameInfo,
    getFeedUser,
    getMedia,
    getMediaNormal,
    getReels
}