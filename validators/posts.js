const Joi = require('joi');
const validator = require('../commonFunction');

//REGISTER
const upload_post = function (req, res, next) {

  var schema = Joi.object().keys({
    userId: Joi.string().required(),
    body: Joi.string().max(500).required(),
    title: Joi.string().max(500).required()
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
    userId: Joi.string().required(),
    title: Joi.string().max(500).required(),
    body: Joi.string().max(500).required(),
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
    userId: Joi.string().required(),
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
    userId: Joi.string().required(),
    id:Joi.string().required()
  });

  var validFields = validator.validateFields(req.body, res, schema);
  if (validFields) {
    next();
  }
}   

//get posts
const get_post = function (req, res, next) {
  var schema = Joi.object().keys({
    userId:Joi.string().required(),
    sort_by:Joi.number().optional(),
    id:Joi.number().optional()
  });

  var validFields = validator.validateFields(req.params, res, schema);
  if (validFields) {
    next();
  }
}   

//get timeline posts
const timeline_feed = function (req, res, next) {
  var schema = Joi.object().keys({
    userId:Joi.string().required()
  });

  var validFields = validator.validateFields(req.params, res, schema);
  if (validFields) {
    next();
  }
}  

//get posts
const get_post_by_id = function (req, res, next) {
  var schema = Joi.object().keys({
    id:Joi.number().optional()
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
  timeline_feed:timeline_feed,
  get_post_by_id:get_post_by_id
}