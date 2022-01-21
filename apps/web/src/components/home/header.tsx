import { Divider, HStack } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import Button from "@components/home/button";
import NextChakraLink from "@components/nextChakraLink";
import { useAuth } from "@providers/authContext";
import NextImage from "next/image";

export default function Header() {
	const { user } = useAuth();

	return (
		<Container
			shadow="md"
			position="sticky"
			top="0"
			py="16px"
			zIndex="10"
			bg="white"
		>
			<ContainerInside>
				<HStack spacing="0" justify="space-between">
					<HStack spacing={5}>
						<NextChakraLink href="https://schoolsimplified.org" isExternal>
							<NextImage
								width={50}
								height={50}
								src="/ss_logo.png"
								alt="dark logo"
								className="circle"
								quality={95}
							/>
						</NextChakraLink>

						<Divider
							orientation="vertical"
							color="black"
							h="50px"
							w={5}
						/>
						<NextImage
							width={50}
							height={50}
							src="/logo_secondary.png"
							alt="dark logo"
							className="circle"
							quality={95}
						/>
					</HStack>
					<HStack spacing={{ base: "10px", md: "25px" }}>
						<NextChakraLink href="/discord" isExternal>
							Discord
						</NextChakraLink>
						<NextChakraLink href="/dashboard/courses">
							Courses
						</NextChakraLink>

						{user ? (
							<NextChakraLink href="/dashboard">
								Dashboard
							</NextChakraLink>
						) : (
							<>
								<NextChakraLink href="/login">
									Login
								</NextChakraLink>
								<NextChakraLink href="/register">
									<Button _hover={{ cursor: "pointer" }}>
										Register
									</Button>
								</NextChakraLink>
							</>
						)}
					</HStack>
				</HStack>
			</ContainerInside>
		</Container>
	);
}
