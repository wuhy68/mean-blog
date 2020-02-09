const express = require('express');
const app = express();

const blogRouter = require("./routes/blogroute");
const commentRouter = require("./routes/commentroute");
const userRouter = require("./routes/userroute");

//mongoDB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017')
  .then(() => console.log('connection successfully'))
  .catch((err) => console.error(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', blogRouter);
app.use('/api', commentRouter);
app.use('/api', userRouter);

module.exports = app;
