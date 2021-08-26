const express = require('express');

const app = express();
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.listen(port, () => {
  console.log('Example app listening on port: ', port);
});
