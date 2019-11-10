'use strict';
const dotenv = require('dotenv');
const app = require('./express/server');

const result = dotenv.config({ path: './.env' });
if (result.error) {
  throw result.error
}

app.listen(3000, () => console.log('Local app listening on port 3000!'));
