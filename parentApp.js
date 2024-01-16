const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});

// Define routes to forward requests to the child applications based on the URL path
app.all('/new jnpa', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:3000' }); // Assuming "newjnpa" is running on port 3000
});

app.all('/mongo-html', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:5000' }); // Assuming "mongo-html" is running on port 5000
});

// Start the parent application on a common port (e.g., 3000)
const port = 3000;
app.listen(port, () => {
  console.log(`Parent application is running on port ${port}`);
});
