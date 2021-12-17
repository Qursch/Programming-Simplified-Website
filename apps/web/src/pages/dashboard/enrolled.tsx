import { Center, Heading } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { getUserCourses } from "api";
import { useEffect, useState } from "react";

export default function Enrolled() {
	const [userCourses, setUserCourses] = useState([]);

	useEffect(() => {
		getUserCourses().then(({ data }) => {
			console.log(data);
			setUserCourses(data);
		});
	}, []);

	return (
		<Layout>
			<Center minH="100vh">
				<Heading>Under Construction</Heading>
			</Center>
		</Layout>
	);
}
