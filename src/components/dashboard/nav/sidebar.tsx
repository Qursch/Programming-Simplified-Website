import { Box, Divider, Flex, Spacer, Stack } from "@chakra-ui/react";
import {
	FaBook,
	FaBug,
	FaCertificate,
	FaClipboard,
	FaDiscord,
	// FaHandsHelping,
	FaHome,
} from "react-icons/fa";
import Logo from "./logo";
import NavLink from "./navlink";
import UserProfile from "./userprofile";
import ReactGA from "react-ga4";

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
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "enrolled_courses",
									});
								}}
							/>
							<NavLink
								label="All Courses"
								icon={FaBook}
								href="/dashboard/courses"
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "all_courses",
										label: "Dashboard",
									});
								}}
							/>
							{/* <NavLink
								label="Request Help"
								icon={FaHandsHelping}
								href="/dashboard/help"
							/> */}
							<NavLink
								label="Request Certificate"
								icon={FaCertificate}
								href="/dashboard/certificate"
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "request_certificate",
									});
								}}
							/>
							<NavLink
								label="Report Bug"
								icon={FaBug}
								href="/dashboard/bug"
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "bug_report",
									});
								}}
							/>
							<NavLink
								label="Submit Feedback"
								icon={FaClipboard}
								href="/dashboard/feedback"
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "submit_feedback",
									});
								}}
							/>
						</Stack>

						<Divider />

						<Stack spacing="1">
							<NavLink
								label="Discord"
								icon={FaDiscord}
								href="/discord"
								isExternal
								onClick={() => {
									ReactGA.event({
										category: "navigation",
										action: "discord",
										label: "Dashboard",
									});
								}}
							/>
							{/* <NavLink
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
							/> */}
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
