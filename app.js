const express = require("express");
const app = express();
mysqlLib = require('./validators/mysqlLib');
const morgan = require("morgan");
const authValidators = require("./validators/auth");
const postValidators = require("./validators/posts");
const authControllers = require("./controllers/authController");
const postControllers = require("./controllers/postController");
const userValidators = require("./validators/users");
const userControllers = require("./controllers/userController");


//middleware
app.use(express.json());
app.use(morgan("common"));

// USER API's
app.post("/user_register",   authValidators.user_register, authControllers.user_register);
app.post("/user_login",      authValidators.user_login, authControllers.user_login);

// POST API's
app.post("/upload_post",          postValidators.upload_post,       postControllers.upload_post);
app.put("/update_post/:id",       postValidators.update_post,       postControllers.update_post);
app.delete("/delete_post/:id",    postValidators.delete_post,       postControllers.delete_post);
app.post("/like_dislike_post",    postValidators.like_dislike_post, postControllers.like_dislike_post);
app.get("/get_post/:userId/:sort_by?/:id?", postValidators.get_post,  postControllers.get_post);
app.get("/timeline_feed/:user_id",postValidators.timeline_feed,     postControllers.timeline_feed);

//FOLLOW OR UNFOLLOW USER API's
app.post("/follow_user",    userValidators.follow_unfollow_user, userControllers.follow_user);
app.post("/unfollow_user",  userValidators.follow_unfollow_user, userControllers.unfollow_user);

app.get("/posts/:id?", postValidators.get_post_by_id,  postControllers.get_post_by_id); /// AS per the assignment

app.listen(3000, () => {
  console.log("Backend server is running!");
});