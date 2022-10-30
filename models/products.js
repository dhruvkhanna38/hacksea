var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
   name: String,
   image: String,
   price: Number,
   points: Number,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Product", productSchema);