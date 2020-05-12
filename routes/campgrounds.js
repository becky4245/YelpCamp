// INDEX 

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware=require("../middleware");

//retrieving campground and showing it all
router.get("/", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
});

// CREATE

router.post("/", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var price= req.body.price;
    var image = req.body.image;
    var dec = req.body.desc;
    //newCampground an object
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {
        name: name,
        price:price,
        image: image,
        desc: dec,
        author: author
    };
    // console.log(req.user);
    //Create a new campground and save it to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
});

// NEW
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// ShOW- shows more info about one campground

router.get("/:id", function (req, res) {
    // find the campground with provided ID
    // Campground.findById(id,callback)
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template woth that campground
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    })

});


// EDIT CAMPGRUOND
router.get("/:id/edit",middleware.checkCampgroundOwnership,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
                    res.render("campgrounds/edit", {
                        campground: foundCampground
                    });
                });

});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function (req, res) {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgroundsb");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY CAMPGROUNS ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;