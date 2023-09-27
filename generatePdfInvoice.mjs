import puppeteer from "puppeteer";
import getHtmldata from "./getHtmldata/getHtmldata.mjs";

const browser = await puppeteer.launch({ headless: "new" });

export default async function generatePdfInvoice() {
  const page = await browser.newPage();
  const htmInvoiceData = await getHtmldata();
  await page.setContent(htmInvoiceData, { waitUntil: "networkidle0" });
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf({
    path: "data/invoice.pdf",
    printBackground: true,
    format: "LEGAL",
  });
  await page.close();
}
