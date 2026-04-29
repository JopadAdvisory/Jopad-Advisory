const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("./models/articles");

const MONGO_URI = process.env.MONGO_URI;

async function seedArticles() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");


    await Article.deleteMany();

    const articles = [
      {
        title: "Understanding Regulatory Compliance in Nigeria",
        slug: "regulatory-compliance-nigeria",
        category: "Compliance",
        summary: "A breakdown of key compliance requirements for businesses operating in Nigeria.",
        content: `
          <p>Regulatory compliance is a critical aspect of running a business in Nigeria.</p>
          <p>Companies must adhere to laws set by governing bodies to avoid penalties.</p>
          <p>This article explores key frameworks and best practices.</p>`
        ,
        images: ["/frontend/images/insights/intake-image.webp"],
        pdfUrl: "/frontend/pdfs/compliance.pdf",
        keywords: ["compliance", "nigeria", "regulation"]
      },

      {
        title: "Business Licensing: What You Need to Know",
        slug: "business-licensing-guide",
        category: "Licensing",
        summary: "Essential licensing requirements and how to obtain them.",
        content: `
          <p>Licensing is required for most business operations.</p>
          <p>Different industries have different licensing authorities.</p>
          <p>Understanding the process helps avoid delays.</p>`
        ,
        images: ["/frontend/images/insights/intake-image.webp"],
        pdfUrl: "/frontend/pdfs/licensing.pdf",
        keywords: ["licensing", "business", "permits"]
      },

      {
        title: "Corporate Governance Best Practices",
        slug: "corporate-governance-practices",
        category: "Governance",
        summary: "Improve your company structure with strong governance principles.",
        content: `
          <p>Corporate governance ensures accountability and transparency.</p>
          <p>It builds trust with investors and stakeholders.</p>
          <p>This guide outlines practical steps for implementation.</p>`
        ,
        images: ["/frontend/images/insights/intake-image.webp"],
        pdfUrl: "/frontend/pdfs/governance.pdf",
        keywords: ["governance", "corporate", "structure"]
      }
    ];

    await Article.insertMany(articles);
    for (const article of articles) {
        await Article.updateOne(
            { slug: article.slug },
            { $set: article },
            { upsert: true }
        );
    }

    console.log("Articles seeded successfully");
    process.exit();

  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedArticles();