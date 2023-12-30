const Article = require("../models/Article");
const Doctor = require("../models/Doctor");
const mongoose = require("mongoose");

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 })
      .populate("doctor", "firstName lastName");
    // The 'populate' method is used to replace the 'doctor' field ObjectId with the actual doctor object.

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error");
  }
};

// Get an article by ID
const getArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such article" });
  }

  const article = await Article.findById(id).populate(
    "doctor",
    "firstName lastName"
  );
  // Similarly, use 'populate' to include the doctor information in the response.

  if (!article) {
    return res.status(404).json({ error: "No such article" });
  }

  res.status(200).json({ article });
};

// Create a new article
const createArticle = async (req, res) => {
  const { title, description, doctorId } = req.body;
  console.log("Creating article");

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ error: "No such doctor" });
    }

    const article = await Article.create({
      title,
      description,
      doctor: doctor._id,
    });

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error");
  }
};

// Update an article
const updateArticle = async (req, res) => {
  const { id } = req.params;
  const { title, category, description } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such article" });
  }

  const article = await Article.findByIdAndUpdate(
    { _id: id },
    {
      title,
      category,
      description,
    },
    { new: true } // Return the updated article
  );

  if (!article) {
    return res.status(404).json({ error: "No such article" });
  }

  res.status(200).json(article);
};

// Delete an article
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such article" });
  }

  const article = await Article.findOneAndDelete({ _id: id });

  if (!article) {
    return res.status(400).json({ error: "No such article" });
  }

  res.status(200).json(article);
};

const getArticlesByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  console.log("I was hit", doctorId);
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(404).json({ error: "No such doctor" });
  }

  try {
    const articles = await Article.find({ doctor: doctorId })
      .sort({ createdAt: -1 })
      .populate("doctor", "firstName lastName");

    res.status(200).json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json("Error");
  }
};

module.exports = {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByDoctor,
};
