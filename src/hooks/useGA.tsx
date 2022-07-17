import { GA_TRACKING_ID } from "config";
import { User } from "types";
import ReactGA from "react-ga4";

export default function useGA(user: User, pageView: boolean = true) {
	ReactGA.initialize([
		{ trackingId: GA_TRACKING_ID, gaOptions: { clientId: user.id } },
	]);

	if (pageView) ReactGA.send("pageview");
}
