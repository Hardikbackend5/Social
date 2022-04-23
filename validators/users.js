const Joi = require('joi');
const validator = require('../commonFunction');

//follow a user
const follow_unfollow_user = function (req, res, next) {

  var schema = Joi.object().keys({
    user_id: Joi.string().required(),
    follow_user_id: Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}  



module.exports = {
  follow_unfollow_user
};