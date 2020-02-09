const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.route('/user')
  .get((req, res, next) => {
    User.find((err, blog) => {
      if(err) return next(err);
      res.json(blog);
    });
  })
  .post((req, res, next) => {
    User.create({
      username: req.body.username,
      password: req.body.password
    }, (err, user) => {
      if(err) return next(err);
      console.log("User Created Successfully");
      res.json(user);
    });
  });

module.exports = router;
