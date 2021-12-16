import { NextApiRequest, NextApiResponse } from "next";

export default function Lessons() {
	return null;
}

// check what lesson they are on then redirect them
export function getServerSideProps({
	req,
	res,
}: {
	req: NextApiRequest;
	res: NextApiResponse;
}) {
	const course = req.query.course;

	const lesson = "1"; // get current lesson from api
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
