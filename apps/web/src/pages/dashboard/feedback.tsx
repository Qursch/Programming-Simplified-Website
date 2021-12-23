import { useToast } from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import FormBuilder from "@components/form/formBuilder";
import { useAuth } from "@providers/authContext";
import { submitFeedback } from "api/index";

export default function Feedback() {
	const { user } = useAuth();
	const toast = useToast();

	return (
		<Layout>
			<FormBuilder
				onSubmit={async (values) => {
					await submitFeedback({
						username: user.firstName + " | " + user.lastName,
						avatarUrl: user.image,
						id: user.id,
						...values,
					})
						.then(() => {
							toast({
								title: "Success",
								description:
									"Feedback submitted successfully, thank you!",
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
				title="Feedback Form"
				description={
					<>
						Here, you can give feedback and suggestions to
						Programming Simplified leadership on what you would like
						to see changed or added.
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
		question: "How did you hear about Programming Simplified?",
		value: "referral",
		answers: [
			"Through School Simplified",
			"Through a friend",
			"Through Instagram",
		],
		required: true,
	},
	{
		type: "shortAnswer",
		question:
			"How do you feel about our current courses? Is there anything you would like us to modify?",
		value: "courses",
		required: true,
	},
	{
		type: "shortAnswer",
		question:
			"How do you feel about our recorded lesson videos? Is there anything you would like us to modify?",
		value: "lessons",
		required: true,
	},
	{
		type: "shortAnswer",
		question:
			"How do you feel about your instructors? Are there any suggestions you would give them to make their courses better?",
		value: "instructors",
		required: true,
	},
	{
		type: "shortAnswer",
		question:
			"Is there any feedback you would like to give on specific teams / staff members?",
		value: "feedback",
	},
	{
		type: "shortAnswer",
		question: "Would you like to add any additional information?",
		value: "additional",
	},
];
