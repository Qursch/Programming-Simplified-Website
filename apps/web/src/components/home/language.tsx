import { Heading, HStack, Image, Stack, Text } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import NextChakraLink from "@components/nextChakraLink";
import { rounded, shadow } from "@styles/theme";
import { motion } from "framer-motion";
import Button from "./button";

export default function Language() {
	const languageVariants = {
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
					variants={languageVariants}
					initial="offscreen"
					whileInView="onscreen"
					viewport={{ amount: 0.1 }}
				>
					<HStack
						spacing={{ base: "0", md: "50px" }}
						flexDir={{ base: "column-reverse", md: "row" }}
					>
						<Image
							src="/code2.png"
							rounded={rounded}
							shadow={shadow}
							alt="code block"
							maxW={{ base: "500px", md: "400px", lg: "600px" }}
							w="100%"
						/>

						<Stack
							w="100%"
							pb={{ base: "25px", md: "0" }}
							textAlign={{ base: "center", xl: "left" }}
							align={{ base: "center", xl: "flex-start" }}
						>
							<Heading as="h1">
								The learning platform for the future
							</Heading>
							<Text>
								Develop your skills and become a future
								professional
							</Text>
							<NextChakraLink href="/dashboard" isExternal>
								<Button w="fit-content">Try It Yourself</Button>
							</NextChakraLink>
						</Stack>
					</HStack>
				</motion.div>
			</ContainerInside>
		</Container>
	);
}
