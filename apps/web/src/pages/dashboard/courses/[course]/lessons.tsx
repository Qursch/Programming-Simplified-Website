import { NextApiRequest, NextApiResponse } from "next";

export default function Lessons() {
	return null;
}

export function getServerSideProps({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	const course = req.query?.course;

	const lesson = "1"; // TODO: get current lesson from db

	if (course && lesson) {
		res.writeHead(302, {
			Location: `/dashboard/courses/${course}/lessons/${lesson}`,
		});
		res.end();
	}
	return {
		props: {},
	};
}
