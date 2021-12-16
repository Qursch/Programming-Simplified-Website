import { HStack, Icon, LinkProps, Text } from "@chakra-ui/react";
import NextChakraLink from "@components/nextChakraLink";
import { rounded } from "@styles/theme";
import { useRouter } from "next/router";

interface NavLinkProps extends LinkProps {
	isActive?: boolean;
	label: string;
	icon: React.ElementType;
}

export default function NavLink(props: NavLinkProps) {
	const { icon, isActive, label, href, ...rest } = props;
	const router = useRouter();

	return (
		<NextChakraLink
			bg={router.asPath === props.href ? "primary" : ""}
			display="block"
			py="2"
			px="3"
			rounded={rounded}
			transition="all 0.3s"
			fontWeight="medium"
			fontSize="sm"
			userSelect="none"
			aria-current={isActive ? "page" : undefined}
			color={router.asPath === props.href ? "" : "gray.500"}
			_hover={{
				bg: "primary",
				color: "white",
			}}
			href={href}
			// _activeLink={{
			// 	bg: router.asPath === props.href ? "blue.200" : "",
			// 	color: "inherit",
			// }}
			{...rest}
		>
			<HStack spacing="4">
				<Icon as={icon} fontSize="lg" opacity={0.64} />
				<Text as="span">{label}</Text>
			</HStack>
		</NextChakraLink>
	);
}
