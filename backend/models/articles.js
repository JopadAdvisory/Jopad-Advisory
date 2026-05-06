const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        enum: ["Compliance - Advisory Memorandum", "Licensing - Advisory Memorandum", "Governance - Advisory Memorandum", "Data Protection - Advisory Memorandum", "Contracts - Advisory Memorandum"],
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }],
    pdfUrl: {
        type: String
    },
    keywords: [{
        type: String
    }],
    publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model("Article", articleSchema);