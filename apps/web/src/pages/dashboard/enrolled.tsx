import {
	Center,
	Heading,
	Stack,
	Text,
	SimpleGrid,
	Divider,
	Box,
	HStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { rounded, shadow } from "@styles/theme";
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
					<SimpleGrid columns={1}>
						{userCourses.length &&
							userCourses.map((userCourse) => {
								console.log(userCourse);
								const sections = [
									<Heading size="md">
										{userCourse.name}
									</Heading>,
									<Stat
										label="Name"
										value={
											userCourse.lessons[
												parseInt(
													userCourse.currentLesson
												)
											].name
										}
									/>,
									<Stat
										label="Lesson"
										value={userCourse.currentLesson}
									/>,

									<Stat
										label="You've Spent"
										value="<time> hrs"
									/>,
									<Stat
										label="Lesson Progress"
										value={
											userCourse.lessons[
												parseInt(
													userCourse.currentLesson
												)
											].progress *
												100 +
											"%"
										}
									/>,
									<Stat
										label="Course Progress"
										value={
											userCourse.lessons[
												parseInt(
													userCourse.currentLesson
												)
											].progress *
												100 +
											"%"
										}
									/>,
								];
								return (
									<Stack
										key={userCourse.id}
										bgImage={`linear-gradient(135deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url('/courses/${userCourse?.id}.png')`}
										bgSize="cover"
										bgPosition="center"
										rounded={rounded}
										shadow={shadow}
										py="25px"
										px="50px"
									>
										{sections.map((section) => (
											<>
												{section}
												<Box py={0.25} w="100%">
													<Divider />
												</Box>
											</>
										))}
										<Center>
											<NextChakraLink
												href={`/dashboard/courses/${userCourse.id}/lessons/${userCourse?.currentLesson}`}
												pt={4}
											>
												<Button>Continue</Button>
											</NextChakraLink>
										</Center>
									</Stack>
								);
							})}
					</SimpleGrid>
				</Stack>
			</Center>
		</Layout>
	);
}

function Stat({ label, value }) {
	return (
		<HStack>
			<Text color="darkgrey">{label}</Text>
			<Text fontSize="4xl" display="inline" fontWeight="bold">
				{value}
			</Text>
		</HStack>
	);
}
