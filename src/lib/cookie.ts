function setCookie(name: string, value: string, days: number = 365) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = `; expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ""}${expires}; path=/`;
}

function getCookie(name: string) {
	const nameEQ = `${name}=`;
	const ca = document.cookie.split(";");
	for (let c of ca) {
		c = c.trim();
		if (c.startsWith(nameEQ)) {
			return c.slice(nameEQ.length, c.length);
		}
	}
	return null;
}

function eraseCookie(name: string) {
	document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

function getParameterByName(name: string) {
	const url = window.location.href;
	name = name.replace(/[[\]]/g, "\\$&");
	const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
	const results = regex.exec(url);
	if (!results) {
		return null;
	}
	if (!results[2]) {
		return "";
	}
	return decodeURIComponent(results[2].replaceAll("+", " "));
}

export { setCookie, getCookie, eraseCookie, getParameterByName };
