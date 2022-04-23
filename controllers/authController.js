const md5 = require("md5");
const authServices = require('../services/authService.js');
const responses = require('../responses.js')
const constants = require('../constants')

const user_register = async function (req, res) {
    try {
        var email = req.body.email;
        var username = req.body.username;
        var password = md5(req.body.password); //encrypt password
        var profile_image = req.body.profile_image || null; // Image URL
        var data = await authServices.is_email_exists({ email });
        if (data && data.length) {
            throw constants.responseMessages.USER_EMAIL_ALREADY_EXISTS;
        }
        await authServices.insert_user({ email, password, username, profile_image});
       
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

const user_login = async function (req, res) {
    try {
        var email = req.body.email;
        var password =  md5(req.body.password); //encrypt password
        var data = await authServices.is_email_exists({ email });
        if (!data || !data.length) {
            throw constants.responseMessages.ACCOUNT_NOT_REGISTERED;
        }
        if(data[0].password != password){
            throw constants.responseMessages.WRONG_PASSWORD;
        }
        delete data[0].password;
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

module.exports = {
    user_register:user_register,
    user_login:user_login
}