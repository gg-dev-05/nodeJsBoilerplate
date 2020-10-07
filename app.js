var express = require("express");
var app = express();

var bodyParser = require("body-parser");

//For database
var mongoose = require("mongoose");

//For authentication
var passport = require("passport");
var LocalStrategy = require("passport-local");

//For error and warnings for the user
var flash = require("connect-flash");


//After creating a model in models directory it can be imported by using the following format
//                     var Campground = require("./models/campgrounds");
var User = require("./models/user");



//For PUT and DELETE
var methodOverride = require("method-override");


app.use(bodyParser.urlencoded({ extended: true }));
//All files have default extension as ejs ex. index.ejs
app.set("view engine", "ejs");

//Connection to mongo db (local)
mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

//Public for css and js files
app.use(express.static(__dirname + "/public"));

//Along with methodOverride
app.use(methodOverride("_method"));

//Passport COnfig
app.use(require("express-session")({
    secret: "Secret 1234",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    //All routes will have  the  "currentUser" variable holding the value of current user
    res.locals.currentUser = req.user;
    next();
});
 
//Define your routes here

app.get("/", function(req, res){
    res.render("index");
});

app.get("/login", function (req, res){
    res.render("login");
})


app.get("/register", function (req, res){
    res.render("register");
})

app.listen(3000, function () {
    console.log("Yelp Camp server running on port 3001")
})