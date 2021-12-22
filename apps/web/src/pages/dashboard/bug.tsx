import { useToast } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import FormBuilder from "@components/form/formBuilder";
import { useAuth } from "@providers/authContext";
import { submitBugReport } from "api/index";

export default function Bug() {
	const { user } = useAuth();
	const toast = useToast();

	return (
		<Layout>
			<FormBuilder
				onSubmit={async ({ type, ...values }) => {
					await submitBugReport({
						username: user.firstName + " | " + user.lastName,
						id: user.id,
						type: [type],
						...values,
					})
						.then(() => {
							toast({
								title: "Success",
								description:
									"Bug report submitted successfully, thank you!",
								status: "success",
								duration: 5000,
								isClosable: true,
							});
							location.reload();
						})
						.catch((reason) => {
							toast({
								title: "Error",
								description:
									reason.response?.message ??
									"Generic error, refresh and try again. If the issue persists please contact the owner",
								status: "error",
								duration: 5000,
								isClosable: true,
							});
						});
				}}
				title="Bug Report Form"
				description={
					<>
						Here you can give our developers at Programming
						Simplified bugs you find so we can help better our
						product.
						<br />
						Your responses are completely anonymous so don't feel
						restricted with your comments (keep them respectful
						though).
					</>
				}
				questions={questions}
			/>
		</Layout>
	);
}

const questions = [
	{
		type: "multipleChoice",
		question: "What type of bug are you reporting?",
		value: "type",
		answers: [
			"User Interface / User Experience",
			"Authentication",
			"API / Database",
			"Video not playing",
		],
		required: true,
	},
	{
		type: "shortAnswer",
		question: "What url was the bug found on?",
		value: "url",
		required: true,
	},
	{
		type: "shortAnswer",
		question: "Please list out steps to reproduce the bug you found",
		value: "steps",
		required: true,
	},

	{
		type: "shortAnswer",
		question: "Would you like to add any additional information?",
		value: "additional",
	},
];
