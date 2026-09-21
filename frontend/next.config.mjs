/**@type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false
    },
    env: {
        SERVER_URL: process.env.SERVER_URL,
        GOOGLE_RECAPTCHA_SITE_KEY: '6Lff9cMtAAAAAEb0oD0o7Fe4lXknBYBgRkqMhEBu'
    },
    images: {
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'avatar.yandex.net'
            }
        ]
    }
};

export default nextConfig;