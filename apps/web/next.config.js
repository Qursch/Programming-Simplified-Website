// @ts-check

/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
	async redirects() {
		return [
			{
				source: "/join",
				destination: "/discord",
				permanent: true,
			},
			{
				source: "/discord",
				destination: "https://discord.gg/s6HAveWMCg",
				permanent: true,
			},
			{
				source: "/instagram",
				destination:
					"https://www.instagram.com/programmsimplified",
				permanent: true,
			},
			{
				source: "/dashboard/courses/:course/lessons",
				destination: "/dashboard/courses/:course/lessons/0",
				permanent: true,
			},
		];
	},
	// rust compiler (5x faster build times) (3x faster refresh times)
	swcMinify: true,
	images: {
		domains: ["cdn.discordapp.com", "s3.us-west-2.amazonaws.com"],
	},
};
