import {
	CircularProgress,
	Drawer,
	DrawerContent,
	HStack,
	IconButton,
	Link,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";
import { Lesson } from "types";

export default function LessonsMenu({
	lessons,
	userLessons,
}: {
	lessons: Lesson[];
	userLessons: any[];
}) {
	const { isOpen, onClose, onOpen } = useDisclosure();

	return (
		<>
			<IconButton
				onClick={onOpen}
				variant="unstyled"
				display="flex"
				cursor="pointer"
				aria-label="Menu"
				icon={<HiOutlineMenu fontSize="2rem" color="black" />}
				bg="primary"
				position="sticky"
				top={0}
				_active={{}}
				_focus={{}}
				zIndex={100}
				rounded={0}
			/>
			<Drawer
				size="xl"
				isOpen={isOpen}
				blockScrollOnMount={false}
				onClose={onClose}
				placement="left"
			>
				<DrawerContent
					bg="#1c1c1c"
					shadow="none"
					position="relative"
					maxW="64"
					overflowX="hidden"
					overflowY="scroll"
					
				>
					<Menu lessons={lessons} userLessons={userLessons} />
					{/* 
					<DrawerCloseButton
						bg="primary"
						_hover={{ bg: "background" }}
						_active={{}}
						_focus={{}}
						rounded="0"
						position="absolute"
						boxSize={10}
						color="white"
						right="-10"
						top="0"
					/> */}
				</DrawerContent>
			</Drawer>
		</>
	);
}

function Menu({
	lessons,
	userLessons,
}: {
	lessons: Lesson[];
	userLessons: any[];
}) {
	const router = useRouter();

	return (
		<Stack spacing={0}>
			{lessons?.map((lesson) => (
				<Link
					key={lesson.id}
					href={`/dashboard/courses/${router.query.course}/lessons/${lesson?.id}`}
					color="white"
					fontSize="sm"
					fontWeight="bold"
					_hover={{ color: "primary", bg: "rgb(0 0 0 / 50%)" }}
					py={4}
					px={2}
				>
					<HStack>
						<CircularProgress
							size={6}
							thickness={14}
							value={userLessons?.[lesson.id]?.progress * 100}
							color="primary"
						/>

						<Text
							color={
								// @ts-ignore
								router.query.lesson == lesson.id
									? "primary"
									: "inherit"
							}
						>
							{lesson?.name}
						</Text>
					</HStack>
				</Link>
			))}
		</Stack>
	);
}
