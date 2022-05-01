const mongoose = require("mongoose");

//user schema
const recipeSchema = mongoose.Schema({
  RecipeName: {
    type: String,
  },
  Ingredients: {
    type: Array,
  },
  Image: {
    type: String,
  },
  steps: {
    type: Array,
  },
  Details: {
    type: String,
  },
  userId: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
//user Model
module.exports = mongoose.model("recipes", recipeSchema);
