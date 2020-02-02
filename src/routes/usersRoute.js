const express = require("express");
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

const mongoose = require("mongoose");
const User = require("../../api/schemas/user");

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res) => {
  User.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", jsonParser, (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    telephone: req.body.telephone,
    nickName: req.body.nickName,
    location: req.body.location,
    password: req.body.password,
    email: req.body.email
  });

  user
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        status: "success",
        user: user
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:userId", jsonParser, (req, res) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:userId", jsonParser, (req, res) => {
  const id = req.params.userId;
  const reqBody = req.body;
  const newValueKey = Object.keys(reqBody).toString();
  const newValue = Object.values(reqBody);
  const newObj = new Object();
  newObj[newValueKey] = newValue;

  User.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        status: "success",
        user: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  User.update({ _id: id }, { $set: newObj })
    .exec()
    .then(doc => {
      res.status(200).json(doc);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:userId", (req, res) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
