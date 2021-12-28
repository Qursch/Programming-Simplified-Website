import { Box, Divider, Flex, Spacer, Stack } from "@chakra-ui/react";
import {
	FaBook,
	FaBug,
	FaClipboard,
	FaDiscord,
	// FaHandsHelping,
	// FaCertificate,
	FaHome,
	FaInstagram,
	FaYoutube,
} from "react-icons/fa";

import Logo from "./logo";
import NavLink from "./navlink";
import UserProfile from "./userprofile";

export default function Sidebar(props) {
	const { theme, setTheme, ...rest } = props;
	return (
		<>
			<Flex
				bg="rgb(0 0 0 / 40% )"
				direction="column"
				borderRightWidth="1px"
				position="fixed"
				maxWidth="250px"
				w="100%"
				{...rest}
			>
				<Flex
					direction="column"
					flex="1"
					pt="5"
					pb="4"
					overflowY="auto"
					px="4"
				>
					<Box mb="6">
						<Logo />
					</Box>

					<Stack spacing="6" as="nav" aria-label="Sidebar Navigation">
						<Stack spacing="1">
							<NavLink
								label="Home"
								icon={FaHome}
								href="/dashboard"
							/>
							<NavLink
								label="Enrolled Courses"
								icon={FaBook}
								href="/dashboard/enrolled"
							/>
							<NavLink
								label="All Courses"
								icon={FaBook}
								href="/dashboard/courses"
							/>
							{/* <NavLink
								label="Request Help"
								icon={FaHandsHelping}
								href="/dashboard/help"
							/> */}
							{/* <NavLink
								label="Request Certificate"
								icon={FaCertificate}
								href="/dashboard/certificate"
							/> */}
							<NavLink
								label="Report Bug"
								icon={FaBug}
								href="/dashboard/bug"
							/>
							<NavLink
								label="Submit Feedback"
								icon={FaClipboard}
								href="/dashboard/feedback"
							/>
						</Stack>

						<Divider />

						<Stack spacing="1">
							<NavLink
								label="Discord"
								icon={FaDiscord}
								href="/discord"
								isExternal
							/>
							<NavLink
								label="Instagram"
								icon={FaInstagram}
								href="/instagram"
								isExternal
							/>
							<NavLink
								label="Youtube"
								icon={FaYoutube}
								href="https://www.youtube.com/channel/UC8ab5wEC09GfgwCUxisUB1g"
								isExternal
							/>
						</Stack>
					</Stack>
					<Spacer />
				</Flex>

				<UserProfile theme={theme} setTheme={setTheme} />
			</Flex>
			<Box
				h="100vh"
				maxW="250px"
				w="100%"
				display={{ base: "none", md: "block" }}
			/>
		</>
	);
}
