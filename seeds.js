var mongoose = require("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
  {name: "Cloud's Rest",
  image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
  description: "Suspendisse eu imperdiet erat. Nullam imperdiet vulputate eros, at auctor nulla. Donec eu tortor risus. Pellentesque a eleifend risus, eget gravida elit. Aenean dictum velit aliquet purus scelerisque accumsan. Integer nisl urna, porta et risus et, aliquet consectetur diam. Morbi convallis sodales turpis eget posuere. Mauris sollicitudin gravida arcu"
},
  {
    name: "Desert Mesa",
    image: "https://farm4.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description: "Suspendisse eu imperdiet erat. Nullam imperdiet vulputate eros, at auctor nulla. Donec eu tortor risus. Pellentesque a eleifend risus, eget gravida elit. Aenean dictum velit aliquet purus scelerisque accumsan. Integer nisl urna, porta et risus et, aliquet consectetur diam. Morbi convallis sodales turpis eget posuere. Mauris sollicitudin gravida arcu"
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit"
  }
]
function seedDB(){
  //remove campgrounds
  Campground.remove({}, function(err){
      if(err){
      console.log(err);
      }
      data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
          if(err){
            console.log(err);
          }else{
            console.log("added a campground");
            //Create a Comment
            Comment.create(
          {
            text: "This place is great, but I wish there was internet",
            author: "Homer"
          }, function(err, comment){
                if(err){
                  console.log(err);
                }else{
                  campground.comments.push(comment);
                  campground.save();
                }
          });
          }
      });
  });
});
}
module.exports = seedDB;
