import { Center, Heading, Text, VStack, Link, Button } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { RiShareBoxFill } from "react-icons/ri";
import { getCourse, getCourses } from "api/notion";
import {} from "react-icons/fa";
import { getIsRegistered, getUserCourse } from "api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Join({ course }: { course: any }) {
	const router = useRouter();
	const [userCourse, setUserCourse] = useState(null);
	const [msg, setMsg] = useState("");

	useEffect(() => {
		getUserCourse(course.id)
			.then(({ data }) => {
				if (data.status === 401) {
					window.location.href = "/login";
				}
				setUserCourse(data);
			})
			.catch((res) => {
				if (res.response.status === 401) {
					window.location.href = "/login";
				}
			});
	}, []);

	const checkHasRegistered = () => {
		getIsRegistered(course.codePostId)
			.then(({ data }) => {
				if (data.status == 401) {
					window.location.href = "/login";
				} else if (data == true) {
					setMsg("Success! Loading the course...");
					router.push(
						`/dashboard/courses/${course.id}/lessons/${userCourse?.currentLesson}`
					);
				} else {
					setMsg("You have not registered for this course yet.");
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		// Display the course's codepost invite link
		// Add verify button to verify the user has joined the codepost
		<Layout>
			<Center>
				<VStack>
					<Heading as="h1" size="xl" mb={4} mt={4}>
						Course Requirement: codePost
					</Heading>
					<Text>
						This course requires you to join a codePost course.
						<br />
						Click the button below to join the course.
					</Text>
					<Text>
						Please use a codePost account with the same email you
						used for your Programming Simplified account.
					</Text>

					<Link
						href={`https://codepost.io/signup/join?code=${course.codePostInvite}`}
					>
						<Button
							rightIcon={<RiShareBoxFill />}
							bg="primary"
							p="30px"
							_hover={{}}
						>
							Join codePost
						</Button>
					</Link>
					<Text>Class code: {course.codePostInvite}</Text>
					<Text>
						Once you have been joined the course, please click the
						button below to verify everything has set up correctly
						to proceed.
					</Text>
					<Button
						bg="primary"
						p="30px"
						_hover={{}}
						onClick={checkHasRegistered}
					>
						Verify
					</Button>
					<Text id="msg">{msg}</Text>
				</VStack>
			</Center>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const course = await getCourse(params.course);
	return {
		props: {
			course,
		},
	};
}

export async function getStaticPaths() {
	const courses = await getCourses();
	return {
		paths: courses.map(
			(course) => `/dashboard/courses/${course.id}/codepost/join`
		),
		fallback: "blocking",
	};
}
