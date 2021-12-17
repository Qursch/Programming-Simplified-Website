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
	const course = req.query?.course;


	if (course && req.cookies.lesson) {
		res.writeHead(302, {
			Location: `/dashboard/courses/${course}/lessons/${req.cookies.lesson}`,
		});
		res.end();
	}
	return {
		props: {},
	};
}
