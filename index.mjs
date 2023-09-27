import express from "express";
import path from "path";
import generatePdfInvoice from "./generatePdfInvoice.mjs";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  await generatePdfInvoice();
  res.attachment("invoice.pdf");
  res.sendFile(path.resolve("data/invoice.pdf"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
