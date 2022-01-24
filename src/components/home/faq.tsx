import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
	Accordion,
	AccordionButton,
	AccordionItem,
	AccordionPanel,
	Circle,
	Heading,
	Text,
} from "@chakra-ui/react";
import Container from "@components/container";
import ContainerInside from "@components/containerInside";
import { rounded } from "@styles/theme";
import { motion, Variants } from "framer-motion";

export default function Faq() {
	const faqVariants: Variants = {
		offscreen: {
			opacity: 0,
			y: 50,
		},
		onscreen: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
			},
		},
	};

	return (
		<Container
			//  bg="white"
			py="100px"
		>
			<ContainerInside>
				<Accordion allowMultiple allowToggle>
					{questionAnswerPairs.map((pair) => (
						<motion.div
							variants={faqVariants}
							key={pair.question}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ amount: 0.1 }}
						>
							<AccordionItem
								borderTopWidth="0px"
								borderBottomWidth="1px"
								borderColor="#101010"
								py="25px"
							>
								{({ isExpanded }) => (
									<>
										<AccordionButton
											_active={{}}
											_focus={{}}
											rounded={rounded}
										>
											<Heading
												flex="1"
												textAlign="left"
												as="h1"
												fontSize={{
													base: "1xl",
													sm: "2xl",
													lg: "3xl",
												}}
											>
												{pair.question}
											</Heading>
											{isExpanded ? (
												<Circle
													// border="1px"
													p="10px"
													bg="gradient"
												>
													<MinusIcon
														fontSize="20px"
														color="white"
													/>
												</Circle>
											) : (
												<Circle
													border="1px"
													p="10px"
													borderColor="primary"
												>
													<AddIcon
														fontSize="20px"
														color="primary"
													/>
												</Circle>
											)}
										</AccordionButton>

										<AccordionPanel pb={4}>
											<Text
												fontSize={{
													base: "md",
													sm: "lg",
													lg: "xl",
												}}
											>
												{pair.answer}
											</Text>
										</AccordionPanel>
									</>
								)}
							</AccordionItem>
						</motion.div>
					))}
				</Accordion>
			</ContainerInside>
		</Container>
	);
}

const questionAnswerPairs = [
	{
		question: "What is the purpose of this website?",
		answer: "The purpose of Programming Simplified is to help beginner programmers learn the necessary basic skills to start their own careers and projects.",
	},
	{
		question: "How do I get started?",
		answer: "To get started, log in with your Discord account and navigate to the Courses page. There you will have full access to all of our curriculums.",
	},
	{
		question: "How quickly can I finish a course?",
		answer: 'The pace at which you complete the course is completely up to you. However, refer to the "Completion" section of each course page to see an estimated time frame.',
	},
	{
		question: "What do I do if I get stuck?",
		answer: "If you get stuck, please contact us on our Discord server and we will be happy to help you out!",
	},
	{
		question: "How do I contact you?",
		answer: "If you have any questions, concerns, or suggestions, please contact us on our Discord server.",
	},
	{
		question: "How do I earn my certification?",
		answer: "Once you have completed a course, you will be able to earn your certification by completing the course's certification exam.",
	},
];
