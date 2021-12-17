import Layout from "@components/dashboard/layout";
import {
	Heading,
	Text,
	Stack,
	HStack,
	Circle,
	VStack,
	Center,
	Link,
	useToast,
} from "@chakra-ui/react";
import { getCourse, getCourses } from "api/notion";
import { Course } from "types";
import Button from "@components/button";
import Head from "next/head";
import { rounded } from "@styles/theme";
import {
	HiAcademicCap,
	HiOutlinePuzzle,
	HiCalendar,
	HiDocumentText,
} from "react-icons/hi";
import { useRouter } from "next/router";
import { enrollInCourse, getUserCourse } from "api";
import { useEffect, useState } from "react";

export default function CoursePage({ course }: { course?: Course }) {
	if (typeof window === "undefined") return null;
	const [userCourse, setUserCourse] = useState(null);
	useEffect(() => {
		getUserCourse(course.id, {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}).then(({ data }) => {
			console.log(data);
			setUserCourse(data);
		});
	}, []);

	const router = useRouter();
	const toast = useToast();
	return (
		<>
			<Head>
				<title>{course?.name} | Courses</title>
			</Head>
			<Layout>
				<Center>
					<VStack
						bg="linear-gradient(125deg, rgba(255, 255, 255, 0.1) 0%, rgb(0 0 0 / 50%) 100%)"
						p={{ base: "20px", lg: "50px" }}
						my="20px"
						rounded={rounded}
						spacing="20px"
						maxW="1200px"
					>
						<HStack
							spacing={{ base: 0, lg: "20px" }}
							justify="space-between"
							flexDir={{ base: "column", lg: "row" }}
						>
							{/* <Center
							h={{
								base: "200px",
								lg: "200px",
								xl: "300px",
								"2xl": "400px",
							}}
							w="100%"
							backgroundImage={course?.image}
							backgroundSize="cover"
							backgroundPosition="center"
							backgroundRepeat="no-repeat"
							rounded={rounded}
						/> */}
							<VStack
								w="100%"
								textAlign="center"
								bgImage={`linear-gradient(135deg,rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0.5)), url(${course?.image})`}
								bgRepeat="no-repeat"
								spacing="30px"
								bgSize="cover"
								bgPosition="center"
								rounded={rounded}
								h={{ base: "200px", md: "400px" }}
								justify="flex-end"
								p="20px"
							>
								<Heading
									fontSize={{
										base: "2xl",
										sm: "4xl",
										lg: "5xl",
										xl: "6xl",
									}}
								>
									{course?.name}
								</Heading>
								<Stack>
									{course?.authors?.map((author) => (
										<HStack key={author?.id} spacing="20px">
											<Circle
												size={{
													base: "30px",
													sm: "50px",
													xl: "60px",
												}}
												backgroundImage={
													author?.avatar_url
												}
												backgroundPosition="center"
												backgroundSize="cover"
												backgroundRepeat="no-repeat"
											/>
											<Heading size="md" color="primary">
												{author?.name}
											</Heading>
										</HStack>
									))}
								</Stack>
							</VStack>
						</HStack>

						<Card
							icon={<HiDocumentText size="50px" />}
							title="Description"
							description={course?.description}
							py={10}
						/>

						<HStack
							w="100%"
							flexDir={{ base: "column", xl: "row" }}
							spacing={{ base: 0, xl: "20px" }}
						>
							<Card
								icon={<HiAcademicCap size="50px" />}
								title="Certification"
								description="Certificate of Completion"
							/>
							<Card
								icon={<HiOutlinePuzzle size="50px" />}
								title="Difficulty"
								description={course?.difficulty}
								mt={{ base: "10px", xl: 0 }}
							/>
							<Card
								icon={<HiCalendar size="50px" />}
								title="Completion"
								description={course?.completionTime}
								mt={{ base: "10px", xl: 0 }}
							/>
						</HStack>

						<VStack
							spacing="20px"
							bg="secondary"
							p="20px"
							rounded={rounded}
							w="100%"
						>
							<Heading size="xl" textAlign="center">
								Start your journey
							</Heading>
							{userCourse?.status ? (
								<Link
									href={`/dashboard/courses/${course?.id}/lessons`}
								>
									<Button>Lessons</Button>
								</Link>
							) : (
								<Button
									onClick={() => {
										enrollInCourse(
											{
												id: course?.id,
											},
											{
												headers: {
													Authorization: `Bearer ${localStorage.getItem(
														"token"
													)}`,
												},
											}
										)
											.then(({ data }) => {
												console.log(data);
												// router.push(
												// 	`/dashboard/courses/${course.id}/lessons`
												// );
											})
											.catch((reason) => {
												toast({
													title: "Error",
													description:
														reason.response?.data
															?.message ??
														"Generic error. Refresh and try again. If the issue persists please contact owner",
													status: "error",
													duration: 5000,
													isClosable: true,
												});
											});
									}}
								>
									Enroll
								</Button>
							)}
						</VStack>
					</VStack>
				</Center>
			</Layout>
		</>
	);
}

export async function getStaticProps({ params }) {
	return {
		props: {
			course: await getCourse(params.course),
		},
		revalidate: 120,
	};
}

export async function getStaticPaths() {
	const courses = await getCourses();
	return {
		paths: courses.map((course) => `/dashboard/courses/${course.id}`),
		fallback: "blocking",
	};
}

function Card(props) {
	return (
		<Stack
			spacing="20px"
			px="25px"
			py="12.5px"
			bg="secondary"
			rounded={rounded}
			w="100%"
			{...props}
		>
			<HStack>
				<Center display={{ base: "none", md: "block" }}>
					{props.icon}
				</Center>
				<Heading color="primary">{props.title}</Heading>
			</HStack>
			<Text fontSize="2xl">{props.description}</Text>
		</Stack>
	);
}
