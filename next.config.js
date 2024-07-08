const { sources } = require('next/dist/compiled/webpack/webpack')

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/great/dashboard',
    assetPrefix: '/great/dashboard/',
    async rewrites(){
        return [
            {
            source:"/api/v1/:path*",
            destination:"https://greatrun.ethiotelecom.et/great/v1/:path*"},
        ]
    }

}

module.exports = nextConfig
