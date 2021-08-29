var fs = require('fs');
var request = require('request');
var ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath('../utils/fluent-ffmpeg/bin/ffmpeg.exe');
// ffmpeg.setFfprobePath('../utils/fluent-ffmpeg/bin/ffprobe.exe');

function streamImage(imageUrl, code) {
    return new Promise((resolve, reject) => {
        try {
            // console.log("----- Start Stream Image -----");
            var stream = request(imageUrl).pipe(fs.createWriteStream(`./public/media/${code}.jpg`));
            stream.on('finish', function () {
                console.log('---stream image done---')
                resolve(true);
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    })
}

function streamVideo(videoUrl, code) {
    return new Promise((resolve, reject) => {
        try {
            var stream = request(videoUrl).pipe(fs.createWriteStream(`./public/media/${code}.mp4`));
            stream.on('finish', function () {
                console.log('---stream video done---')
                var file_path = `public/media/${code}.mp4`;
                resolve(true);
            });
        } catch (e) {
            reject(e);
        }
    })
}

function findDimensionVideo(code) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(`./public/media/${code}.mp4`, function (err, metadata) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                // metadata should contain 'width', 'height' and 'display_aspect_ratio'
                resolve(metadata);
            }
        });
    })
}
async function CompressVideo(code) {
    let dimensions = await findDimensionVideo(code);
    let vid_width = dimensions.streams[0].width;
    let vid_height = dimensions.streams[0].height;
    console.log(vid_width, vid_height);
    //1920 x 1200
    if (vid_height > 1200 || vid_width > 1920) {
        //Compress Video
        console.log("---Compress Video----");
        //let sizeStr = dimensions.width < dimensions.height ? "?x500" : "500x?"; // if width is smaller than height, reduce the height to 500 and calculate width based on that, same goes for the other way around
        let sizeStr = vid_height > 1200 ? "?x1200" : "1920x?";
        let filepath2 = `./public/media/${code}.mp4`;
        let newFilename = await FFMPEGReduceVideo(code, filepath2, sizeStr);
        return newFilename;
    } else {
        return code;
    }
}

function FFMPEGReduceVideo(code, filepath2, sizeStr) {
    return new Promise((resolve, reject) => {
        ffmpeg(filepath2) // the input is the original video, don't worry 'ffmpeg' won't alter the input file
            .output(`./public/media/${code}_r.mp4`) // the output file path
            .size(sizeStr) // use the 'sizeStr' string calculated previously (read more about it here: https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#video-frame-size-options) 
            .on('end', () => resolve(`${code}_r`))
            .run();
    })
}


function FFMPEGConvertFormatVideo(code, filepath) {
    return new Promise((resolve, reject) => {
        ffmpeg(filepath)
            .output(`./public/media/${code}_conv.mp4`)
            .size('720x1280')
            .videoCodec('libx264')
            .on('end', () => resolve(`${code}_conv`))
            .run();

    })
}

module.exports = {
    streamImage,
    streamVideo,
    CompressVideo,
    FFMPEGConvertFormatVideo

}