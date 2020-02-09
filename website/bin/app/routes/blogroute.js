const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');

router.route('/blog')
  .get((req, res, next) => {
    Blog.find((err, blog) => {
      if(err) return next(err);
      res.json(blog);
    });
  })
  .put((req, res, next) => {
    Blog.findByIdAndUpdate(req.body._id, {status: req.body.status},  {new: true},(err, blog) => {
      if(err) return next(err);
      console.log("Blog Change Successfully");
      res.json(blog);
    });
  });

router.route('/editor')
  .post((req, res, next) => {
    Blog.create({
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      author: req.body.author,
      status: true,
      date: new Date()
    }, (err, blog) => {
      if(err) return next(err);
      console.log("Blog Created Successfully");
      res.json(blog);
    });
  })
  .put((req, res, next) => {
    Blog.findByIdAndUpdate(req.body._id, {
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
      status: true,
      date: new Date()
    }, {new: true}, (err, blog) => {
      if(err) return next(err);
      console.log("Blog Update Successfully");
      res.json(blog);
    });
  });

module.exports = router;
