const mongoose = require("mongoose");

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor", // Reference to the Doctor model
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleModel = mongoose.model("Article", articleSchema);

module.exports = ArticleModel;
