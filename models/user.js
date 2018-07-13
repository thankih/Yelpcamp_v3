var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

//Adding passport local mongoose to the authentication model
UserSchema.plugin(passportLocalMongoose);

//Exporting the created model
module.exports = mongoose.model("User", UserSchema);
