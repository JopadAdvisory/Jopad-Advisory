const express = require("express");
const router = express.Router();
const Article = require("../models/articles");

router.get("/", async (req, res) => {
  try {
    const { exclude, limit } = req.query;

    let query = {};

    // Exclude current article
    if (exclude) {
      query.slug = { $ne: exclude };
    }

    let dbQuery = Article.find(query).sort({ publishedAt: -1 });

    // Limit results (for carousel)
    if (limit) {
      dbQuery = dbQuery.limit(parseInt(limit));
    }

    const articles = await dbQuery;

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching articles" });
  }
});

router.get("/:slug", async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug });

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.json(article);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });   
    }
});

module.exports = router;