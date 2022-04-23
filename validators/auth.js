const Joi = require('joi');
const validator = require('../commonFunction');

//REGISTER
const user_register = function (req, res, next) {

  var schema = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    profile_image:Joi.string().optional()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}    

const user_login = function (req, res, next) {

  var schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}   


module.exports = {
  user_register:user_register,
  user_login:user_login
}