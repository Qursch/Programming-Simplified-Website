import {
	Heading,
	HStack,
	SimpleGrid,
	Stack,
	Text,
	useToken,
} from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { rounded, shadow } from "@styles/theme";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
	const [primary] = useToken("colors", ["primary"]);
	const cardVariants = (index) => ({
		offscreen: {
			opacity: 0,
			y: index % 2 === 0 ? -50 : 50,
		},
		onscreen: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
			},
		},
	});
	const coursesVariants = {
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
	return (
		<Container bg="white" py="100px">
			<ContainerInside>
				<HStack
					flexDir={{ base: "column", lg: "row" }}
					spacing={{ base: 0, lg: "50px" }}
				>
					<motion.div
						variants={coursesVariants}
						initial="offscreen"
						whileInView="onscreen"
						viewport={{ amount: 0.1 }}
					>
						<Stack
							w="100%"
							maxW="400px"
							textAlign={{ base: "center", xl: "left" }}
							align={{ base: "center", xl: "flex-start" }}
						>
							<FaQuoteLeft size="3em" color={primary} />
							<Heading as="h1">Why us?</Heading>
							<Text>
								We are a team of developers, designers, and
								creators here to help you learn, grow, and
								succeed. Here are some testimonials from our
								students
							</Text>
						</Stack>
					</motion.div>
					<SimpleGrid
						pt={{ base: "50px", lg: "0" }}
						columns={{ base: 1, sm: 2, md: 3 }}
						spacing="25px"
					>
						{testimonials.map((testimonial, index) => (
							<motion.div
								variants={cardVariants(index)}
								initial="offscreen"
								whileInView="onscreen"
								key={testimonial.name}
								viewport={{ amount: 0.1 }}
							>
								<Card
									isBlue={index % 2 == 1}
									{...testimonial}
								/>
							</motion.div>
						))}
					</SimpleGrid>
				</HStack>
			</ContainerInside>
		</Container>
	);
}

const testimonials = [
	{
		name: "Ethan W.",
		testimonial:
			"Programming Simplified allowed me to learn coding and web development without any prior experience, and has given me the tools to learn new skills!",
		title: "Student",
	},
	{
		name: "Hovhannes M.",
		testimonial:
			"Programming Simplified helped me get into Discord.js and I haven't looked at Discord.py the same since.",
		title: "Instructor & Student",
	},
	{
		name: "Derin S.",
		testimonial:
			"I was able to start making my own website with just React and Chakra UI. I'm so happy with the result.",
		title: "Student",
	},
	{
		name: "Ally H.",
		testimonial:
			"Through Programming Simplified, I was able to get started with web development with 0 prior knowledge on the subject!",
		title: "Student",
	},
	{
		name: "Daniyal S.",
		testimonial:
			"I'm so glad I found Programming Simplified.  It's a great place to learn.",
		title: "Student",
	},
	{
		name: "Kaylee A.",
		testimonial:
			"I've learned so much from this course! I'm so excited to continue learning!",
		title: "Student",
	},
];

function Card({ name, testimonial, title, isBlue = false }) {
	return (
		<Stack
			bg={isBlue ? "gradient" : "background"}
			color={isBlue ? "#ccc" : "text"}
			p="25px"
			rounded={rounded}
			shadow={shadow}
			maxW="300px"
			h="100%"
			w="100%"
			justify="space-between"
		>
			<Text fontSize="sm">{testimonial}</Text>

			<Stack spacing={0}>
				<Heading color={isBlue ? "white" : "primary"} size="md">
					{name}
				</Heading>
				<Text>{title}</Text>
			</Stack>
		</Stack>
	);
}
