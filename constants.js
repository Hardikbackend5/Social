function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value: value,
        enumerable: true,
        writable: false,
        configurable: true
    });
}

exports.responseMessages = {};
define(exports.responseMessages, 'PARAMETER_MISSING', 'Insufficient information was supplied. Please check and try again.');
define(exports.responseMessages, 'USER_EMAIL_ALREADY_EXISTS', 'This email ID is already registered. Please try with different ID.');
define(exports.responseMessages, 'ACCOUNT_NOT_REGISTERED', 'This Email is not registered.');
define(exports.responseMessages, 'WRONG_PASSWORD', 'Incorrect Password.');
define(exports.responseMessages, 'INVALID_POST', 'Invalid post.');
define(exports.responseMessages, 'ACTION_COMPLETE', 'Successful');
define(exports.responseMessages, 'ALREADY_FOLLOWED', 'You already followed this user.');
define(exports.responseMessages, 'ALREADY_UNFOLLOWED', 'You already unfollowed this user.');
define(exports.responseMessages, 'INVALID_ACTION', "You can't perform this action.");

exports.responseFlags = {};
define(exports.responseFlags, 'PARAMETER_MISSING', 100);
define(exports.responseFlags, 'ACTION_COMPLETE', 200);
define(exports.responseFlags, 'SHOW_ERROR_MESSGAE', 201);