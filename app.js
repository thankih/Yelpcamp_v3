var LocalStratedy   = require("passport-local"),
     methodOverride = require("method-override"),
     passport       = require("passport"),
     express        = require("express"),
     mongoose       = require("mongoose"),
     bodyParser     = require("body-parser"),
     Campground     = require("./models/campgrounds"),
     SeedDB         = require("./seeds"),
     Comment        = require("./models/comment"),
     User           = require("./models/user"),
     app            = express();

     //ACQUIRING ROUTES FROM THE ROUTES DIRECTORY
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");

  mongoose.connect("mongodb://localhost/yelp_camp");
  app.set("view engine", "ejs");
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static(__dirname + "/public"));
  app.use(methodOverride("_method"));
//  SeedDB();

  //setting express to use the express-session
  app.use(require("express-session")({
    secret: "House of Cards is amazing",
    resave: false,
    saveUninitialized: false
  }));

  //Passport Configuration
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStratedy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  //MIDDLEWARE TO ADD REQ.CURRENTUSER TO ALL ROUTES
  app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
  });

  app.use("/", indexRoutes);
  app.use("/campgrounds", campgroundRoutes);
  app.use("/campgrounds/:id/comments", commentRoutes);


  //LISTENING FOR ROUTES ON THE LOCALHOST
  app.listen(3000, function(){
    console.log("Yelpcamp started at port 3000");
  })
