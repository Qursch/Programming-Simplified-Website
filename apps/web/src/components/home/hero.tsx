import {
	HStack,
	Text,
	Heading,
	Stack,
	Box,
	Image,
	useToken,
} from "@chakra-ui/react";
import Button from "@components/home/button";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import NextChakraLink from "@components/nextChakraLink";
import { rounded, shadow } from "@styles/theme";
import { motion } from "framer-motion";

export default function Hero() {
	const [primary] = useToken("colors", ["primary"]);
	const heroTextVariants = {
		initial: {
			opacity: 0,
			x: -50,
		},
		animation: {
			opacity: 1,
			x: 0,
		},
	};
	const heroImageVariants = {
		initial: {
			opacity: 0,
			y: 50,
		},
		animation: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<Container pt="25px" pb="100px">
			<ContainerInside>
				<HStack
					mt={{ base: "90px", md: 0 }}
					flexDir={{ base: "column", md: "row" }}
					spacing="0"
				>
					<motion.div
						variants={heroTextVariants}
						animate="animation"
						initial="initial"
						transition={{ duration: 1 }}
						style={{ width: "100%" }}
					>
						<Stack
							w="100%"
							spacing={{ base: "25px", md: "50px" }}
							pr={{ base: 0, md: "25px" }}
							align={{ base: "center", md: "flex-start" }}
							textAlign={{ base: "center", md: "left" }}
							mb={{ base: "25px", md: "0" }}
						>
							{/* @ts-ignore */}
							<Heading as="h1" fontWeight="normal" size="2xl">
								<span>Improve</span> your <span>skills</span> by
								learning from{" "}
								<span>experienced instructors</span>
							</Heading>
							<style>
								{`
								span {
									font-weight: bold;
									color: ${primary};
								}
							`}
							</style>
							<Text w="40ch">
								Create, launch, and produce projects by gaining
								coding skills through an innovative way of
								learning.
							</Text>
							<NextChakraLink href="/dashboard" isExternal>
								<Button>Get Started</Button>
							</NextChakraLink>
						</Stack>
					</motion.div>
					<motion.div
						variants={heroImageVariants}
						animate="animation"
						initial="initial"
						transition={{ duration: 1 }}
						style={{ width: "80%" }}
					>
						<Box
							bg={{ base: "transparent", md: "#101010" }}
							w={{ base: "unset", md: "100%" }}
							rounded={rounded}
							pos="relative"
						>
							<Image
								src="/svg.svg"
								display={{ base: "none", md: "block" }}
								alt="lighting pattern"
							/>
							<Image
								src="/code.png"
								rounded={rounded}
								shadow={shadow}
								alt="code block"
								pos={{ base: "static", md: "absolute" }}
								top="45%"
								right={{
									base: "50",
									sm: "100",
									md: "50",
									lg: "100",
									xl: "125",
								}}
							/>
						</Box>
					</motion.div>
				</HStack>
			</ContainerInside>
		</Container>
	);
}
