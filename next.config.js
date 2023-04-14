/**
 * @type {import('next').NextConfig}
 */
module.exports = (phase, { defaultConfig }) => {
    return {
        compress: false,
        images: {
            unoptimized: true
        }
    }
}