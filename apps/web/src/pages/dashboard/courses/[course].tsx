import Layout from "@components/dashboard/layout";
import {
	Heading,
	Text,
	Stack,
	HStack,
	Circle,
	VStack,
	Center,
	Flex,
	Link,
} from "@chakra-ui/react";
import { getCourse, getCourses } from "api/notion";
import { Course } from "types";
import NextChakraLink from "@components/nextChakraLink";
import Button from "@components/button";
import Head from "next/head";
import { rounded } from "@styles/theme";
import {
	HiAcademicCap,
	HiOutlinePuzzle,
	HiCalendar,
	HiDocumentText,
} from "react-icons/hi";
import { getCookie } from "@lib/cookie";

export default function CoursePage({ course }: { course?: Course }) {
	if (typeof window === "undefined") return null;
	return (
		<>
			<Head>
				<title>{course?.name} | Courses</title>
			</Head>
			<Layout>
				<Stack
					bg="linear-gradient(125deg, rgba(255, 255, 255, 0.1) 0%, rgb(0 0 0 / 50%) 100%)"
					p={{ base: "20px", lg: "50px" }}
					my="20px"
					rounded={rounded}
					spacing="50px"
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
											backgroundImage={author?.avatar_url}
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
					<Center bg="secondary" p="20px" rounded={rounded}>
						<VStack spacing="20px">
							<Heading size="xl" textAlign="center">
								Start your journey
							</Heading>
							<Link
								href={`/dashboard/courses/${
									course?.id
								}/lessons/${getCookie(course.id) || 1}`}
							>
								<Button>Lessons</Button>
							</Link>
						</VStack>
					</Center>
					<Center>
						<HStack
							maxW="1200px"
							w="100%"
							justify="center"
							align="stretch"
							flexDir={{ base: "column", xl: "row" }}
							spacing={{ base: 0, xl: "20px" }}
						>
							<Stack
								spacing="20px"
								w="100%"
								p={{ base: "25px", xl: "50px" }}
								justify="center"
								bg="secondary"
								rounded={rounded}
							>
								<Flex>
									<Center
										display={{ base: "none", md: "block" }}
									>
										<HiDocumentText size="50px" />
									</Center>
									<Heading color="primary">
										Description
									</Heading>
								</Flex>
								<Text fontSize={{ base: "md", xl: "xl" }}>
									{course?.description}
								</Text>
							</Stack>

							<Stack spacing="10px" w="100%">
								<Card
									icon={<HiAcademicCap size="50px" />}
									title="Certification"
									description="Shareable Certificate of Completion"
									mt={{ base: "10px", xl: 0 }}
								/>
								<Card
									icon={<HiOutlinePuzzle size="50px" />}
									title="Difficulty"
									description={course?.difficulty}
								/>
								<Card
									icon={<HiCalendar size="50px" />}
									title="Completion"
									description={course?.completionTime}
								/>
							</Stack>
						</HStack>
					</Center>
					<VStack>
						<Heading textAlign="center">
							Over 1300+ members and counting...
						</Heading>
						<Center>
							<NextChakraLink href="/discord" isExternal>
								<Button>Join The Community</Button>
								{/* link this to like an about page or something */}
							</NextChakraLink>
						</Center>
					</VStack>
				</Stack>
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
