const postService = require('../services/postService.js');
const responses = require('../responses.js')
const constants = require('../constants')
const _ = require("underscore");

const upload_post = async function (req, res) {
    try {
        var user_id = req.body.user_id;
        var image = req.body.image;// Image URL
        var description = req.body.description; 
        await postService.insert_post({ description, user_id, image});
       
        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            {}
        );
    } catch (error) {
         return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

const update_post = async function (req, res) {
    try {
        var user_id = req.body.user_id;
        var image = req.body.image;// Image URL
        var description = req.body.description; 
        var post_id = req.body.id;
        var data = await postService.get_posts({ post_id, user_id });
        if (!data || !data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }
        await postService.update_post({ post_id, description, image });
        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            {}
        );
    } catch (error) {
        return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

const delete_post = async function (req, res) {
    try {
        var user_id = req.body.user_id;
        var post_id = req.body.id;
        var data = await postService.get_posts({ post_id, user_id });
        if (!data || !data.length) {
            throw constants.responseMessages.INVALID_ACTION; //error msg
        }
        await postService.delete_post({ post_id });
        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            data
        );
    } catch (error) {
        return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

const like_dislike_post = async function (req, res) {
    try {
        var post_id = req.body.post_id;
        var user_id = req.body.user_id;
        var post_data = await postService.get_posts({ post_id });
        if (!post_data || !post_data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }
        var data = await postService.get_post_likes({ post_id , user_id});
        if (!data || !data.length) {
            // Like the post
            await postService.like_post({ post_id, user_id });
        }else{
            // Dis-Like the post
            await postService.dislike_post({ post_id, user_id });
        }
        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            {}
        );
    } catch (error) {
        return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}


const get_post = async function (req, res) {
    try {
        var user_id = req.params.user_id;
        var post_id = req.params.post_id || null;
        var sort_by = req.params.sort_by || 0; // 1 means Desc , 0 means ASC
        console.log("********")
        var post_data = await postService.get_posts({ post_id, user_id, sort_by });
        if (!post_data || !post_data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }
        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            post_data
        );
    } catch (error) {
        return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

const timeline_feed = async function (req, res) {
    try {
        var user_id = req.params.user_id;
        var followers = await postService.get_followers({ user_id });
        followers = _.pluck(followers,'follower_id')
        followers.push(user_id) // self posts;
        console.log("?>>>>>>>>>>>>>>",followers)
        var timeline_posts = await postService.get_posts({ user_ids:followers });

        return responses.sendCustomResponse(res,
            constants.responseMessages.ACTION_COMPLETE,
            constants.responseFlags.ACTION_COMPLETE,
            timeline_posts
        );
    } catch (error) {
        return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

module.exports = {
    upload_post:upload_post,
    update_post:update_post,
    delete_post:delete_post,
    like_dislike_post:like_dislike_post,
    get_post:get_post,
    timeline_feed:timeline_feed
}