const chromium = require('chrome-aws-lambda');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const { readFileSync } = require("fs");

exports.handler = async (event, context, callback) => {
  let browser = null;

  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    let page = await browser.newPage();

    await page.goto('http://randomwebsite.xyz/#/pierre-vautherin-cv-2020', { waitUntil: 'networkidle2'});
    const pdf = await page.pdf({ format: 'A4', printBackground: true });
    console.log('created PDF !')
    await browser.close();

    const destparams = {
        Bucket: 'cv-pierrevautherin',
        Key: 'CV_Pvautherin_EN_2020.pdf',
        Body: pdf,
        ContentType: 'application/pdf'
        };

    const putResult = await s3.putObject(destparams).promise();
    console.log(putResult)
  } catch (error) {
    return console.log(error);
  }
};