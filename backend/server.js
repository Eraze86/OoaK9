const express = require("express");
const app = express();

app.listen(3000, function(){
    console.log("servern är igång")
});
app.get("/", function(req, res){
res.send("<h2>Hejsan</h2>")
})