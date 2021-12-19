/* eslint-disable import/no-default-export */
import { extendTheme } from "@chakra-ui/react";
import Link from "./components/Link";

const theme = extendTheme({
	colors: {
		primary: "#6C7DFE",
		gradient: "linear-gradient(135deg, #6C7DFE 0%, #A688EC 100%)",
		background: "#f8f8f8",
		secondary: "rgb(0 0 0 / 40%)",
		secondaryHover: "rgb(0 0 0 / 20%)",
	},
	components: {
		Link,
	},
	styles: {
		global: () => ({
			body: {
				fontFamily:
					"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
				lineHeight: "base",
				padding: 0,
				margin: 0,
				background: "background",
				textAlign: "left",
			},
			a: {
				color: "inherit",
				textDecoration: "none",
			},
			ul: {
				listStyle: "none",
			},
			"h1, h2, h3, h4, h5, h6": {
				fontFamily: "Roboto",
			},
			".rounded": {
				borderTopRadius: "0.75rem",
			},
			".circle": {
				borderRadius: "50%",
			},
			".required": {
				color: "red",
			},
			"&::-webkit-scrollbar": {
				width: "0.6em",
			},
			"&::-webkit-scrollbar-track": {
				borderRadius: "0px",
				background: "background",
			},
			"&::-webkit-scrollbar-thumb": {
				background: "primary",
				borderRadius: rounded,
			},
		}),
	},
});

export default theme;

export const themes = {
	red: {
		primary: "#ff3366",
		// background: "hsl(345, 64.51612903225805%, 10%)",
	},
	orange: {
		primary: "#ff6b00",
		// background: "hsl(25.176470588235293, 100%, 10%)",
	},
	yellow: {
		primary: "#ffbb00",
		// background: "hsl(44, 100%, 10%)",
	},
	green: {
		primary: "#00cc88",
		// background: "hsl(160, 100%, 10%)"
	},
	blue: {
		primary: "#00bbff",
		// background: "hsl(196, 100%, 10%)"
	},
	purple: {
		primary: "#8957ff",
		// background: "hsl(257.85714285714283, 100%, 10%)",
	},
	pink: {
		primary: "#fa8abb",
		// background: "hsl(333.75, 91.80327868852459%, 10%)",
	},
	default: {
		primary: "#6C7DFE",
		background: "#1a1a1a",
	},
};

const rounded = "xl";
const shadow = "lg";
export { rounded, shadow };
