var express = require("express");
var router = express.Router();
var path = require("path");
const cors = require("cors");
router.use(cors());
const content = require("../content.json");
const userModel = require("../models/user-model");
bcrypt = require("bcrypt");
const saltRounds = 10;

//get user and password, check user, compare krypted password. if true, logg in, if not, try again
router.post("/user", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (user === null) {
      res.send("ingen användare");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        res.status(201).json("funkar");
      }
      if (result === false) {
        res.send("tyvärr");
      }
    });
  } catch (error) {
    console.log("fel", error);
    res.status(error);
    return;
  }
});

/* GET home page. */
router.get("/content", function (req, res, next) {
  res.send(content);
  //  console.log("vad skickas ",content)
});

router.post("/conent/id", function (req, res, next) {});

// Add a new user, if needed. crypting the password
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
