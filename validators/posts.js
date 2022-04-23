const Joi = require('joi');
const validator = require('../commonFunction');

//REGISTER
const upload_post = function (req, res, next) {

  var schema = Joi.object().keys({
    user_id: Joi.string().required(),
    description: Joi.string().max(500).required(),
    image: Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}    
//update a post
const update_post = function (req, res, next) {
  req.body.id = req.params.id
  var schema = Joi.object().keys({
    user_id: Joi.string().required(),
    description: Joi.string().max(500).optional(),
    image: Joi.string().optional(),
    id:Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}    

//delete a post
const delete_post = function (req, res, next) {
  req.body.id = req.params.id
  var schema = Joi.object().keys({
    user_id: Joi.string().required(),
    id:Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}   

//like / dislike a post
const like_dislike_post = function (req, res, next) {
  var schema = Joi.object().keys({
    user_id: Joi.string().required(),
    post_id:Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}   

//get posts
const get_post = function (req, res, next) {
  var schema = Joi.object().keys({
    user_id:Joi.string().required(),
    sort_by:Joi.number().optional(),
    post_id:Joi.number().optional()
  });

  var validFields = validator.validateFields(req.params, res, schema);
  if (validFields) {
    next();
  }
}   

//get timeline posts
const timeline_feed = function (req, res, next) {
  var schema = Joi.object().keys({
    user_id:Joi.string().required()
  });

  var validFields = validator.validateFields(req.params, res, schema);
  if (validFields) {
    next();
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