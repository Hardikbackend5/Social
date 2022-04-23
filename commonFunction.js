var constants          = require('./constants');
var responses          = require('./responses');
const Joi              = require('joi');

exports.validateFields = function (req, res, schema) {
    var validation = schema.validate(req);
    if (validation.error) {
        var errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        responses.sendResponse(res, errorReason, constants.responseFlags.PARAMETER_MISSING);
        return false;
    }
    return true;
};

exports.executeSqlQuery = async function (sql, bindParams) {
    try {
        return new Promise((resolve, reject) => {
            connection.query(sql, bindParams, function (err, result) {
                if (err) {
                    return reject(err);
                }
                else {
                    return resolve(result);
                }
            });
        })

    } catch (error) {
        throw error;
    }
}