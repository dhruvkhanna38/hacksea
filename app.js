var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Product  = require("./models/products"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    productRoutes = require("./routes/products"),
    indexRoutes      = require("./routes/index")
    
mongoose.connect(`mongodb+srv://dhruvkhanna38:hacksea@cluster0.m6q9eg3.mongodb.net/?retryWrites=true&w=majority`);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use("/", indexRoutes);
app.use("/products", productRoutes);
app.use("/products/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
   console.log(`The YelpCamp Server Has Started!`, process.env.PORT);
});