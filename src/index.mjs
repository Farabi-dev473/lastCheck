import express from "express";
import path from "path";
import generateInvoiceAsPDF from "./utils/generateInvoiceAsPDF.mjs";

const app = express();
const port = 4000;

app.get("/", async (_, res) => {
  try {
    await generateInvoiceAsPDF();

    res.sendFile(path.join(process.cwd(), "data/invoice.pdf"), (err) => {
      if (err) {
        console.error("Error sending PDF file:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
