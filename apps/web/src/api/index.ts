import axios from "axios";
import { API_URL } from "config";

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 5000;

export async function login(body) {
	return axios.post("/auth/login", body);
}
export async function register(body) {
	return axios.put("/auth/register", body);
}

export async function submitFeedback(body) {
	return axios.post("/feedback/suggestion", body);
}

export async function submitBugReport(body) {
	return axios.post("/feedback/bug", body);
}

export async function submitHelpRequest(body) {
	return axios.post("/feedback/help", body);
}

export async function enrollInCourse(body) {
	return axios.put("/course/enroll", body, {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
}

export async function updateCourse(course) {
	return axios.put("/course", course, {
		headers: {
			"Authorization": `Bearer ${process.env.API_TOKEN}`
		}
	});
}

export async function getUserCourse(courseId) {
	return axios.get(`/course/${courseId}`, {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
}

export async function getUserCourses() {
	return axios.get("/course/all", {
		headers: {
			"Authorization": `Bearer ${localStorage.getItem("token")}`
		}
	});
}
