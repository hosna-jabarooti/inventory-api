// generateData.js
const { faker } = require('@faker-js/faker');

function generateItem() {
  return {
    // _id: faker.datatype.uuid(),  Error!
    // id : faker.string.uuid(),
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price(1, 1000, 2)), // price between $1 and $1000
    category: faker.commerce.department(), // or a custom list if you prefer
    // stock: faker.datatype.number({ min: 0, max: 1000 }),  Error!
    stock: faker.number.int({ min: 0, max: 1000 }),
    isAvailable: faker.datatype.boolean(),
    createdAt: faker.date.past(), // or faker.date.recent() for recent dates
  };
}

function generateDataset(count) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateItem());
  }
  return data;
}

// Customize how many records I want
const RECORD_COUNT = parseInt(process.argv[2], 10) || 100;

// Generate and save to data.json
const data = generateDataset(RECORD_COUNT);
const fs = require('fs');
fs.writeFileSync('products.json', JSON.stringify(data, null, 2), 'utf8');
console.log(`Generated ${RECORD_COUNT} records to data.json`);