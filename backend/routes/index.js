var express = require("express");
var router = express.Router();
var path = require("path");
const cors = require("cors");
router.use(cors());
const contentModel = require("../models/content-model");
const userModel = require("../models/user-model");
bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const secret = "u94utjjsj673jngmdg"

//get user and password, check user, compare krypted password. if true, logg in, if not, try again
router.post("/user", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (user === null) {
      res.send("ingen användare");
    }
    bcrypt.hash(user.password, saltRounds, function(err, hash){})
    bcrypt.compare(hash, user.password, function (err, result) {
      if (result === true) {
        const token = jwt.sign({ username }, secret);
    
        res.status(201).json(token);
      
      }
      if (result === false) {
        res.send("Not valid");
      }
    });
  } catch (error) {
    res.status(error);
    return;
  }
});

/* GET home page. */
router.get("/", async function (req, res, next) {
  const getCourses = await contentModel.find();
    res.json(getCourses)
 
});
router.put('/edit', async function(req, res, next) {
  try{
  console.log("req", req.body)
    const { _id, name, text, img} = req.body
      await contentModel.findByIdAndUpdate({_id:_id},{ $set:{name:name,text:text,img:img}})
      res.status(201).json("content is updated")
    
    } catch(error){
      console.log("fel", error)
      res.status(error)
      return
    }
})

// router.post("/conent/id", function (req, res, next) {});

// // Add a new user, if needed. crypting the password
// router.post('/save', function(req, res, next) {
//     try{
//         const newUser = new userModel(req.body)
//         bcrypt.hash(newUser.password, saltRounds, function(err, hash) {
//             console.log("vad är hash", hash)
//             // Store hash in your password DB.
//             newUser.password = hash;
//         newUser.save()
//         res.status(201).json("new user saved")
//         });

//       } catch(error){
//         console.log("fel", error)
//         res.status(error)
//         return
//       }
// });

module.exports = router;
