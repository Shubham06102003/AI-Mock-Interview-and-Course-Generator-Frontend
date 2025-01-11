// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images:{
//         domains:['firebasestorage.googleapis.com','img.clerk.com']
//     }
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['firebasestorage.googleapis.com', 'img.clerk.com'],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*', // Matches any path under `/api/`
                destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
                // destination: 'http://44.202.217.131:5000/api/:path*', // Your backend's HTTP URL
            },
        ];
    },
};

export default nextConfig;
