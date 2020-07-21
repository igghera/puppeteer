const puppeteer = require("puppeteer");
const express = require("express");
const app = express();

app.get("/", function (req, res) {
  console.log("Got a call, rendering...");
  printPDF()
    .then((pdf) => {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.listen(3000, function () {
  console.log("Express listening on port 3000");
});

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function printPDF() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["—use-gl=egl"],
  });
  const page = await browser.newPage();
  await page.goto("https://serene-archimedes-cbb4ff.netlify.app/", {
    timeout: 0,
  });

  await page.waitForSelector('.loaded');


  const pdf = await page.pdf({ format: "A4" });
  await browser.close();
  return pdf;
}
