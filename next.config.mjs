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
			//  dev url from Eddie w2024-310-final-eddie 
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
