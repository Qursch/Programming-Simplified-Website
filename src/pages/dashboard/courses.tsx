import {
	Center,
	Circle,
	Heading,
	HStack,
	SimpleGrid,
	Skeleton,
	Stack,
	Text,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { useAuth } from "@providers/authContext";
import { rounded, shadow } from "@styles/theme";
import { getCourses } from "api/notion";
import NextImage from "next/image";

export default function Courses({ courses }) {
	const { isAuthenticated } = useAuth();

	return (
		<Layout>
			<Center py={8}>
				<SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing="25px">
					{courses.map((course) => (
						<Skeleton
							key={course.id}
							isLoaded={isAuthenticated}
							rounded={rounded}
							shadow={shadow}
						>
							<NextChakraLink
								href={`/dashboard/courses/${course.id}`}
							>
								<CourseCard {...course} />
							</NextChakraLink>
						</Skeleton>
					))}
				</SimpleGrid>
			</Center>
		</Layout>
	);
}

export async function getStaticProps() {
	const courses = (await getCourses()).reverse();
	return {
		props: {
			courses,
		},
		revalidate: 60,
	};
}

function CourseCard({ name, authors, image }) {
	return (
		<Stack
			rounded={rounded}
			bg="secondary"
			maxW="300px"
			w="100%"
			h="100%"
			transition="all 0.3s"
			shadow={shadow}
			_hover={{
				backgroundColor: "rgb(0 0 0 / 30%)",
				cursor: "pointer",
			}}
		>
			<Center rounded={rounded} pos="relative" maxW="300px" h="200px">
				<NextImage
					className="rounded"
					src={image || "/logo_secondary.png"}
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
