import { Center, Divider, HStack } from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import Button from "@components/home/button";
import NextChakraLink from "@components/nextChakraLink";
import { useAuth } from "@providers/authContext";
import NextImage from "next/image";

export default function Header() {
	const { user } = useAuth();
	// const [bannerVisible, setBannerVisible] = useState(true);

	return (
		<Container shadow="md" position="sticky" top={0} zIndex="10" bg="white">
			<ContainerInside mx={0}>
				{/* {bannerVisible && (
					<Flex
						bgColor="#FFAC33"
						color="black"
						py={1}
						px={2}
						w="100%"
						zIndex={1000}
					>
						<Spacer />
						<Text as="b" fontWeight={700}>
							SimpliHacks 2.0 Registration is Officially Open!{" "}
							<NextChakraLink
								href="/simplihacks"
								_hover={{ color: "white" }}
							>
								<Text as="u">Click here to sign up!</Text>
							</NextChakraLink>
						</Text>
						<Spacer />
						<SimpleButton
							justifySelf="flex-end"
							bgColor="transparent"
							p={0}
							style={{ aspectRatio: "1" }}
							size="xs"
							onClick={() => setBannerVisible(false)}
						>
							X
						</SimpleButton>
					</Flex>
				)} */}
				<HStack spacing="0" justify="space-between" py={4} px={6}>
					<HStack spacing={5}>
						<NextChakraLink
							href="https://schoolsimplified.org"
							isExternal
						>
							<Center>
								<NextImage
									width={50}
									height={50}
									src="/ss_logo.png"
									alt="dark logo"
									className="circle"
									quality={95}
								/>
							</Center>
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
						{/* <NextChakraLink href="/discord" isExternal>
							Discord
						</NextChakraLink> */}
						<NextChakraLink href="/dashboard/courses">
							Courses
						</NextChakraLink>

						<NextChakraLink href="/volunteer">
							Volunteer
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
