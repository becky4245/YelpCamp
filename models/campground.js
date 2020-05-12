var mongoose=require("mongoose");

// Schema setup
var campSchema = new mongoose.Schema({
    name: String,
    image: String,
    price:String,
    desc:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
            },
            username:String
    },
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }
]
});
//compiling the schema into model
var Campground = mongoose.model("Campground", campSchema);
module.exports=Campground;