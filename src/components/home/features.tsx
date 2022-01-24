import { Heading, HStack, Stack, Text, Box } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { rounded, shadow } from "@styles/theme";
import { FiGitBranch, FiGitMerge, FiGitPullRequest } from "react-icons/fi";
import { motion, Variants } from "framer-motion";

export default function Features() {
	const featureVariants: Variants = {
		offscreen: {
			y: 50,
			opacity: 0,
		},
		onscreen: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 1,
			},
		},
	};

	return (
		<Container py="100px">
			<ContainerInside>
				<motion.div
					whileInView="onscreen"
					initial="offscreen"
					viewport={{ amount: 0.1 }}
					variants={featureVariants}
				>
					<HStack
						spacing={{ base: 0, xl: "20px" }}
						flexDir={{ base: "column", xl: "row" }}
					>
						<Stack
							spacing="25px"
							textAlign={{ base: "center", xl: "left" }}
							align={{ base: "center", xl: "flex-start" }}
						>
							<Heading size="2xl" as="h1">
								Our Features Special For You
							</Heading>
							<Text fontSize="xl" w="250px" color="#2b2b2b">
								We provide various special features for you.
							</Text>
						</Stack>
						<HStack
							pt={{ base: "20px", xl: 0 }}
							spacing={{ base: 0, lg: "20px" }}
							flexDir={{ base: "column", lg: "row" }}
						>
							<Card
								icon={FiGitBranch}
								title="Experienced Instructors"
								text="Bring your design vision to life in clean, semantic code."
							/>
							<Box pt={{ base: "20px", lg: 0 }}>
								<Card
									icon={FiGitMerge}
									title="Flexible Learning Plan"
									text="Learn at your own pace with our professionally recorded lessons."
									textc="#f0f0f0"
									bg="gradient"
								/>
							</Box>
							<Box pt={{ base: "20px", lg: 0 }}>
								<Card
									icon={FiGitPullRequest}
									title="Easily Accessible Lessons"
									text="Easily create and update your personal projects."
								/>
							</Box>
						</HStack>
					</HStack>
				</motion.div>
			</ContainerInside>
		</Container>
	);
}

function Card(props) {
	return (
		<Stack
			w="250px"
			p="40px"
			bg="white"
			rounded={rounded}
			spacing="40px"
			shadow={shadow}
			{...props}
		>
			<props.icon
				size="50px"
				style={{
					background: "white",
					padding: "10px",
					borderRadius: "0.75em",
				}}
			/>
			<Heading size="md" color={props.textc ? props.textc : "inherit"}>
				{props.title}
			</Heading>
			<Text color={props.textc ? props.textc : "#2b2b2b"}>
				{props.text}
			</Text>
		</Stack>
	);
}
