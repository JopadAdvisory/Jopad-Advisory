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
        title: "Understanding Regulatory Compliance in Nigeria",
        slug: "regulatory-compliance-nigeria",
        category: "Compliance",
        summary: "A breakdown of key compliance requirements for businesses operating in Nigeria.",
        content: `
          <p>Regulatory compliance is a fundamental aspect of operating a business in Nigeria. It involves adhering to laws, regulations, and guidelines set by governmental and industry-specific bodies. These regulations are designed to ensure fair practices, protect consumers, and maintain stability within various sectors.</p>

          <p>For many businesses, compliance can feel complex due to the number of regulatory agencies involved. Organizations such as the Corporate Affairs Commission (CAC), Federal Inland Revenue Service (FIRS), and industry-specific regulators all play roles in enforcing compliance standards.</p>

          <p>One of the first steps toward compliance is proper business registration. Without this, a company cannot legally operate or access many financial and legal benefits. Registration also establishes the company as a recognized legal entity.</p>

          <p>Tax compliance is another major component. Businesses are required to file accurate tax returns and make timely payments. Failure to comply with tax regulations can result in significant penalties, audits, or legal action.</p>

          <p>In addition to tax obligations, companies must comply with employment laws. This includes proper documentation of employee contracts, adherence to minimum wage requirements, and compliance with workplace safety regulations.</p>

          <p>Data protection is becoming increasingly important. With the rise of digital operations, businesses must ensure that customer data is handled securely and in accordance with data protection laws. Non-compliance in this area can damage reputation and result in legal consequences.</p>

          <p>Industry-specific compliance adds another layer of responsibility. For example, companies in the financial sector must adhere to strict anti-money laundering (AML) policies, while healthcare providers must follow strict patient safety and data confidentiality standards.</p>

          <p>To manage compliance effectively, many organizations implement internal compliance programs. These programs include regular audits, employee training, and compliance monitoring systems to ensure that all regulations are consistently met.</p>

          <p>Technology also plays a role in simplifying compliance. Automated systems can help track regulatory changes, manage documentation, and ensure timely reporting. This reduces human error and improves efficiency.</p>

          <p>Another important factor is staying updated with regulatory changes. Laws and regulations are not static—they evolve over time. Businesses must actively monitor updates to ensure ongoing compliance.</p>

          <p>Failure to comply with regulations can have serious consequences. These may include fines, legal action, reputational damage, or even the closure of the business. This highlights the importance of taking compliance seriously.</p>

          <p>However, compliance is not just about avoiding penalties. It also builds trust with customers, investors, and partners. A compliant business is seen as reliable, professional, and sustainable in the long term.</p>

          <p>In conclusion, regulatory compliance in Nigeria requires a proactive and structured approach. By understanding the requirements, implementing proper systems, and staying updated, businesses can operate smoothly while minimizing risks and maximizing opportunities.</p>`
        ,
        images: ["/frontend/images/insights/7.jpg"],
        pdfUrl: "/frontend/pdfs/Understanding_Regulatory_Compliance_Nigeria.pdf",
        keywords: ["compliance", "nigeria", "regulation"],
        publishedAt: new Date("2026-01-01")
      },

      {
        title: "Business Licensing: What You Need to Know",
        slug: "business-licensing-guide",
        category: "Licensing",
        summary: "Essential licensing requirements and how to obtain them.",
        content: `
          <p>Business licensing is one of the first and most important steps when starting a company. It ensures that your operations are recognized by regulatory authorities and that you are legally allowed to provide your services or products.</p>

          <p>In Nigeria, different industries have different licensing requirements. For example, financial services, healthcare, and telecommunications are heavily regulated and require specific approvals before operations can begin.</p>

          <p>Failing to obtain the proper licenses can result in penalties, fines, or even the shutdown of your business. This is why it is essential to understand which licenses apply to your specific industry.</p>

          <p>To simplify the process, businesses should consult regulatory bodies early and ensure all documentation is properly submitted. This reduces delays and ensures compliance from the start.</p>`
        ,
        images: ["/frontend/images/insights/4.jpg"],
        pdfUrl: "/frontend/pdfs/Business_Licensing_What_You_Need_to_Know.pdf",
        keywords: ["licensing", "business", "permits"],
        publishedAt: new Date("2026-01-01")
      },

      {
        title: "Corporate Governance Best Practices",
        slug: "corporate-governance-practices",
        category: "Governance",
        summary: "Improve your company structure with strong governance principles.",
        content: `
          <p>Corporate governance refers to the system of rules, practices, and processes by which a company is directed and controlled. Strong governance ensures accountability, fairness, and transparency in a company’s relationship with its stakeholders.</p>

          <p>One of the key principles of good governance is having a clear organizational structure. This includes defining roles and responsibilities for executives, board members, and management teams. When everyone understands their role, decision-making becomes more efficient and conflicts are minimized.</p>

          <p>Transparency is another critical component. Companies must maintain accurate financial records and provide timely disclosures to stakeholders. This builds trust and enhances the company’s credibility in the market.</p>

          <p>Risk management is also essential. Businesses must identify potential risks—legal, financial, or operational—and implement strategies to mitigate them. Regular audits and compliance checks help ensure that these risks are properly managed.</p>

          <p>Ethical leadership plays a major role in governance. Leaders set the tone for the entire organization. When leadership prioritizes integrity and accountability, employees are more likely to follow suit.</p>

          <p>Finally, companies should regularly review and update their governance policies. As businesses grow and regulations evolve, governance frameworks must adapt to remain effective.</p>`
        ,
        images: ["/frontend/images/insights/1.jpg"],
        pdfUrl: "/frontend/pdfs/Understanding_Regulatory_Compliance_Nigeria.pdf",
        keywords: ["governance", "corporate", "structure"],
        publishedAt: new Date("2026-01-01")
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