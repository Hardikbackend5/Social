const postService = require('../services/postService.js');
const responses = require('../responses.js')
const constants = require('../constants')
const _ = require("underscore");

const upload_post = async function (req, res) {
    try {
        var userId = req.body.userId;
        var body = req.body.body;
        var title = req.body.title; 
        await postService.insert_post({ body, userId, title});
       
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
        var userId = req.body.userId;
        var body = req.body.body;// Image URL
        var title = req.body.title; 
        var post_id = req.body.id;
        var data = await postService.get_posts({ post_id, userId });
        if (!data || !data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }
        await postService.update_post({ post_id, body, title });
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
        var userId = req.body.userId;
        var post_id = req.body.id;
        var data = await postService.get_posts({ post_id, userId });
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
        var post_id = req.body.id;
        var userId = req.body.userId;
        var post_data = await postService.get_posts({ post_id });
        if (!post_data || !post_data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }
        var data = await postService.get_post_likes({ post_id , userId});
        if (!data || !data.length) {
            // Like the post
            await postService.like_post({ post_id, userId });
        }else{
            // Dis-Like the post
            await postService.dislike_post({ post_id, userId });
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
        var userId = req.params.userId;
        var post_id = req.params.id || null;
        var sort_by = req.params.sort_by || 0; // 1 means Desc , 0 means ASC
        var post_data = await postService.get_posts({ post_id, userId, sort_by });
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

const get_post_by_id = async function (req, res) {
    try {
        var post_id = req.params.id || null;
        console.log("********")
        var post_data = await postService.get_posts({ post_id });
        if (!post_data || !post_data.length) {
            throw constants.responseMessages.INVALID_POST; //error msg
        }else if(post_id && post_data && post_data.length && (!post_data[0].body || !post_data[0].title)){ //btw title and body are require while uploading a post
            throw constants.responseMessages.INVALID_POST; //error msg 2
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
    timeline_feed:timeline_feed,
    get_post_by_id:get_post_by_id
}