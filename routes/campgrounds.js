var express = require("express"),
    router  = express.Router();
    Campground = require("../models/campgrounds"),
    middleware = require("../middleware");

  // INDEX ROUTE - SHOWS ALL CAMPGROUNDS
  router.get("/", function(req, res){
    Campground.find({}, function(err, campgrounds){
      if(err){
        console.log(err);
      }
      else{
        res.render("campgrounds/index.ejs", {campgrounds:campgrounds, currentUser: req.user});
      }
    });
  });

  //CREATE ROUTE - ADD A NEW CAMPGROUND TO DB
  router.post("/", middleware.isLoggedIn ,function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author ={
      id: req.user._id,
      username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};

    Campground.create(newCampground, function(err, campgrounds){
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/campgrounds");
      }
    });
  });

  //NEW ROUTE - SHOW FORM TO CREATE NEW CAMPGROUND
  router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
  });

  //SHOW ROUTE - COMPLETE INFO ABOUT THE CAMPGROUND
  router.get("/:id", function(req, res){

    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        console.log(foundCampground);
        if(err){
          console.log(err);
        }
        else{
          res.render("campgrounds/show", {campground: foundCampground});
        }
    });
  });

  //EDIT CAMPGROUND ROUTES

  router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
  });

  //UPDATE CAMPGROUND ROUTE
  router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update correct campgrounds and redirect
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        res.redirect("/campgrounds/"+req.params.id);
    });
  });

  //DESTROY CAMPGROUND ROUTE
  router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
     Campground.findByIdAndRemove(req.params.id, function(err){
         res.redirect("/campgrounds");
     });
  });

  module.exports = router;
