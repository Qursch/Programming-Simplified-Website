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
	const lesson = "1"; // TODO: get current lesson from db

	res.writeHead(302, {
		Location: lesson,
	});
	res.end();

	return {
		props: {},
	};
}
