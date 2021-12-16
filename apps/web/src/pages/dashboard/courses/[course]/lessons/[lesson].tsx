import {
	Center,
	Heading,
	HStack,
	Stack,
	Text,
	VStack,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Flex,
	Link,
	Skeleton,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { rounded, shadow } from "@styles/theme";
import { parsePage } from "@utils/parseNotion";
import { getCourse, getCourses, getLesson, getLessonContent } from "api/notion";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";
import { Course, Lesson } from "types";
import Head from "next/head";
import LessonsMenu from "@components/dashboard/lessonsMenu";
import confetti from "canvas-confetti";
import { setCookie } from "@lib/cookie";
import { API_URL } from "config";
import { io } from "socket.io-client";
import { useAuth } from "@providers/authContext";

const socket = io(API_URL, {
	extraHeaders: {},
});

export default function LessonPage({
	lesson,
	blog,
	course,
}: {
	lesson: Lesson;
	course: Course;
	blog: any;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [animationId, setAnimationId] = useState(0);
	const [finished, setFinished] = useState(false);
	const { user } = useAuth();

	useEffect(() => {
		socket.io.opts.extraHeaders.Authorization = `Bearer ${localStorage.getItem(
			"token"
		)}`;
		console.log(socket.io.opts.extraHeaders.Authorization)
	}, [user]);

	if (typeof window === "undefined") return null;
	useEffect(() => {
		if (finished) {
			const duration = 2 * 1000;
			let loopTime = Date.now() + duration;
			confetti({
				particleCount: 100,
				spread: 67.5,
				startVelocity: 40,
			});
			(function frame() {
				if (Date.now() > loopTime) {
					confetti({
						particleCount: 100,
						spread: 67.5,
						startVelocity: 40,
						angle: Math.floor(Math.random() * (135 - 45 + 1)) + 45,
					});
					loopTime = Date.now() + duration;
				}

				if (finished) {
					setAnimationId(requestAnimationFrame(frame));
				}
			})();
			return;
		}
		cancelAnimationFrame(animationId);
	}, [finished]);

	useEffect(() => {
		setCookie(course.id, lesson.id);
		socket.on("progress", (data: any) => {
			console.log(data);
		});
	}, []);

	return (
		<>
			<Head>
				<title>
					{lesson?.name} | {course?.name}
				</title>
			</Head>
			<Modal
				onClose={() => {
					setFinished(false);
				}}
				isOpen={finished}
				isCentered
				blockScrollOnMount={false}
				size="lg"
			>
				<ModalOverlay />
				<ModalContent bg="background" rounded={rounded} p="25px">
					<ModalHeader>
						<Flex justify="flex-end">
							<Button
								bg="white"
								color="background"
								border="0"
								_hover={{}}
								onClick={() => {
									setFinished(false);
								}}
								leftIcon={<FaTimes />}
							>
								Close
							</Button>
						</Flex>
					</ModalHeader>

					<ModalBody>
						<VStack spacing="20px">
							<Heading>Lesson completed</Heading>
							<Text>
								Good job, you've completed this lesson. 🤘
							</Text>

							<Button
								isSecondary
								bg="transparent"
								onClick={() => {
									setFinished(false);
								}}
								w="225px"
							>
								Stay on this page
							</Button>
							{lesson?.nextLesson?.id && (
								<Link
									href={`/dashboard/courses/${
										router.query.course
										// @ts-ignore
									}/lessons/${parseInt(
										lesson?.nextLesson?.id
									)}`}
									onClick={() => setFinished(false)}
								>
									<Button
										w="225px"
										_hover={{}}
										leftIcon={<FaCheck />}
									>
										Complete and continue
									</Button>
								</Link>
							)}
						</VStack>
					</ModalBody>
					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
			<Layout>
				<>
					<NextChakraLink
						href={`/dashboard/courses/${router.query.course}`}
					>
						<Button
							position="fixed"
							zIndex="10"
							top={{ base: "85px", md: "20px" }}
							shadow={shadow}
						>
							Back to Course
						</Button>
					</NextChakraLink>
					<Center as={VStack} mt="85px" mb="50px">
						<VStack spacing={0} w="100%">
							{lesson?.videoUrl ? (
								<Skeleton
									isLoaded={!loading}
									w="100%"
									h={loading && "60vh"}
									maxW="1400px"
								>
									<ReactPlayer
										url={lesson?.videoUrl}
										width="100%"
										height="100%"
										style={{
											maxWidth: "1400px",
											display: loading ? "none" : "block",
										}}
										onReady={() => setLoading(false)}
										onError={() =>
											setTimeout(
												() => window.location.reload(),
												5000
											)
										}
										controls
										onEnded={() => setFinished(true)}
										onProgress={(e) => {
											socket.emit("progress", {
												courseId: router.query.course,
												lessonId: lesson.id,
												progress: e.played.toFixed(2),
											});
										}}
									/>
								</Skeleton>
							) : (
								<Center
									maxW="1400"
									w="100%"
									h="787.50px"
									bg="black"
								>
									<Heading textAlign="center">
										Stay tuned for the video
									</Heading>
								</Center>
							)}

							<Center
								maxW="1200px"
								w="100%"
								bg="primary"
								borderBottomRadius={rounded}
								as={VStack}
							>
								<Heading
									py={{
										base: "5px",
										sm: "10px",
										md: "20px",
										lg: "30px",
										xl: "40px",
									}}
									fontSize={{
										base: "2xl",
										sm: "3xl",
										md: "4xl",
										lg: "5xl",
									}}
									px="20px"
									textAlign="center"
								>
									{lesson?.name}
								</Heading>
								{/* <Heading>14m 5s</Heading> */}
							</Center>
						</VStack>
						<Stack pb="25px" maxW="1000px">
							<Text>{blog?.blocks && parsePage(blog)}</Text>
						</Stack>
						<HStack
							p={{ base: "20px", md: "30px" }}
							spacing={{ base: 0, lg: "10px" }}
							bg="primary"
							maxW="1000px"
							w="100%"
							rounded={rounded}
							shadow={shadow}
							justify="space-between"
							flexDir={{
								base: "column",
								lg: "row",
							}}
						>
							{lesson?.previousLesson && (
								<Link
									href={`/dashboard/courses/${
										router.query.course
										// @ts-ignore
									}/lessons/${parseInt(
										lesson?.previousLesson.id
									)}`}
								>
									<Button
										isSecondary
										p="30px"
										_hover={{}}
										leftIcon={<FaArrowLeft />}
									>
										Previous
									</Button>
								</Link>
							)}
							{lesson?.nextLesson && (
								<>
									<Stack
										textAlign={
											lesson?.previousLesson
												? "center"
												: "left"
										}
										spacing={0}
										py="20px"
									>
										<Text
											textAlign={{
												base: "center",
												lg: "left",
											}}
										>
											Next Lesson
										</Text>
										<Heading
											textAlign={{
												base: "center",
												lg: "left",
											}}
										>
											{lesson?.nextLesson?.name}
										</Heading>
									</Stack>

									<Link
										href={`/dashboard/courses/${
											router.query.course
											// @ts-ignore
										}/lessons/${parseInt(
											lesson?.nextLesson?.id
										)}`}
									>
										<Button
											isSecondary
											p="30px"
											_hover={{}}
											leftIcon={<FaCheck />}
										>
											Continue
										</Button>
									</Link>
								</>
							)}
						</HStack>
					</Center>
					<LessonsMenu />
				</>
			</Layout>
		</>
	);
}

export async function getStaticProps({ params }) {
	const { lesson, course } = await getLesson(params.course, params.lesson);

	return {
		props: {
			lesson,
			course,
			blog: await getLessonContent(lesson.blockId),
		},
		revalidate: 5,
	};
}

export async function getStaticPaths() {
	const courses = await getCourses();
	const paths: string[] = [];
	for (const course of courses) {
		const course2 = await getCourse(course.id);
		for (const lesson of course2.lessons) {
			paths.push(`/dashboard/courses/${course.id}/lessons/${lesson.id}`);
		}
	}

	return {
		paths,
		fallback: "blocking",
	};
}
