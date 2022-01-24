import { Button as ChakraButton } from "@chakra-ui/react";
import { rounded, shadow } from "@styles/theme";

export default function Button({ type = "black", children, ...props }) {
	let bg;
	let color;
	switch (type) {
		case "primary":
			bg = "primary";
			color = "#101010";
			break;
		case "white":
			bg = "white";
			color = "primary";
			break;
		default:
			bg = "#101010";
			color = "white";
			break;
	}

	return (
		<ChakraButton
			transition="all 0.2s ease"
			px={{ base: "16px", md: "25px" }}
			py={{ base: "16px", md: "25px" }}
			rounded={rounded}
			fontSize="16px"
			fontWeight="bold"
			bg={bg}
			color={color}
			shadow={shadow}
			_hover={{
				transform: "scale(1.05)",
			}}
			_active={{
				transform: "scale(1)",
				boxShadow: "none",
			}}
			_focus={{
				boxShadow: "none",
				outline: "none",
			}}
			{...props}
		>
			{children}
		</ChakraButton>
	);
}
