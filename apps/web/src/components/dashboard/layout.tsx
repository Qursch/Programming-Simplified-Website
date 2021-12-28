import ProgressBar from "@badrap/bar-of-progress";
import { Box, Flex, Portal } from "@chakra-ui/react";
import { getCookie } from "@lib/cookie";
import { themes } from "@styles/theme";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MobileTopBar from "./nav/mobiletopbar";
import Sidebar from "./nav/sidebar";

export default function Layout({ children = null }) {
	const router = useRouter();

	if (typeof window === "undefined") return null;

	const progress = new ProgressBar({
		size: 3,
		color: "#ffffff",
		delay: 0,
	});
	useEffect(() => {
		router.events.on("routeChangeStart", progress.start);
		router.events.on("routeChangeComplete", progress.finish);
		router.events.on("routeChangeError", progress.finish);
	}, [router.events]);
	useEffect(() => {
		var ads = document.getElementsByClassName("adsbygoogle").length;

		for (var i = 0; i < ads; i++) {
			if (typeof window !== "undefined")
				// @ts-ignore
				(window.adsbygoogle = window.adsbygoogle || []).push({});
		}
	}, []);

	const themeCookie =
		(themes[getCookie("theme")] && getCookie("theme")) || "default";
	const [theme, setTheme] = useState(themeCookie);

	return (
		<Flex h="100vh" flexDirection="column" color="white">
			<Portal>
				<style>
					{`
							body {
								color: white;
							}
						`}
				</style>
			</Portal>
			<MobileTopBar theme={theme} setTheme={setTheme} />
			<Flex flex="1">
				<Sidebar
					display={{ base: "none", md: "flex" }}
					h="100vh"
					theme={theme}
					setTheme={setTheme}
				/>
				<Box bg="background" boxSize="100%" minH="100vh">
					{children}
				</Box>
			</Flex>
			<style>
				{`
					:root {
						--chakra-colors-primary: ${themes[theme]?.primary};
						--chakra-colors-background: ${
							themes[theme]?.background ||
							`hsl(${hexToHsl(themes[theme]?.primary)}, 10%)`
						};
					}
					body {
						background: var(--chakra-colors-background);
					}
				`}
			</style>
		</Flex>
	);
}

export function hexToRgb(color) {
	let hex = color[0] === "#" ? color.slice(1) : color;
	let c;

	if (hex.length !== 6) {
		hex = (() => {
			const result = [];
			for (c of Array.from(hex)) {
				result.push(`${c}${c}`);
			}
			return result;
		})().join("");
	}
	const colorStr = hex.match(/#?(.{2})(.{2})(.{2})/).slice(1);
	const rgb = colorStr.map((col) => parseInt(col, 16));
	rgb.push(1);
	return rgb;
}

function rgbToHsl(rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const diff = max - min;
	const add = max + min;

	const hue =
		min === max
			? 0
			: r === max
			? ((60 * (g - b)) / diff + 360) % 360
			: g === max
			? (60 * (b - r)) / diff + 120
			: (60 * (r - g)) / diff + 240;

	const lum = 0.5 * add;

	const sat =
		lum === 0
			? 0
			: lum === 1
			? 1
			: lum <= 0.5
			? diff / add
			: diff / (2 - add);

	const h = Math.round(hue);
	const s = Math.round(sat * 100);
	const l = Math.round(lum * 100);
	const a = rgb[3] || 1;

	return [h, s, l, a];
}

function hexToHsl(color) {
	const rgb = hexToRgb(color);
	const hsl = rgbToHsl(rgb);
	return `${hsl[0]}, ${hsl[1]}%`;
}
