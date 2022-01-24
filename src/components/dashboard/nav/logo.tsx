import { Box, Heading, HStack } from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import NextImage from "next/image";

export default function Logo() {
	return (
		<NextChakraLink href="/">
			<HStack>
				<Box boxSize="40px" pos="relative">
					<NextImage
						src="/logo_primary.png"
						layout="fill"
						alt="programming simplified logo"
						className="circle"
						priority
					/>
				</Box>

				<Heading size="xs">Programming Simplified</Heading>
			</HStack>
		</NextChakraLink>
	);
}
