import fs from 'fs';
import http from 'http';
import url from 'url';
import { fileURLToPath } from 'url';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

////////////////////// FILES ////////////////////////
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textIn);

// non-blocking I/O (input/output model)
// fs.readFile('./txt/input.txt', 'utf-8', (err, data) => console.log(data));

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('file written');


////////////////////// SERVER ////////////////////////

// readFileSync, here it is OK that it's blocking the rest, as this fetching of data is made only once and before all the other server routing.

const replaceTemplate = (temp, product) => {
    return output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
};

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    console.log(url.parse(req.url, true));
    if (pathname === '/overview') {
        res.end('This is the OVERVIEW');
        return;
    }
    if (pathname === '/product') {
        res.end('This is the PRODUCT');
        return;
    }
    if (pathname === '/api') {
        res.writeHead(200, {
            'Content-type': 'application/json',
        })
        res.end(data);
        return;
    }
    res.writeHead(404, {
        'Content-type': 'text/html',
        'my-own-header': 'hello world',
    });
    res.end('Page not found');
});

server.listen(8000, '127.0.0.1', () => console.log('Listening to requests on port 8000'));