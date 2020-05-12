var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash= require("connect-flash"),
    passport=require("passport"),
    LocalStratergy=require("passport-local"),
    methodOverride=require("method-override"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    User=require("./models/user"),
    // we need not use Campground but we are using Campground.create and using.
    seedDB=require("./seeds");

// requiring routes
    var commentRoutes=require("./routes/comments"),
        campgroundsRoutes=require("./routes/campgrounds"),
        indexRoutes=require("./routes/index")

        //seedDB(); seed the database  

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"MAny of you",
    resave:false,
    saveUninitialized:false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});

mongoose.connect("mongodb://localhost/yelp_camp_final");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//or app.use(express.static("public"));

app.use(flash());

app.set("view engine", "ejs");

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundsRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(1099, function () {
    console.log("Yelp camp has started");
});