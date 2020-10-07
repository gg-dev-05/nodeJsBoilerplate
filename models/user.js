var mongoose = require("mongoose");
var passportlocalMongoose = require("passport-local-mongoose");


//Define the user schema
var userSchema = mongoose.Schema({
    username:  String,
    password: String,
});

//For passport (ignore)
userSchema.plugin(passportlocalMongoose);

//Export the created schema as a mongoose model
module.exports = mongoose.model("User", userSchema);