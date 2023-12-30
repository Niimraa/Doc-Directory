const express = require("express");

const {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByDoctor,
} = require("../controllers/articleController");

const router = express.Router();

router.get("/all", getAllArticles);

router.get("/all/:doctorId", getArticlesByDoctor);

router.post("/create", createArticle);

router.get("/:id", getArticle);

router.patch("/update/:id", updateArticle);

router.delete("/delete/:id", deleteArticle);

module.exports = router;
