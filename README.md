# pdf-generator-lambda

This lambda does a PDF print of [my CV static page](http://randomwebsite.xyz/#/pierre-vautherin-cv-2020) and pushes the file on a S3 bucket.
This lambda is triggered by each file change on the S3 bucket containing the CV.
So it will re-render automatically the PDF file !

## Usage
`yarn push` will zip the lambda handler and node_modules and push the archive to S3.
It automatically updates the Lambda function-code.

## Dependencies
Based on [Puppeeter](https://github.com/puppeteer/puppeteer) + [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)
