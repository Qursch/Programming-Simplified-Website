import { getUserCourse } from "api";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { API_URL } from "config";

axios.defaults.baseURL = API_URL;

export default function Lessons() {
	return null;
}

export async function getServerSideProps({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	const course = req.url.split("course=")[1];

	// @ts-ignore
	const { data } = await axios.get(`/course/${course}`, {
		headers: {
			Authorization: `Bearer ${req.cookies.token}`,
		},
	});
	console.log(data);

	if (course && data.currentLesson) {
		res.writeHead(302, {
			Location: `/dashboard/courses/${course}/lessons/${data.currentLesson.id}`,
		});
		res.end();
	}
	return {
		props: {},
	};
}
