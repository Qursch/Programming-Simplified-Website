import { IS_PRODUCTION } from "config";
export function parseHostName(path) {
	return `${IS_PRODUCTION ? "https://" : "http://"}${
		window.location.host
	}${path}`;
}
