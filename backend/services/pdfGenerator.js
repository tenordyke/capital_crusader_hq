const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

const generateCarBuyersGuide = async () => {
  let browser;
  try {
    // Read the HTML template
    const htmlPath = path.join(__dirname, '..', 'templates', 'car-buyers-guide.html');
    const htmlContent = await fs.readFile(htmlPath, 'utf8');
    
    // Launch puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set the HTML content
    await page.setContent(htmlContent, {
      waitUntil: 'networkidle0'
    });
    
    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    await browser.close();
    
    return pdfBuffer;
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    if (browser) await browser.close();
    throw error;
  }
};

// Alternative method using html-pdf if puppeteer is not available
const generateCarBuyersGuideFallback = async () => {
  const pdf = require('html-pdf');
  const htmlPath = path.join(__dirname, '..', 'templates', 'car-buyers-guide.html');
  const htmlContent = await fs.readFile(htmlPath, 'utf8');
  
  const options = {
    format: 'Letter',
    border: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    }
  };
  
  return new Promise((resolve, reject) => {
    pdf.create(htmlContent, options).toBuffer((err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
};

module.exports = { generateCarBuyersGuide, generateCarBuyersGuideFallback };
