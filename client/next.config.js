/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["picsum.photos", "ovioo-test-2.s3.eu-west-1.amazonaws.com"],
    },
    concurrentFeatures: true,
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    minify: false, // Disable minification
};

module.exports = nextConfig;
