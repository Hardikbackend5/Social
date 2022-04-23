var constants   = require('./constants');

exports.actionCompleteResponse = function (res, data, msg) {
    var response = {
        "message": msg || constants.responseMessages.ACTION_COMPLETE,
        "status": constants.responseFlags.ACTION_COMPLETE,
        "data" : data || {}
    };
    
    res.send(JSON.stringify(response));
};

exports.sendCustomResponse = function(res, message, code, data) {
    var response = {
        "message": message,
        "status": code,
        "data":  data || {},
    };
    
    res.send(JSON.stringify(response));
};

exports.sendResponse = function (res, msg, status, data) {
    var response = {
        "message": msg,
        "status": status,
        "data" : data || {}
    };
    res.send(JSON.stringify(response));
}