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
	Box,
	Textarea,
} from "@chakra-ui/react";
import Button from "@components/button";
import Layout from "@components/dashboard/layout";
import { rounded, shadow } from "@styles/theme";
import { parsePage } from "@utils/parseNotion";
import { getCourse, getCourses, getLesson } from "api/notion";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaCheck, FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";
import { Course, Lesson } from "types";
import Head from "next/head";
import LessonsMenu from "@components/dashboard/lessonsMenu";
import confetti from "canvas-confetti";
import { API_URL } from "config";
import { io, Socket } from "socket.io-client";
import { enrollInCourse, getUserCourse, setCurrentLesson } from "api";
import { getIsRegistered, getComments, createComment } from "api";
import { Form, Formik } from "formik";
import ReactGA from "react-ga4";

let socket: Socket | undefined;
if (typeof window !== "undefined") {
	socket = io(API_URL);
}

export default function LessonPage({
	lesson,
	blog,
	course,
}: {
	lesson: Lesson;
	course: Course;
	blog: any;
}) {
	if (typeof window === "undefined") return null;
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [animationId, setAnimationId] = useState(0);
	const [finished, setFinished] = useState(false);
	const [courseState, setCourseState] = useState(null);
	const [isRegistered, setIsRegistered] = useState(false);
	const [comments, setComments] = useState([]);
	const [content, setContent] = useState("");

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

	const videoRef = useRef(null);

	useEffect(() => {
		setCurrentLesson({
			courseId: course.id,
			lessonId: lesson.id,
		}).catch(() => {
			enrollInCourse({
				id: course?.id,
				lessons: course?.lessons,
			})
				.then(() => {
					setCurrentLesson({
						courseId: course.id,
						lessonId: lesson.id,
					});
				})
				.catch(() => {});
		});
		getUserCourse(course.id).then(({ data }) => {
			setCourseState(data);
		});

		socket.on("progress", (data: any) => {
			console.log("Lesson Progress Updated", data);
		});
	}, []);

	useEffect(() => {
		if (course.codePostId !== null) {
			if (!isRegistered) {
				getIsRegistered(course.codePostId)
					.then(({ data }) => {
						setIsRegistered(data);
						if (data == false) {
							router.push(
								`/dashboard/courses/${course.id}/codepost/join`
							);
						}
					})
					.catch(() => {
						setIsRegistered(false);
						router.push(
							`/dashboard/courses/${course.id}/codepost/join`
						);
					});
			}
		}
	}, []);

	useEffect(() => {
		if (lesson.name.startsWith("Discussion") && comments.length == 0) {
			getComments(course.id, lesson.id)
				.then(({ data }) => {
					if (data == "No comments found") return setComments(null);

					const comments = data.map((comment: any) => {
						comment.replies = [];
						return comment;
					});
					for (let i = 0; i < comments.length; i++) {
						if (comments[i].replyTo) {
							for (let j = 0; j < comments.length; j++) {
								if (comments[j]._id == comments[i].replyTo) {
									comments[j].replies.push(comments[i]);
									delete comments[i];
									break;
								}
							}
						}
					}
					setComments(comments);
				})
				.catch(() => {});
		}
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
									href={`/dashboard/courses/${router.query.course}/lessons/${lesson?.nextLesson?.id}`}
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
					{/* <NextChakraLink
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
					</NextChakraLink> */}
					<LessonsMenu
						lessons={course.lessons}
						userLessons={courseState?.lessons}
					/>
					<Center
						as={VStack}
						/*mt="85px"*/ my="50px"
						px={{ base: 4, md: 8 }}
					>
						<VStack spacing={0} w="100%">
							{lesson?.videoUrl ? (
								<Skeleton
									isLoaded={!loading}
									w="100%"
									h={loading && "60vh"}
									maxW="1400px"
								>
									<ReactPlayer
										ref={videoRef}
										url={lesson?.videoUrl}
										width="100%"
										height="100%"
										style={{
											maxWidth: "1400px",
											display: loading ? "none" : "block",
										}}
										onReady={() => {
											setLoading(false);
											if (loading) {
												setTimeout(() => {
													videoRef.current.player.player.player.currentTime =
														courseState?.lessons?.[
															lesson.id
														]?.progress *
														videoRef.current.player
															.player.player
															.duration;
												}, 500);
											}
										}}
										onError={() =>
											setTimeout(
												() => window.location.reload(),
												6000
											)
										}
										controls
										onEnded={() => {
											setFinished(true);
											ReactGA.event({
												category: "course",
												action: "completed_section",
												label: `${course.name} - ${lesson.id}`,
											});
										}}
										onProgress={(e) => {
											socket?.emit("progress", {
												courseId: router.query.course,
												lessonId: lesson.id,
												progress: parseFloat(
													e.played.toFixed(4)
												),
												token: localStorage.getItem(
													"token"
												),
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
										Stay tuned for the video!
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
						{lesson?.name.startsWith("Discussion") && (
							<>
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
									<Formik
										initialValues={{}}
										onSubmit={() => {
											createComment(
												content,
												course.id,
												lesson.id
											)
												.then(({ data }) => {
													setContent("");
													setComments(
														comments.concat(
															data.comment
														)
													);
												})
												.catch((err) => {
													alert(err.message);
												});
										}}
									>
										{({ handleSubmit }) => (
											<Form onSubmit={handleSubmit}>
												<Box>
													<Text>
														Enter Your Response
													</Text>

													<Textarea
														name="content"
														id="content"
														onChange={(e) => {
															setContent(
																e.target.value
															);
														}}
													></Textarea>
												</Box>
												<Button
													type="submit"
													borderRadius={rounded}
													borderColor="primary"
													backgroundColor="white"
													borderWidth="1px"
													borderStyle="solid"
													px="20px"
													py="10px"
													fontSize="lg"
													fontWeight="bold"
													color="primary"
												>
													Post
												</Button>
											</Form>
										)}
									</Formik>
								</HStack>
								{loadDiscussion(comments)}
							</>
						)}
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
									}/lessons/${lesson?.previousLesson.id}`}
								>
									<Button
										isSecondary
										p="30px"
										_hover={{}}
										leftIcon={<FaArrowLeft />}
										onclick={() => {
											ReactGA.event({
												category: "course",
												action: "previous",
												label: `${course.name} - ${lesson.previousLesson.id}`,
											});
										}}
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
										href={`/dashboard/courses/${router.query.course}/lessons/${lesson?.nextLesson?.id}`}
									>
										<Button
											isSecondary
											p="30px"
											_hover={{}}
											leftIcon={<FaCheck />}
											onClick={() => {
												socket?.emit("progress", {
													courseId:
														router.query.course,
													lessonId: lesson.id,
													progress: 1,
													token: localStorage.getItem(
														"token"
													),
												});
												ReactGA.event({
													category: "course",
													action: "next",
													label: `${course.name} - ${lesson.nextLesson.id}`,
												});
											}}
										>
											Complete & Continue
										</Button>
									</Link>
								</>
							)}
						</HStack>
					</Center>
				</>
			</Layout>
		</>
	);
}

export async function getStaticProps({ params }) {
	const { lesson, course, blog } = await getLesson(
		params.course,
		parseInt(params.lesson)
	);

	return {
		props: {
			lesson,
			course,
			blog,
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

function loadDiscussion(comments) {
	if (comments == null || comments.length === 0) {
		return (
			<Text pt={50} pb={50}>
				There are no responses. Be the first to respond!
			</Text>
		);
	}

	console.log(comments);
	return comments.map((comment) => (
		<>
			<VStack id={comment._id}>
				<Text>{comment.user.firstName + ": " + comment.content}</Text>
			</VStack>
			{comment.replies &&
				comment.replies.length > 0 &&
				loadDiscussion(comment.replies)}
		</>
	));
}
