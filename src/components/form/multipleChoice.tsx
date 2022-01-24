import Card from "./card";
import { Field } from "formik";
import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";

export default function MultipleChoice(props: any) {
	const { question, value, answers, isRequired = false } = props;

	return (
		<Card>
			<Text fontSize="md">
				{question}
				{isRequired && <span className="required"> *</span>}
			</Text>
			<RadioGroup>
				<Stack spacing={4}>
					{answers.map((a) => (
						<Field name={value}>
							{({ field }) => (
								<Radio
									{...field}
									value={a.value ? a.value : a}
									size="lg"
								>
									<Text fontSize="md">
										{a.text ? a.text : a}
									</Text>
								</Radio>
							)}
						</Field>
					))}
					<Field name={value}>
						{({ field }) => (
							<Radio {...field} value="Other" size="lg">
								<Text fontSize="md">Other</Text>
							</Radio>
						)}
					</Field>
				</Stack>
			</RadioGroup>
		</Card>
	);
}
