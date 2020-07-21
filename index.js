const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  printPDF().then((pdf) => {
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdf.length,
    });
    res.send(pdf);
  });
});

app.listen(3000, function () {
  console.log("Express listening on port 3000");
});

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["—use-gl=egl"],
  });
  const page = await browser.newPage();
  await page.goto("https://threejs.org/examples/#webgl_animation_cloth", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}
