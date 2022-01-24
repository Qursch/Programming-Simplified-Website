import { Stack } from "@chakra-ui/react";
import { rounded, shadow } from "@styles/theme";

export default function Card({ children }) {
	return (
		<Stack
			spacing={4}
			w="100%"
			p="25px"
			bg="secondary"
			rounded={rounded}
			shadow={shadow}
			transition="all ease-in 0.2s"
		>
			{children}
		</Stack>
	);
}
