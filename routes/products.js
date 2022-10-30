var express = require("express");
var router  = express.Router();
var Product = require("../models/products");
var middleware = require("../middleware");


//INDEX - show all products
router.get("/", function(req, res){
    // Get all campgrounds from DB
    Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
       } else {
          res.render("products/index",{products:allProducts});
       }
    });
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var points = req.body.points;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newProduct = {name: name, image: image, description: desc, points: points, author:author}
    // Create a new campground and save to DB
    Product.create(newProduct, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/products");
        }
    });
});

//NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("products/new"); 
});

// SHOW - shows more info about one campground
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Product.findById(req.params.id).populate("comments").exec(function(err, foundProducts){
        if(err){
            console.log(err);
        } else {
            console.log(foundProducts)
            //render show template with that campground
            res.render("products/show", {product: foundProducts});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkProductOwnership, function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        res.render("products/edit", {product: foundProduct});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkProductOwnership, function(req, res){
    // find and update the correct campground
    Product.findByIdAndUpdate(req.params.id, req.body.product, function(err, updatedProduct){
       if(err){
           res.redirect("/products");
       } else {
           //redirect somewhere(show page)
           res.redirect("/products/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkProductOwnership, function(req, res){
    ProductfindByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/products");
      } else {
          res.redirect("/products");
      }
   });
});


module.exports = router;

