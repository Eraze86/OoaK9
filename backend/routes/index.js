var express = require('express');
var router = express.Router();
var path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  next()
 
});

router.get('/', function(req, res, next) {
let userInput = document.getElementById("user")
let passwordInput= document.getElementById("password")
let loginbtn = document.getElementById("loginbtn")

console.log("Användare:",userInput)
console.log("lösenord:",passwordInput)
loginbtn.addEventListener("click", function(){
  console.log("click")
// if(username === "loppan" && password === "annanas"){
//   res.sendFile(path.join(__dirname, "../public/admin.html"));
// }
});

});

module.exports = router;
