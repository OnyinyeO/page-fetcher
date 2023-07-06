const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const fetcher = (url, filePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:', error);
      return;
    }

    if (response.statusCode !== 200) {
      console.error('Request failed. Status code:', response.statusCode);
      return;
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.error('Error:', error);
        return;
      }

      const fileSize = body.length;
      console.log(`Downloaded and saved ${fileSize} bytes to ${filePath}`);
    });
  });
};

fetcher(url, filePath);
