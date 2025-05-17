import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Go to your page, wait for full load
    await page.goto("https://charles-cv-mu.vercel.app", {
      waitUntil: "networkidle0",
    });

    // Inject CSS to remove margins and prevent page breaks
    await page.addStyleTag({
      content: `
        @page {
          margin: 0;
        }
        body, html {
          margin: 0;
          padding: 0;
          font-size: 10px;
          -webkit-print-color-adjust: exact;
        }
        * {
          page-break-inside: avoid !important;
          break-inside: avoid !important;
          page-break-after: auto !important;
          page-break-before: auto !important;
        }
      `,
    });

    // Get full height of page content (scrollHeight gives full content height)
    const bodyHeight = await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    });

    // Create PDF with width = A4 width and height = full content height in pixels
    const pdfBuffer = await page.pdf({
      printBackground: true,
      width: "210mm", // A4 width
      height: `${bodyHeight}px`, // set full page height here
      margin: { top: 0, bottom: 0, left: 0, right: 0 },
      pageRanges: "1", // just 1 page forced
    });

    await browser.close();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="charles-cv.pdf"'
    );
    res.status(200).end(pdfBuffer);
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
}
