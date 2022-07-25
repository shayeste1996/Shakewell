/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')



const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  
}

module.exports = nextTranslate(nextConfig)
