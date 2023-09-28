import puppeteer from "puppeteer";
import getInvoiceAsHTML from "./getInvoiceAsHTML.mjs";

async function generateInvoiceAsPDF() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    const htmInvoiceData = await getInvoiceAsHTML();
    await page.setContent(htmInvoiceData, { waitUntil: "networkidle0" });
    await page.evaluateHandle("document.fonts.ready");

    await page.pdf({
      path: "data/invoice.pdf",
      printBackground: true,
      format: "LEGAL",
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    await page.close();
    await browser.close();
  }
}

export default generateInvoiceAsPDF;
