import { Center } from "@chakra-ui/react";

export default function Container(props: any) {
	return (
		<Center as="section" {...props}>
			{props.children}
		</Center>
	);
}
