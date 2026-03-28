const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const app = express();
app.use(cors());

app.get('/api/search', async (req, res) => {
  const ingredient = req.query.q;
  try {
    const response = await fetch(`https://www.trolley.co.uk/search/?from=search&q=${ingredient}&order=price`);
    const html = await response.text();
    
    // Parse HTML with cheerio
    const $ = cheerio.load(html);
    const results = [];

    // Extract product data from HTML
    $('.product-item').each((index, element) => {
      const brand = $(element).find('._brand').text().trim();
      const desc = $(element).find('._desc').text().trim();
      const name = `${brand} ${desc}`;
      const priceText = $(element).find('._price').text().trim();
      const price = parseFloat(priceText.match(/£([\d.]+)/)?.[1] || 0);
      const url = $(element).find('a').attr('href');
      
      if (name && price > 0) {
        results.push({ name, price, url: url ? `https://www.trolley.co.uk${url}` : null });
      }
    });

    // Find the lowest cost item
    const lowestItem = results.reduce((min, item) => 
      item.price < min.price ? item : min
    );

    // Fetch store info from product page
    const storeResponse = await fetch(lowestItem.url);
    const storeHTML = await storeResponse.text();
    const $store = cheerio.load(storeHTML);
    
    const store = $store('.store-logo').attr('title') || 'Unknown';
    lowestItem.store = store;

    res.json(lowestItem || { error: 'No results found' });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));