import {
	Center,
	Heading,
	Stack,
	Text,
	SimpleGrid,
	Divider,
	Box,
	HStack,
	VStack,
	Spinner,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { rounded, shadow } from "@styles/theme";
import { getUserCourses } from "api";
import { useEffect, useState } from "react";

export default function Enrolled() {
	const [userCourses, setUserCourses] = useState([]);
	const [courseProgress, setCourseProgress] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUserCourses()
			.then(({ data }) => {
				setIsLoading(false);
				if (!data) return;
				data.forEach((course) => {
					let completedLessons = 0;
					course.lessons.forEach((lesson) => {
						if (lesson.completed) {
							completedLessons++;
						}
					});
					setCourseProgress(
						parseFloat(
							(completedLessons / course.lessons.length).toFixed(
								4
							)
						)
					);
				});
				console.log(data);
				setUserCourses(data);
			})
			.catch(() => {
				setIsLoading(false);
			});
	}, []);

	return (
		<Layout>
			<Center minH="100vh" py={10} px={{base:4,md:8}}>
				<VStack>
					{!isLoading ? (
						userCourses.length ? (
							<>
								<Heading>Enrolled Courses</Heading>
								<Text pb={10}>Pick up where you left off.</Text>
								<SimpleGrid
									columns={{ base: 1, lg: 2 }}
									gap={10}
								>
									{userCourses.map((userCourse) => {
										console.log(userCourse);
										const sections = [
											<Heading size="md">
												{userCourse.name}
											</Heading>,
											<Stat
												label="Lesson"
												value={
													userCourse.lessons[
														parseInt(
															userCourse.currentLesson
														)
													].name
												}
											/>,
											<Stat
												label="Lesson Progress"
												value={
													Math.round(
														userCourse.lessons[
															parseInt(
																userCourse.currentLesson
															)
														].progress * 100
													) + "%"
												}
											/>,
											<Stat
												label="Course Progress"
												value={
													courseProgress * 100 + "%"
												}
											/>,
											<Stat
												label="Next Lesson"
												value={
													userCourse.lessons[
														parseInt(
															userCourse.currentLesson
														) + 1
													].name
												}
											/>,
										];
										return (
											<Stack
												key={userCourse.id}
												bgImage={`linear-gradient(0deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), url('/courses/${userCourse?.id}.png')`}
												bgSize="cover"
												bgPosition="center"
												rounded={rounded}
												shadow={shadow}
												py="25px"
												px={{
													base: "25px",
													lg: "50px",
												}}
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
														<Button>
															Continue
														</Button>
													</NextChakraLink>
												</Center>
											</Stack>
										);
									})}
									{userCourses.length == 1 && (
										<Center
											flexDir="column"
											textAlign="center"
											bgImage={`linear-gradient(0deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.8)), url('/logo_primary.png')`}
											bgSize="cover"
											bgPosition="center"
											rounded={rounded}
											shadow={shadow}
											py="25px"
											px="50px"
										>
											<Heading>
												Enroll In More Courses
											</Heading>
											<NextChakraLink href="/dashboard/courses">
												<Button>
													Enroll in a course
												</Button>
											</NextChakraLink>
										</Center>
									)}
								</SimpleGrid>
							</>
						) : (
							<>
								<Heading textAlign="center">
									You aren't enrolled in any course
								</Heading>
								<NextChakraLink href="/dashboard/courses">
									<Button>Enroll in a course</Button>
								</NextChakraLink>
							</>
						)
					) : (
						<Spinner size="xl" />
					)}
				</VStack>
			</Center>
		</Layout>
	);
}

function Stat({ label, value }) {
	return (
		<HStack>
			<Text color="darkgrey">{label}</Text>
			<Heading fontSize={{ base: "lg", lg: "3xl" }} display="inline">
				{value}
			</Heading>
		</HStack>
	);
}
