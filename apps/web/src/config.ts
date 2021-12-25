const GA_TRACKING_ID = "G-50YH3YHM77";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const META = {
	title: "Programming Simplified",
	lang: "en-us",
	description:
		"Learn to code using state of the art learning techniques, and get help 1 on 1 to help debug your issues",
	url: "https://programmingsimplified.org",
	image: "/logo_primary.png",
	tags: [
		"coding help",
		"coding",
		"programming",
		"programming simplified",
		"programming help",
		"free coding help",
		"free programming help",
		"programming courses",
	],
};

const API_URL = IS_PRODUCTION
	? "https://c589-72-193-196-156.ngrok.io"
	: "http://localhost:8080";

export { GA_TRACKING_ID, IS_PRODUCTION, META, API_URL };