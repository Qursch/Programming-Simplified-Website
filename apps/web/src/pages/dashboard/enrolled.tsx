import {
	Center,
	Heading,
	Stack,
	VStack,
	Text,
	SimpleGrid,
	Divider,
	Box,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
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
				<Stack>
					<Heading>Enrolled Courses</Heading>
					<Text>Pick up where you left off.</Text>
					<SimpleGrid columns={2}>
						{userCourses.length &&
							userCourses.map((userCourse) => {
								console.log(userCourse);
								const sections = [
									<Heading size="md">
										{userCourse.name}
									</Heading>,

									<Text>
										Progress:{" "}
										{
											userCourse.lessons[
												userCourse.currentLesson
											].progress
										}
									</Text>,
									<Text>
										Number: {userCourse.currentLesson}
									</Text>,
									<Text>
										Name:{" "}
										{
											userCourse.lessons[
												userCourse.currentLesson
											].name
										}
									</Text>,
									<Text>
										{"You've Spent: // TODO: time spent on course"}
									</Text>,
								];
								return (
									<Stack
										key={userCourse.id}
										bgImage={`/${userCourse.id}.png`}
										bgSize="cover"
										bgPosition="center"
										rounded="lg"
										p="20px"
										maxW="600px"
									>
										{sections.map((section) => (
											<>
												{section}
												<Box py={2} w="100%">
													<Divider />
												</Box>
											</>
										))}
										<NextChakraLink
											href={`/dashboard/courses/${userCourse.id}/lessons/${userCourse?.currentLesson}`}
											pt={4}
										>
											<Button>Continue</Button>
										</NextChakraLink>
									</Stack>
								);
							})}
					</SimpleGrid>
				</Stack>
			</Center>
		</Layout>
	);
}
