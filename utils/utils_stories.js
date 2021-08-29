const PrivateAPI = require('./private-api')

async function getStoriesMedia(username) {
    try {
        //find owner_id
        let infos = await PrivateAPI.getUsernameInfo(username);
        if (infos != null) {
            let owner_id = infos.user.pk;
            //get story
            let stories = await PrivateAPI.getStories(owner_id);
            if (stories != null) {
                return stories
            } else return null;

        } else return "Cannot get user info";
    } catch (e) {
        console.log(e);
        return e.message;
    }

}


module.exports = {
    getStoriesMedia
}