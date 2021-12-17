import { Center, Heading, Stack, VStack, Text } from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { getUserCourses } from "api";
import Link from "next/link";
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
				<Stack>
					<Heading>Enrolled Courses</Heading>
					<Text>Pick up where you left off.</Text>
					<Stack>
						{userCourses.length &&
							userCourses.map((course) => (
								<VStack
									key={course.id}
									bgImage={`/${course.id}.png`}
									bgSize="cover"
									bgPosition="center"
									rounded="lg"
									p="20px"
									maxW="600px"
								>
									<Heading size="md">{course.name}</Heading>
									<Link
										href={`/dashboard/courses/${course.id}/lessons`}
									>
										<Button>Continue</Button>
									</Link>
								</VStack>
							))}
					</Stack>
				</Stack>
			</Center>
		</Layout>
	);
}
