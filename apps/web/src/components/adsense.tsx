import React, { useEffect } from "react";

export default function Adsense({slot}) {
	const loadAds = () => {
		try {
			if (typeof window !== "undefined") {
				// @ts-ignore gets injected by adsense
				(window.adsbygoogle = window.adsbygoogle || []).push({});
			}
		} catch (error) {
			console.log("adsense error", error.message);
		}
	};

	useEffect(() => {
		loadAds();
	}, []);

	return (
		<ins
			className="adsbygoogle"
			style={{ display: "block" }}
			data-ad-client="ca-pub-8350269166887594"
			data-ad-slot={slot}
			data-ad-format="auto"
			data-adtest={process.env.NODE_ENV === "development" ? "on" : "off"}
			data-full-width-responsive="true"
		/>
	);
}

