const express = require("express");
const cors = require("cors");
const mongodb = require("./config/databases/mongodb");
const User = require("./models/users");
require("dotenv").config();

const port = process.env.PORT || 8000;
const app = express();

app.use(
  cors({
    origin: process.env.SERVERPATH,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongodb();

const info = () => {
  User.find({}, (err, doc) => {
    if (!err) {
      app.get("/users", (req, res) => {
        res.json(doc);
      });
    }
  });
};

info();

app.post("/create", (req, res) => {
  const createUser = async () => {
    const username = await User.findOne({ username: req.body.user });
    return username
      ? username
      : new User({
          name: req.body.name,
          username: req.body.user,
          text: req.body.text,
        }).save();
  };

  console.log(req.body);
  createUser();
  info();
  res.end("");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
