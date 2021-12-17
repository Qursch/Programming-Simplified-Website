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

export async function enrollInCourse(body, options = {}) {
	return axios.put("/course/enroll", body, options);
}

export async function getUserCourse(courseId, options = {}) {
	return axios.get(`/course/${courseId}`, options);
}