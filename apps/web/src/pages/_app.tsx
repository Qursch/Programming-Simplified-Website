import { ChakraProvider } from "@chakra-ui/react";
import { pageview } from "@lib/gtag";
import theme from "@styles/theme";
import { META } from "config";
import { AuthProvider } from "@providers/authContext";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function MyApp({
	Component,
	pageProps: { ...pageProps },
}: AppProps) {
	const router = useRouter();
	useEffect(() => {
		const handleRouteChange = (url: unknown) => {
			pageview(url);
		};

		router.events.on("routeChangeComplete", handleRouteChange);
		return () => {
			router.events.off("routeChangeComplete", handleRouteChange);
		};
	}, [router.events]);

	const titleArray = router.asPath.split("/");
	const title = titleArray[titleArray.length - 1];
	return (
		<>
			<Head>
				<title>
					{META.title} |{" "}
					{title.charAt(0).toUpperCase() + title.slice(1) ||
						"Coding Courses"}
				</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<ChakraProvider theme={theme}>
				<AuthProvider>
					<Component {...pageProps} />
				</AuthProvider>
			</ChakraProvider>
		</>
	);
}
