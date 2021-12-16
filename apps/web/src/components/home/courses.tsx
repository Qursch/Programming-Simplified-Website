import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import NextChakraLink from "@components/nextChakraLink";
import { rounded } from "@styles/theme";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./button";

export default function Courses() {
	const [slide, setSlide] = useState(0);
	const coursesVariantsLeft = {
		offscreen: {
			opacity: 0,
			x: -50,
		},
		onscreen: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
			},
		},
	};

	const coursesVariantsRight = {
		offscreen: {
			opacity: 0,
			x: 50,
		},
		onscreen: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
			},
		},
	};

	function Select({ index }) {
		const selected = slide === index;
		return (
			<Box
				onClick={() => setSlide(index)}
				_hover={{ cursor: "pointer", transform: "scale(1.10)" }}
				h="20px"
				w={selected ? "100px" : "75px"}
				bg={selected ? "gradient" : "#e0e0e0"}
			/>
		);
	}

	return (
		<Container bg="white" py="100px">
			<ContainerInside>
				<HStack
					flexDir={{ base: "column", lg: "row" }}
					spacing={{ base: 0, lg: "30px" }}
					overflow="hidden"
				>
					<motion.div
						variants={coursesVariantsLeft}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ amount: 0.1 }}
					>
						<Stack
							w="100%"
							maxW="800px"
							align={{ base: "center", md: "flex-start" }}
							textAlign={{ base: "center", md: "left" }}
							mb={{ base: "25px", md: "0" }}
						>
							<Heading>Our Courses</Heading>
							<Text>
								We offer a wide range of courses to help you
								launch your career.
							</Text>
							<HStack>
								{courses.map((course, index) => (
									<Select index={index} key={course.name} />
								))}
							</HStack>
						</Stack>
					</motion.div>
					<motion.div
						variants={coursesVariantsRight}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ amount: 0.1 }}
						style={{ padding: "100px 50px" }}
					>
						<Stack
							w="100%"
							rounded={rounded}
							bg="white"
							shadow={rounded}
							p="25px"
							spacing="25px"
							textAlign={{ base: "center", xl: "left" }}
							align={{ base: "center", xl: "flex-start" }}
						>
							<Stack>
								<Heading size="lg" color="primary">
									{courses[slide].name}
								</Heading>
								<Text>
									{courses[slide].instructors.join(" & ")}
								</Text>
							</Stack>
							<Text>{courses[slide].description}</Text>
							<NextChakraLink href="/dashboard" isExternal>
								<Button w="fit-content">Enroll Now</Button>
							</NextChakraLink>
						</Stack>
					</motion.div>
				</HStack>
			</ContainerInside>
		</Container>
	);
}

const courses = [
	{
		name: "Website Development with Next.js",
		description:
			"Learn the basics of TypeScript, React, and Chakra UI to develop websites! Creating your own websites from scratch is a useful skill that can help foster creativity, help you understand code, and allow you to start your own personal projects. The course will also cover VS Code and GitHub, which are both used in professional settings.",
		instructors: ["Hazim A."],
	},
	{
		name: "Python 101: The Basics",
		description:
			"Learn the basics of Python and build a foundation in programming that can be applied anywhere! This course contains knowledge on storing and handling data, control flow, error handling, and even version control for your projects. Join us and start forming your professional skills!",
		instructors: ["Hovhannes M.", "Jeffrey B."],
	},
	{
		name: "Java 101: The Basics",
		description:
			"Learn the basics of object-oriented programming with the Java programming language! From computational thinking to recursive sorting algorithms, we've got you covered. This course contains all the information needed for the AP Computer Science exam, and more.",
		instructors: ["Tachi M.", "Suzu P."],
	},
	{
		name: "Discord: Bot Development",
		description:
			"A course for creating an interactive Discord Bot using the latest features exposed by the discord API (slash commands, interactions, etc) using TypeScript and NodeJS. It aims to teach the fundamentals of server side code, event listeners, strong typing and more through a fun and popular application of these techniques.",
		instructors: ["Max M."],
	},
];
