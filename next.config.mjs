/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/w2024-final/**',
			},
			// TODO: test url from Eddie w2024-310-final-eddie delete it later
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/w2024-310-final-eddie/**',
			}
		],
	}
};

export default nextConfig;
