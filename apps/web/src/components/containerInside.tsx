import { Box } from "@chakra-ui/react";

export default function ContainerInside(props: any) {
	return (
		<Box maxW="1300px" w="100%" mx="25px" {...props}>
			{props.children}
		</Box>
	);
}
