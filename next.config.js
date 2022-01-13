/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  i18n,
  env:{
    mabbox_key:"pk.eyJ1IjoibXVkYXNzaXJ3YXNlZW0iLCJhIjoiY2t5N28xZWJtMTJnbTJwczFxOG44Zm1reSJ9.RtI6mis2IxXxWelXc2dI1Q"
  }
}
