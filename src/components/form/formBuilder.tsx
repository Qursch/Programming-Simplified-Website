import { Center, Heading, Text, VStack, HStack } from "@chakra-ui/react";
import Button from "@components/button";
import Card from "./card";
import { Form, Formik } from "formik";
import ShortAnswer from "@components/form/shortAnswer";
import MultipleChoice from "@components/form/multipleChoice";
import * as Yup from "yup";

export default function FormBuilder({
	onSubmit,
	title,
	description,
	questions = [],
}) {
	const initialValues = {};
	const shape = {};
	questions.forEach((question) => {
		initialValues[question.value] = "";
		if (question.required) {
			shape[question.value] = Yup.string().required(
				"This is a required question"
			);
			return;
		}
		shape[question.value] = Yup.string();
	});

	const validationSchema = Yup.object().shape(shape);
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ resetForm, isSubmitting }) => (
				<Form style={{ width: "100%" }}>
					<Center>
						<VStack
							color="white"
							align="center"
							justify="center"
							maxW="640px"
							py={8}
							w="100%"
							spacing={4}
						>
							<Card>
								<Heading textAlign="center" as="h1">
									{title}
								</Heading>
								<Text fontSize="sm">{description}</Text>
							</Card>

							{questions.map((question) => {
								switch (question.type) {
									case "shortAnswer":
										return (
											<ShortAnswer
												key={question.value}
												isRequired={question.required}
												question={question.question}
												value={question.value}
											/>
										);
									case "multipleChoice":
										return (
											<MultipleChoice
												key={question.value}
												isRequired={question.required}
												question={question.question}
												value={question.value}
												answers={question.answers}
											/>
										);
									default:
										return null;
								}
							})}

							<HStack justify="space-between" w="100%">
								<Button
									type="submit"
									isLoading={isSubmitting}
									disabled={isSubmitting}
								>
									Submit
								</Button>
								<Text
									color="primary"
									_hover={{
										cursor: "pointer",
									}}
									// @ts-ignore
									onClick={resetForm}
									type="reset"
								>
									Clear Form
								</Text>
							</HStack>
						</VStack>
					</Center>
				</Form>
			)}
		</Formik>
	);
}
