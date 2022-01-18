/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  env:{
    mabbox_key:"pk.eyJ1IjoibXVkYXNzaXJ3YXNlZW0iLCJhIjoiY2t5ZGJxN3dhMDBvZjJ4czh1Z2tvMWk1aiJ9.18X4TCd5fO7JPcfm4U3PTw"
  }
}
