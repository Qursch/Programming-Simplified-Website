import {
	Box,
	Heading,
	HStack,
	SkeletonText,
	Stack,
	Text,
	Center,
	VStack,
	CircularProgress,
	CircularProgressLabel,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { useAuth } from "@providers/authContext";
import { FaFire } from "react-icons/fa";
import { rounded, shadow } from "@styles/theme";
import { useState, useEffect } from "react";
import { getUserCourses } from "api/index";

// import Highcharts, { Options } from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import HighchartsExporting from "highcharts/modules/exporting";

// if (typeof Highcharts === "object") {
// 	HighchartsExporting(Highcharts);
// }

export default function Dashboard() {
	const { user, isAuthenticated } = useAuth();
	const [courses, setCourses] = useState([]);

	useEffect(() => {
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
			console.log(data);
		});
	}, []);

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
							{courses.length % 3 != 0 && (
								<Card>
									<Heading size="sm">
										Enroll in more courses.
									</Heading>
								</Card>
							)}
							{courses.length % 2 != 0 && (
								<Card>
									<Heading size="sm">
										Enroll in more courses.
									</Heading>
								</Card>
							)}
						</HStack>
					</Stack>
				</HStack>
			</Center>
		</Layout>
	);
}

function Card({ children, ...props }) {
	return (
		<VStack
			px={10}
			py={5}
			bg="secondary"
			rounded={rounded}
			shadow={shadow}
			maxW="400px"
			w="100%"
			h="250px"
			justify="space-between"
			transition="all 0.2s ease"
			_hover={{ transform: "scale(1.05)", cursor: "pointer" }}
			{...props}
		>
			{children}
		</VStack>
	);
}

function Stat({ course }) {
	return (
		<Card>
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
