'use strict'
const merge = require('webpack-merge')
require('dotenv').config()
module.exports = merge(
  {
    BASE_API_URL: process.env.BASE_API_URL ? `"${process.env.BASE_API_URL}"` : '"http://localhost:3000"'
  },
  {
    NODE_ENV: '"production"'
  }
)
