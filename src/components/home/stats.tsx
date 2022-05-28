import { VStack, HStack, Text, Heading } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function Stats() {
	const statsVariants = {
		initial: {
			opacity: 0,
			y: -50,
		},
		animation: {
			opacity: 1,
			y: 0,
		},
	};
	return (
		<Container bg="white" py="50px">
			<ContainerInside>
				<HStack
					justify="space-between"
					w="100%"
					flexDir={{ base: "column", sm: "row" }}
				>
					<motion.div
						variants={statsVariants}
						initial="initial"
						animate="animation"
						transition={{ duration: 1, delay: 0.25 }}
					>
						<Stat stat={5} title="Courses" />
					</motion.div>
					<motion.div
						variants={statsVariants}
						initial="initial"
						animate="animation"
						transition={{ duration: 1, delay: 0.5 }}
					>
						<Stat stat={140} title="Students" suffix="+" />
					</motion.div>
					<motion.div
						variants={statsVariants}
						initial="initial"
						animate="animation"
						transition={{ duration: 1, delay: 0.75 }}
					>
						<Stat
							stat={10}
							title="Dedicated staff members"
							suffix="+"
						/>
					</motion.div>
					<motion.div
						variants={statsVariants}
						initial="initial"
						animate="animation"
						transition={{ duration: 1, delay: 1 }}
					>
						<Stat stat={2} title="Instructors" />
					</motion.div>
				</HStack>
			</ContainerInside>
		</Container>
	);
}

function Stat({ stat, title, suffix = "" }) {
	return (
		<VStack>
			<Heading>
				<CountUp end={stat} suffix={suffix} duration={2} useEasing />
			</Heading>
			<Text>{title}</Text>
		</VStack>
	);
}
