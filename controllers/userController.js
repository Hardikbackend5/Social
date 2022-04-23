const postService = require('../services/postService.js');
const userService = require('../services/userService.js');
const responses = require('../responses.js')
const constants = require('../constants')

const follow_user = async function (req, res) {
    try {
        var user_id = req.body.user_id;
        var follow_user_id = req.body.follow_user_id;
        if(user_id != follow_user_id){
            var follower_data = await postService.get_followers({ user_id, follow_user_id});
            if(follower_data && follower_data.length){
                throw constants.responseMessages.ALREADY_FOLLOWED; //error msg
            }else{
                await userService.follow_user({ user_id, follow_user_id});
            }
            return responses.sendCustomResponse(res,
                constants.responseMessages.ACTION_COMPLETE,
                constants.responseFlags.ACTION_COMPLETE,
                {}
            );
        } else{
            throw constants.responseMessages.INVALID_ACTION; //error msg
        }
    } catch (error) {
         return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}


const unfollow_user = async function (req, res) {
    try {
        var user_id = req.body.user_id;
        var follow_user_id = req.body.follow_user_id;
        if(user_id != follow_user_id){
            var follower_data = await postService.get_followers({ user_id, follow_user_id});
            if(!follower_data || !follower_data.length){
                throw constants.responseMessages.ALREADY_UNFOLLOWED; //error msg
            }else{
                await userService.unfollow_user({ user_id, follow_user_id});
            }
            return responses.sendCustomResponse(res,
                constants.responseMessages.ACTION_COMPLETE,
                constants.responseFlags.ACTION_COMPLETE,
                {}
            );
        } else{
            throw constants.responseMessages.INVALID_ACTION; //error msg
        }
    } catch (error) {
         return responses.sendCustomResponse(res, error,
            constants.responseFlags.SHOW_ERROR_MESSGAE,
            {}
        );
    }
}

module.exports = {
    follow_user:follow_user,
    unfollow_user:unfollow_user
}