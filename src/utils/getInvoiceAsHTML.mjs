import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

export default async function readHTMLFile() {
  const currentFilename = fileURLToPath(import.meta.url);
  const currentDirectory = path.dirname(currentFilename);
  const htmlFilePath = path.join(currentDirectory, "../ui/invoice.html");

  let invoiceHTML;

  try {
    invoiceHTML = await fs.readFile(htmlFilePath, "utf-8");
  } catch (error) {
    console.error("Error reading HTML file:", error);
    throw error;
  }

  return invoiceHTML;
}
