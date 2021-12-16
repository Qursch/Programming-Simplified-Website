import {
	Center,
	chakra,
	Circle,
	Heading,
	HStack,
	IconButton,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	SkeletonText,
	Stack,
	Text,
} from "@chakra-ui/react";
import { setCookie } from "@lib/cookie";
import { useAuth } from "@providers/authContext";
import { rounded, themes } from "@styles/theme";
import { FaCheck } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";

export default function UserProfile({ theme, setTheme }) {
	const { user, isAuthenticated } = useAuth({ required: true });

	const CLogOut = chakra(RiLogoutBoxRLine);

	function ColorPicker({ color, text }) {
		return (
			<HStack
				justify="space-between"
				bg={theme == text && color}
				p="10px"
				rounded={rounded}
				_hover={
					theme == text
						? { cursor: "pointer" }
						: {
								transition: "all 0.3s ease",
								background: "rgba(255, 255, 255, 0.1)",
								cursor: "pointer",
						  }
				}
				onClick={() => {
					setTheme(text);
					setCookie("theme", text, 365);
				}}
			>
				<HStack>
					<Circle
						outline={theme == text && "solid black 2px"}
						// boxShadow={`0px 0px 6px 1px ${color}`}
						boxShadow={`rgb(255 255 255 / 40%) 0px 0px 4px 0px, rgb(${
							hexToRgb(color)?.r
						} ${hexToRgb(color)?.g} ${
							hexToRgb(color)?.b
						} / 20%) 0px 0px 0px 4px`}
						bg={theme == text ? "transparent" : color}
						size="20px"
					/>
					<Text style={{ color: theme == text ? "black" : "white" }}>
						{text.charAt(0).toUpperCase() + text.slice(1)}
					</Text>
				</HStack>
				<FaCheck
					color="black"
					style={{ display: theme == text ? "block" : "none" }}
				/>
			</HStack>
		);
	}

	function hexToRgb(hex) {
		// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function (_, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result
			? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16),
			  }
			: null;
	}

	return (
		<HStack
			px="2"
			borderTopWidth="1px"
			p="4"
			w="100%"
			justify="space-evenly"
		>
			{/* <Avatar size="sm" name={user.name} src={user.image} /> */}

			<SkeletonText
				noOfLines={1}
				as={Center}
				minW="50px"
				isLoaded={isAuthenticated}
			>
				<Heading fontSize="sm">{user?.firstName ?? "Soph"}</Heading>
			</SkeletonText>

			<Popover>
				<PopoverTrigger>
					<Circle
						_hover={{
							cursor: "pointer",
						}}
						outline="solid black 2px"
						// boxShadow={`0px 0px 6px 1px ${color}`}
						boxShadow={`rgb(255 255 255 / 40%) 0px 0px 4px 0px, rgb(${
							hexToRgb(themes[theme].primary)?.r
						} ${hexToRgb(themes[theme].primary)?.g} ${
							hexToRgb(themes[theme].primary)?.b
						} / 20%) 0px 0px 0px 4px`}
						bg={themes[theme].primary}
						size="20px"
					/>
				</PopoverTrigger>

				<PopoverContent
					mb="10px"
					bg="#070510"
					w="200px"
					_focus={{ boxShadow: "none", outline: "0" }}
					_active={{ boxShadow: "none" }}
					rounded={rounded}
				>
					<PopoverArrow bg="#070510" />
					<PopoverBody>
						<Stack spacing={0}>
							{Object.keys(themes).map((themeObj) => {
								const color = themes[themeObj].primary;
								return (
									<ColorPicker
										text={themeObj}
										color={color}
										key={themeObj}
									/>
								);
							})}
							{/* TODO: Add slider so instead of the background static it will slide to the background color */}
							{/* 
								<Box
									pos="absolute"
									rounded={rounded}
									bg="#ff3366"
									height="12%"
									w="88%"
								/> 
							*/}
						</Stack>
					</PopoverBody>
				</PopoverContent>
			</Popover>

			<IconButton
				aria-label="sign out"
				background="secondary"
				_hover={{ background: "background" }}
				boxShadow="lg"
				rounded={rounded}
				icon={<CLogOut />}
				onClick={() => {}}
			/>
		</HStack>
	);
}
