var mongoose = require("mongoose");
var Product = require("./models/products");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        price:10,
        points: 10
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        price:20,
        points: 20
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        price: 30,
        points: 30
    }
]

function seedDB(){
   //Remove all campgrounds
   Product.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed products!");
         //add a few campgrounds
        data.forEach(function(seed){
            Product.create(seed, function(err, product){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a product");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                product.comments.push(comment);
                                product.save();
                                console.log("Created new product");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
