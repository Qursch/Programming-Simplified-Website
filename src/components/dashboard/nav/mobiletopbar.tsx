import {
	Drawer,
	DrawerCloseButton,
	DrawerContent,
	DrawerOverlay,
	Flex,
	IconButton,
} from "@chakra-ui/react";
import { HiOutlineMenu } from "react-icons/hi";

import Logo from "./logo";
import Sidebar from "./sidebar";
import { useMobileMenuState } from "./usemobilemenustate";

export default function MobileTopBar({ theme, setTheme }) {
	const { isOpen, onClose, onOpen } = useMobileMenuState();
	return (
		<Flex
			align="center"
			justify="space-between"
			py="2"
			px="4"
			bg="secondary"
			display={{ base: "flex", md: "none" }}
			borderBottomWidth="1px"
			w="100%"
			mb={4}
		>
			<Logo />
			<IconButton
				onClick={onOpen}
				variant="unstyled"
				display="flex"
				cursor="pointer"
				aria-label="Menu"
				icon={<HiOutlineMenu fontSize="1.5rem" />}
			/>
			<Drawer
				size="xs"
				placement="left"
				isOpen={isOpen}
				blockScrollOnMount={false}
				onClose={onClose}
			>
				<DrawerOverlay />
				<DrawerContent
					bg="rgb(0 0 0 / 100%)"
					shadow="none"
					position="relative"
					maxW="64"
				>
					<Sidebar
						width="full"
						height="full"
						bg="rgb(0 0 0 / 100%)"
						border="0"
						theme={theme}
						setTheme={setTheme}
					/>
					<DrawerCloseButton
						bg="background"
						_hover={{ bg: "primary" }}
						rounded="0"
						position="absolute"
						color="white"
						right="-8"
						top="0"
					/>
				</DrawerContent>
			</Drawer>
		</Flex>
	);
}
