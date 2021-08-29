var ffmpeg = require('fluent-ffmpeg');
// ffmpeg.setFfmpegPath("G:/ffmpeg/bin/ffmpeg.exe");
// ffmpeg.setFfprobePath("G:/ffmpeg/bin/ffprobe.exe");


function SplitVideoConversion(videoname, starttime, numvid) {
    return new Promise((resolve, reject) => {

        var newVideoName = videoname + '_split_' + numvid;
        ffmpeg(`public/media/${videoname}.mp4`)
            .setStartTime(starttime) //'00:02:20','00:04:40'
            .setDuration(140)
            .output(`public/media/conversion/${videoname}_split_${numvid}.mp4`)

            .on('end', function (err) {
                if (!err) {
                    console.log('conversion Done');
                    resolve(newVideoName);
                }
            })
            .on('error', function (err) {
                console.log('error: ', +err);
                reject(err);

            }).run();
    });

}

function FFMPEGConvertFormatVideo(code) {
    return new Promise((resolve, reject) => {
        ffmpeg(`public/media/${code}.mp4`)
            .output(`public/media/${code}_conv.mp4`)
            //.size('720x1280')
            //.videoCodec('libx264')
            .outputOptions(['-c:v libx264', '-r 30', '-pix_fmt yuv420p'])
            .on('end', () => resolve(`${code}_conv`))
            .on('error', function (err) {
                console.log('error: ', +err);
                reject(err);

            }).run();
    })
}

module.exports = {
    SplitVideoConversion,
    FFMPEGConvertFormatVideo
}