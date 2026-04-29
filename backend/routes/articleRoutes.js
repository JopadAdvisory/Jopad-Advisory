const express = require("express");
const router = express.Router();
const Article = require("../models/articles");

router.get("/", async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: - 1});
        res.json(articles);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
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