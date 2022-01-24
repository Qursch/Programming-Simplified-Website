import { Stack, Center, Heading, HStack, Circle, Text } from "@chakra-ui/react";
import { rounded, shadow } from "@styles/theme";
import NextImage from "next/image";

export default function CourseCard({ name, authors, image }) {
	return (
		<Stack
			rounded={rounded}
			bg="secondary"
			maxW="300px"
			w="100%"
			h="375px"
			transition="all 0.3s"
			shadow={shadow}
			_hover={{
				backgroundColor: "rgb(0 0 0 / 30%)",
				cursor: "pointer",
			}}
		>
			<Center
				rounded={rounded}
				pos="relative"
				width="300px"
				height="200px"
			>
				<NextImage
					className="rounded"
					src={image || "/logo_secondary_gradient_double.png"}
					alt={`${name} banner`}
					layout="fill"
					objectFit="cover"
				/>
			</Center>

			<Stack flex={1} justify="space-between" p="25px">
				<Heading size="md">{name}</Heading>
				{authors?.map((author) => (
					<HStack key={author?.id} spacing="20px">
						<Circle
							size="40px"
							backgroundImage={author?.avatar_url}
							backgroundPosition="center"
							backgroundSize="cover"
							backgroundRepeat="no-repeat"
						/>
						<Text>{author?.name}</Text>
					</HStack>
				))}
			</Stack>
		</Stack>
	);
}
