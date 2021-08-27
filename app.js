const express = require('express');

const app = express();
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes');

require('dotenv').config();

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan(env == "development" ? "dev" : "tiny"));

app.use('/api', routes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
