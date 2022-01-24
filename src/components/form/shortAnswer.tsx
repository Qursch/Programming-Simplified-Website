import Card from "./card";
import { Field } from "formik";
import {
	FormControl,
	FormErrorMessage,
	Text,
	Textarea,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";

export default function ShortAnswer(props: any) {
	const { question, value, isRequired = false } = props;

	return (
		<Card>
			<Text fontSize="md">
				{question}
				{isRequired && <span className="required"> *</span>}
			</Text>
			<Field name={value}>
				{({ field, form }) => (
					<FormControl
						isInvalid={form.errors[value] && form.touched[value]}
					>
						<Textarea
							{...field}
							as={TextareaAutosize}
							minH="fit-content"
							placeholder="Your answer"
							resize="none"
						/>
						<FormErrorMessage>
							{form.errors[value]}
						</FormErrorMessage>
					</FormControl>
				)}
			</Field>
		</Card>
	);
}
