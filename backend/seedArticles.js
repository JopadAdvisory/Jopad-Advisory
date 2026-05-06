const mongoose = require("mongoose");
require("dotenv").config();

const Article = require("./models/articles");

const MONGO_URI = process.env.MONGO_URI;

async function seedArticles() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");


    // await Article.deleteMany();

    const articles = [
      {
        title: "Nigerian Corporate Tax Exposure for Resident and Non-Resident Entities",
        slug: "nigerian-corporate-tax-exposure",
        category: "Compliance - Advisory Memorandum",
        summary: "Nigeria operates a broad corporate tax framework that applies to both resident and non-resident entities engaging in its market.",
        content: `
          <p class="heading">Executive Summary</p>

          <p>Nigeria operates a broad corporate tax framework that applies to both resident and non-resident entities engaging in its market. Tax exposure is no longer dependent on physical presence; any sustained economic interaction with Nigeria may trigger tax obligations, particularly under Significant Economic Presence rules applicable to digital and cross-border business models.</p>

          <p class="heading">Objective</p>
          
          <p>This advisory clarifies how Nigeria asserts taxing rights over local and foreign business activities and outlines the practical implications for structuring, compliance, and risk management.</p>
          
          <p class="heading">Regulatory Position</p>
          
          <p>Resident companies are subject to tax on worldwide income, while non-resident entities are taxed on Nigeria-source income. Foreign entities may become taxable when they establish a Significant Economic Presence, including through revenue generated in Nigeria, digital targeting of Nigerian users, or the provision of technical, professional, or consultancy services to Nigerian clients.</p>
          
          <p class="heading">Practical Interpretation</p>
          
          <p>Regulatory enforcement reflects a clear preference for economic substance over legal form. Offshore structures that lack operational separation, clear revenue attribution, or credible compliance positioning are increasingly vulnerable to scrutiny. Digital and service-based models are the primary focus of enforcement expansion.</p>
          
          <p class="heading">Risk Considerations</p>
          
          <ul class="list">
            <li>Regulatory enforcement and compliance exposure</li>
            <li>Unanticipated tax liabilities and penalties</li>
            <li>Operational friction, including banking and payment constraints</li>
            <li>Reduced credibility with regulators and counterparties</li>
          </ul>
          
          <p class="heading">JOPAD Position and Recommended Approach</p>
          
          <p>Nigeria should be approached as an active and assertive tax jurisdiction. Businesses engaging Nigerian customers should adopt a deliberate structuring strategy that:</p>
          
          <ul class="list">
            <li>Clearly distinguishes Nigerian-source income from offshore revenue</li>
            <li>Assesses exposure under Significant Economic Presence thresholds</li>
            <li>Aligns entity structure with Nigerian regulatory expectations</li>
            <li>Ensures efficient withholding tax and corporate tax positioning</li>
            <li>Implements documentation and internal controls to support defensibility</li>
          </ul>

          <p class="heading">Conclusion</p>

          <p>Nigeria’s tax regime is designed to capture value derived from its market irrespective of where a business is incorporated. The priority is to establish a structure that is compliant, operationally viable, and capable of withstanding regulatory scrutiny while supporting long-term commercial objectives.</p>

          <p class="closing">
            Jogos Partners & Advisory LP (JOPAD) <br />
            Virtual-First Advisory Practice <br />
            Abuja, Nigeria
          </p>`
        ,
        images: ["/frontend/images/insights/4.webp"],
        pdfUrl: "/frontend/documents/2026-05-06 – Advisory – Nigerian Corporate Tax Exposure – Resident & Non-Resident Entities.pdf",
        keywords: [
          "tax",
          "corporate tax",
          "significant economic presence",
          "non-resident taxation",
          "cross-border business",
          "nigeria tax law"
        ],
        publishedAt: new Date("2026-05-06")
      }
    ];

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