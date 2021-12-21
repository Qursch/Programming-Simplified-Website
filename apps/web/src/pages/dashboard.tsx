import {
	Heading,
	HStack,
	SkeletonText,
	Stack,
	Text,
	Center,
	VStack,
	CircularProgress,
	CircularProgressLabel,
	Skeleton,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { useAuth } from "@providers/authContext";
import { FaFire } from "react-icons/fa";
import { rounded, shadow } from "@styles/theme";
import { useState, useEffect } from "react";
import { getUserCourses } from "api/index";
import Button from "@components/button";
import NextChakraLink from "@components/nextChakraLink";

// import Highcharts, { Options } from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsExporting from "highcharts/modules/exporting";

// if (typeof Highcharts === "object") {
// 	HighchartsExporting(Highcharts);
// }

export default function Dashboard() {
	const { user, isAuthenticated } = useAuth();
	const [courses, setCourses] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		// setTimeout(() => {
			getUserCourses().then(({ data }) => {
				data.forEach((course) => {
					let completedLessons = 0;
					course.lessons.forEach((lesson) => {
						if (lesson.completed) {
							completedLessons++;
						}
					});
					course.progress = parseFloat(
						(completedLessons / course.lessons.length).toFixed(4)
					);
				});
				setCourses(data);
				setIsLoaded(true);
			});
		// }, 1000);
	}, []);

	function EnrollMore() {
		return (
			<Skeleton
				isLoaded={isLoaded}
				rounded={rounded}
				shadow={shadow}
				w="100%"
			>
				<Card href="/dashboard/courses">
					<Heading size="md">Enroll in more courses.</Heading>
					<Button>Enroll</Button>
				</Card>
			</Skeleton>
		);
	}

	return (
		<Layout>
			<Center as={VStack} px={{ base: 4, md: 8 }}>
				<HStack spacing={20}>
					<Stack>
						<SkeletonText
							isLoaded={isAuthenticated}
							noOfLines={1}
							w="fit-content"
						>
							<Heading as="h1">
								Welcome back, {user?.firstName || "Soph"}!
							</Heading>
						</SkeletonText>
						<SkeletonText
							isLoaded={isAuthenticated}
							noOfLines={1}
							w="fit-content"
						>
							<Text>
								You're doing great this week, keep it up!
							</Text>
						</SkeletonText>
					</Stack>

					<HStack>
						<SkeletonText
							isLoaded={isAuthenticated}
							noOfLines={1}
							w="fit-content"
						>
							<Heading as="h1" size="md">
								1
							</Heading>
						</SkeletonText>
						<FaFire color="red" size="50px" />
					</HStack>
				</HStack>
				<HStack>
					<Stack>
						<Heading>Course Progress</Heading>
						<HStack spacing={10}>
							{courses.map((course) => (
								<Stat course={course} />
							))}
							{[0, 1, 2].map(
								(num) => courses.length <= num && <EnrollMore />
							)}
						</HStack>
					</Stack>
				</HStack>
			</Center>
		</Layout>
	);
}

function Card({ children, href, ...props }) {
	return (
		<NextChakraLink href={href} w="100%">
			<VStack
				px={10}
				py={5}
				bg="secondary"
				rounded={rounded}
				shadow={shadow}
				maxW="300px"
				w="100%"
				h="250px"
				justify="space-between"
				transition="all 0.2s ease"
				_hover={{ transform: "scale(1.05)", cursor: "pointer" }}
				{...props}
			>
				{children}
			</VStack>
		</NextChakraLink>
	);
}

function Stat({ course }) {
	return (
		<Card
			href={`/dashboard/courses/${course.id}/lessons/${course.currentLesson}`}
		>
			<CircularProgress
				value={course.progress * 100}
				color="primary"
				size="120px"
			>
				<CircularProgressLabel>
					{course.progress * 100}%
				</CircularProgressLabel>
			</CircularProgress>
			<Stack>
				<Heading size="sm">{course.name}</Heading>
				<Text>{course.lessons.length} lessons</Text>
			</Stack>
		</Card>
	);
}
