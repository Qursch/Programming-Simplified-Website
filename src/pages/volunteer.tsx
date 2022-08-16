import { getJobPostings } from "api/notion";
import {
	Box,
	Center,
	Heading,
	SimpleGrid,
	Stack,
	StackDivider,
	StackProps,
	Text,
	useBreakpointValue,
	useDisclosure,
	useToken,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import Container from "@components/container";
import Footer from "@components/home/footer";
import Header from "@components/home/header";
import ContainerInside from "@components/containerInside";
import NextChakraLink from "@components/nextChakra";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ReactGA from "react-ga4";
import { useRouter } from "next/router";

import { JobPosting } from "types";

const transition = {
	x: { type: "spring", stiffness: 300, damping: 30 },
	opacity: { duration: 0.2 },
};

/**
 * The Volunteering page!
 *
 * ~~Mention that people can give people community service hours (!)
 * Needs information about the different positions (e.g. tutoring, technical, marketing, HR, etc.) (images from Mossa, alsdkfjadlskfj, aisdfhalj) [in one box, same layout for each]
 * Needs a clear button that lets users sign up, which takes them to the Discord to reinforce call to action
 * Needs a couple Undraw images~~
 * @returns the Volunteering page
 */
export default function Volunteering({ postings }: { postings: JobPosting[] }) {
	const router = useRouter();
	const [selectedPosition, setSelectedPosition] = useState<JobPosting>(null);
	const [primary] = useToken("colors", ["primary"]);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const isAnimated = useBreakpointValue({ base: true, md: false });
	// console.log("isAnimated:", isAnimated);

	return (
		<>
			<Header />
			<main style={{ color: "#fff" }}>
				<Container
					pt={{ base: 12, md: 24 }}
					pb={{ base: 12, md: 24 }}
					px={{ base: 5, md: 10 }}
				>
					<ContainerInside>
						<Center>
							<Stack
								textAlign="left"
								direction={{
									base: "column-reverse",
									md: "row",
								}}
								spacing={{ base: 5, md: 10 }}
								justifyContent={{ base: "left", md: "center" }}
								align="center"
							>
								<VStack flex={5} align="flex-start">
									<Heading
										style={{ color: primary }}
										size="xl"
									>
										Join Our Team
									</Heading>
									<Text
										fontSize="lg"
										style={{ color: "#000" }}
									>
										We are one of the largest student-run
										nonprofits in the world, and our
										independence from other organizations
										and institutions will provide you with
										unprecedented freedom to create, learn,
										and contribute. Whether your interests
										lie in business, community, or
										academics, join us today and empower our
										generation to revolutionize our future!
									</Text>
								</VStack>
							</Stack>
						</Center>
					</ContainerInside>
				</Container>
				<Container pt={20} bg="white">
					<ContainerInside>
						<VStack
							spacing={10}
							align="stretch"
							divider={<StackDivider borderColor="white" />}
						>
							<SimpleGrid
								columns={{ base: 1, md: 2 }}
								spacing={8}
								maxH="90vh"
								maxW="100%"
								overflowX={{ base: "hidden", md: null }}
								position="relative"
							>
								<AnimatePresence initial={false}>
									{!isOpen || !isAnimated ? (
										<motion.div
											key="left"
											style={{
												paddingRight: "0.5rem",
												scrollbarWidth: "thin",
											}}
											variants={{
												enter: { x: -1000, opacity: 0 },
												center: {
													zIndex: 1,
													x: 0,
													opacity: 1,
												},
												exit: {
													zIndex: 0,
													x: -1000,
													opacity: 0,
													position: "absolute",
												},
											}}
											initial="enter"
											animate="center"
											exit="exit"
											transition={transition}
										>
											<VStack spacing={5} align="stretch">
												{postings.map(
													(posting: JobPosting) => (
														<VolunteerPosition
															key={
																posting.name +
																posting.area
															}
															posting={posting}
															onSelected={(
																posting
															) => {
																setSelectedPosition(
																	posting
																);
																ReactGA.event({
																	category:
																		"Volunteer",
																	action: "view_role",
																	label: posting.name,
																});
																onOpen();
															}}
															h="100%"
														/>
													)
												)}
											</VStack>
										</motion.div>
									) : null}
									{selectedPosition &&
									(isOpen || !isAnimated) ? (
										<motion.div
											key="right"
											variants={{
												enter: { x: 1000, opacity: 0 },
												center: {
													zIndex: 1,
													x: 0,
													opacity: 1,
												},
												exit: {
													zIndex: 0,
													x: 1000,
													opacity: 0,
													position: "absolute",
												},
											}}
											initial="enter"
											animate="center"
											exit="exit"
											transition={transition}
										>
											<VStack spacing={8} align="stretch">
												{isAnimated ? (
													<Button onClick={onClose}>
														Back
													</Button>
												) : null}
												<Stack
													direction={{
														base: "column",
														lg: "row",
													}}
													bg="gradient"
													rounded={25}
													px={10}
													py={6}
												>
													<VStack
														align="stretch"
														textAlign="left"
														flex={1}
													>
														<Text fontSize="sm">
															{
																selectedPosition.area
															}
														</Text>
														<Heading fontSize="lg">
															{
																selectedPosition.name
															}
														</Heading>
													</VStack>
													<NextChakraLink
														href={
															selectedPosition.form ??
															""
														}
													>
														<Button
															onClick={(e) => {
																e.preventDefault();
																ReactGA.event({
																	category:
																		"volunteer",
																	action: "apply_clicked",
																	label: selectedPosition.name,
																});
																if (
																	selectedPosition.form
																) {
																	router.push(
																		selectedPosition.form
																	);
																}
															}}
															flex={1}
														>
															Apply Now
														</Button>
													</NextChakraLink>
												</Stack>
												<Box
													bg="gradient"
													rounded={25}
													px={10}
													py={6}
													textAlign="left"
												>
													<Text>
														Responsibilities
													</Text>
													{
														selectedPosition.responsibilities
													}
												</Box>
												<Box
													bg="gradient"
													rounded={25}
													px={10}
													py={6}
													textAlign="left"
												>
													<Text>Requirements</Text>
													{
														selectedPosition.requirements
													}
												</Box>
											</VStack>
										</motion.div>
									) : null}
								</AnimatePresence>
							</SimpleGrid>
						</VStack>
					</ContainerInside>
				</Container>
				<Box
					h={10}
					bg="linear-gradient(180deg, white 20%, transparent 100%)"
				/>

				<Footer />
			</main>
		</>
	);
}

export async function getStaticProps() {
	const props = {
		postings: (await getJobPostings()).sort((a, b) =>
			a.name.localeCompare(b.name, "en")
		),
	};
	return {
		props,
		revalidate: 360,
	};
}

type VolunteerPositionProps = {
	posting: JobPosting;
	onSelected?: (posting: JobPosting) => void;
} & StackProps;

/**
 * Creates a JSX element with the given information to show a volunteer position
 *
 * @param {VolunteerPositionProps} props the props to pass this component
 * @param {JobPosting} props.posting the posting information to use
 * @param {(posting: JobPosting) => void} props.onSelected the callback to invoke
 * when this job posting is clicked
 * @returns a JSX element that displays the given volunteer position
 */
function VolunteerPosition({
	posting,
	onSelected,
	...stackProps
}: VolunteerPositionProps): JSX.Element {
	const { area, name } = posting;

	return (
		<Stack
			spacing={0}
			textAlign="left"
			transition="all 0.15s ease-in"
			borderRadius="lg"
			overflow="hidden"
			bg="gradient"
			onClick={() => onSelected?.(posting)}
			_hover={{ transform: "scale(0.97)", cursor: "pointer" }}
			{...stackProps}
		>
			{/* <Box h={160} p={4} overflowY="hidden" position="relative">
				<Box
					position="absolute"
					left={0}
					top={0}
					width="100%"
					height="100%"
					bg={image?.url ? `url(${image?.url})` : "#5A60ADCC"}
					bgSize="cover"
					bgPos="center"
				/>
			</Box> */}
			<Stack
				bg="brand.darkerBlue"
				spacing={0}
				px={4}
				py={2}
				justify="center"
				flex={1}
			>
				<Text fontSize="sm">{area}</Text>
				<Heading fontSize="lg">{name}</Heading>
			</Stack>
		</Stack>
	);
}
