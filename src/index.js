const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const fs = require('fs');
const pathUploadsFolder = path.resolve(__dirname, "..", "uploads");

if (!fs.existsSync(pathUploadsFolder)) {
  fs.mkdirSync(pathUploadsFolder);
}

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

app.listen(8081, () => {
  console.log(`Server running in port 8081`)
});
