var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment=require("./models/comment");
var data = [{
    name: " Clouds rest",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
    desc:"A beauty"
    },
    {
    name: "Nights",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Night_Campaign.jpg/220px-Night_Campaign.jpg",
    desc:"Night is long"
    },
   {
    name: "Morning",
    image: "https://koa.com/blog/images/solo-camping-tips.jpg?preset=blogPhoto",
    desc:"Rise and shine"
   }
]

function seedDB() {
    // REMOVE ALL CAMPGROUNDS
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("Removed ");
    });
    // add a few campground
    data.forEach(function(seed){
        Campground.create(seed,function(err,data){
          if(err){
              console.log(err);
          }
          else{
             console.log("Added campgr");
            //  create a comment 
            Comment.create({
                text:"This place is great",
                author:"Homer"
            },function(err,comment){
                if(err){
                    console.log(err);
                }else{
                    data.comments.push(comment);
                    data.save();
                    console.log("Creted a new comment");
                }
             
           });
         }
       });
    });

}

module.exports = seedDB;