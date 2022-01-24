import { useBreakpointValue, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";

export const useMobileMenuState = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();
	const isMobile = useBreakpointValue({ base: true, md: false });

	useEffect(() => {
		if (!isMobile) {
			onClose();
		}
	}, [isMobile, onClose]);

	return { isOpen, onClose, onOpen };
};
