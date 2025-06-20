// import express module
const express = require("express");

// import bodyParser module
const bodyParser = require("body-parser");

//  import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/educationDB");

// import bcrypt
const bcrypt = require("bcrypt");

// import multer
const multer = require("multer");

// import jwt module
const jwt = require("jsonwebtoken");

// import axios
const axios = require("axios");

// import express-session module
const session = require("express-session");

const path = require("path");

const secretKey = "your-secret-key";

const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/webp": "webp",
  "application/pdf": "pdf",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (!isValid) return cb(new Error("Invalid MIME type"));

    if (file.fieldname === "cv") {
      cb(null, "backend/files/cvs");
    } else {
      cb(null, "backend/files/photos");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-edu-" + "." + extension;
    cb(null, imgName);
  },
});

// creates an express app
const app = express();

app.use("/files", express.static(path.join("backend/files")));
app.use(
  session({
    secret: secretKey,
  })
);
// configuration :
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );

  next();
});

// Models Importations
const User = require("./models/User");

app.post(
  "/api/users",
  multer({ storage: storage }).fields([
    { name: "img", maxCount: 1 },
    { name: "cv", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("user", req.body);
    const user = req.body;

    // ✅ Force success: true only for admins
    user.success = user.role === "admin";

    // Parse childTelephones for parent only
    if (user.role === "parent") {
      try {
        const parsedPhones = JSON.parse(user.childTelephones || "[]");
        user.childTelephones = parsedPhones
          .map((tel) => Number(tel))
          .filter((tel) => !isNaN(tel) && tel.toString().length === 8);
      } catch (e) {
        return res.json({ status: "INVALID CHILD TELEPHONE FORMAT" });
      }
    } else {
      delete user.childTelephones;
    }

    User.findOne({ email: user.email }).then((doc) => {
      if (doc) {
        return res.json({ status: "USER ALREADY EXISTS" });
      }

      // For parent, validate child telephones
      if (user.role === "parent") {
        User.find({
          telephone: { $in: user.childTelephones },
          role: "student",
        }).then((students) => {
          if (students.length !== user.childTelephones.length) {
            return res.json({ status: "INVALID CHILD TELEPHONE" });
          }
          proceedWithHashing();
        });
      } else {
        proceedWithHashing();
      }

      function proceedWithHashing() {
        bcrypt.hash(user.password, 12).then((hash) => {
          user.password = hash;

          if (req.files && req.files["img"]) {
            user.photo =
              "http://localhost:4000/files/" + req.files["img"][0].filename;
          }

          if (req.files && req.files["cv"]) {
            user.cv =
              "http://localhost:4000/files/" + req.files["cv"][0].filename;
          }

          const newUser = new User(user);
          newUser.save((err, doc) => {
            console.log(err);
            console.log(doc);
            if (err) {
              res.json({ status: "Error" });
            } else {
              res.json({ status: "OK" });
            }
          });
        });
      }
    });
  }
);

module.exports = app;
