function getMediaImage(nodes) {
    return new Promise((resolve, reject) => {
        try {
            if (nodes != null) {
                // var nodes = medias.data.shortcode_media;
                var url = nodes.display_url;
                resolve(url);
            }

        } catch (e) {
            console.log(e);
            reject(e.message);
        }
    })
}

module.exports = {
    getMediaImage
}