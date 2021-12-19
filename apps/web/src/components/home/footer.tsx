import {
	Divider,
	Heading,
	HStack,
	Text,
	useToken,
	VStack,
} from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import Button from "@components/home/button";
import NextChakraLink from "@components/nextChakraLink";
import { rounded } from "@styles/theme";
import { FaDiscord, FaInstagram } from "react-icons/fa";
import NextImage from "next/image";

export default function Footer() {
	const [primary] = useToken("colors", ["primary"]);
	return (
		<Container
			color="#808080"
			bg="#101010"
			py="100px"
			mt="200px"
			textAlign="center"
		>
			<ContainerInside>
				<VStack
					bg="gradient"
					rounded={rounded}
					py="75px"
					pos="relative"
					bottom="200px"
					textAlign="center"
					spacing="15px"
					boxShadow={`0px 0px 200px ${primary}`}
				>
					<VStack maxW="500px" px="25px" color="white">
						<Heading
							fontSize={{ base: "xl", sm: "3xl", lg: "4xl" }}
							as="h1"
						>
							Start upgrading your skills for free today!
						</Heading>
						<Text fontSize={{ base: "sm", sm: "lg" }} color="#ccc">
							Build up your programming knowledge and take as long
							as you need.
						</Text>
						<HStack>
							<NextChakraLink href="/dashboard" isExternal>
								<Button>Get Started</Button>
							</NextChakraLink>
						</HStack>
					</VStack>
				</VStack>
				<HStack
					justify={{ base: "center", sm: "space-between" }}
					flexDir={{ base: "column", sm: "row" }}
					spacing="0"
					color="white"
					mb="20px"
					mt="-100px"
				>
					<VStack>
						<HStack>
							<NextImage
								width={30}
								height={30}
								src="/logo_primary.png"
								className="circle"
								alt="primary logo"
								quality={95}
							/>
							<Heading size="md">Programming Simplified</Heading>
						</HStack>
						<NextChakraLink
							href="https://schoolsimplified.org/"
							isExternal
						>
							<HStack>
								<NextImage
									width={25}
									height={25}
									src="/ss_logo.png"
									className="circle"
									alt="ss logo"
									quality={95}
								/>
								<Text fontWeight="500" fontSize="sm">
									Powered by School Simplified
								</Text>
							</HStack>
						</NextChakraLink>
					</VStack>
					<HStack spacing="50px">
						<NextChakraLink href="/dashboard" isExternal>
							Dashboard
						</NextChakraLink>
						<NextChakraLink href="/discord" isExternal>
							Contact
						</NextChakraLink>
						<NextChakraLink href="/discord" isExternal>
							Discord
						</NextChakraLink>
					</HStack>
				</HStack>
				<Divider color="white" />
				<HStack
					justify={{ base: "center", sm: "space-between" }}
					flexDir={{ base: "column", sm: "row" }}
					spacing="0"
					mt="20px"
				>
					<HStack>
						<NextChakraLink
							href="/instagram"
							fontSize="0px"
							isExternal
						>
							Instagram
							<FaInstagram size="25px" />
						</NextChakraLink>
						<NextChakraLink
							href="/discord"
							fontSize="0px"
							isExternal
						>
							Discord
							<FaDiscord size="25px" />
						</NextChakraLink>
					</HStack>
					<Text size="md">
						©️ 2021 Copyright.{" "}
						<span style={{ color: primary }}>
							Programming Simplified
						</span>
					</Text>
				</HStack>
			</ContainerInside>
		</Container>
	);
}
