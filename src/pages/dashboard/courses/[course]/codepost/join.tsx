import {
	Center,
	Circle,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
	VStack,
	Link,
	Button,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { useAuth } from "@providers/authContext";
import { rounded, shadow } from "@styles/theme";
import { RiShareBoxFill } from "react-icons/ri";
import { getCourse, getCourses } from "api/notion";
import {} from "react-icons/fa";
import NextImage from "next/image";
import { getIsRegistered } from "api";

export default function Join({ course }: { course: any }) {
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
						onClick={() => {
							checkHasRegistered(course.codePostId);
						}}
					>
						Verify
					</Button>
				</VStack>
			</Center>
		</Layout>
	);
}

export async function getStaticProps({ params }) {
	const course = await getCourse(params.course);
	console.log(course);
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

function checkHasRegistered(codePostId) {
	getIsRegistered(codePostId)
		.then((res) => {
			if (res.data == true) {
				// Continue here
			}
		})
		.catch((err) => {
			console.log(err);
		});
}
