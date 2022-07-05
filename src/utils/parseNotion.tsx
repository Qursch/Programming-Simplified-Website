import {
	Box,
	Checkbox,
	Divider,
	Heading,
	Image,
	ListItem,
	OrderedList,
	Text,
	UnorderedList,
	Alert,
} from "@chakra-ui/react";
import { hexToRgb } from "@components/dashboard/layout";
import NextChakraLink from "@components/nextChakraLink";
import { getCookie } from "@lib/cookie";
import { shadow, themes } from "@styles/theme";
import { cloneElement } from "react";
import { atomOneDark, CopyBlock } from "react-code-blocks";
import { FileObj } from "types";

export function parseText(text: any) {
	if (!text.plain_text?.length) {
		return <></>;
	}

	const textProps: Record<string, any> = {};
	if (text.annotations.bold) {
		textProps.fontWeight = "bold";
	}
	if (text.annotations.italic) {
		textProps.fontStyle = "italic";
	}
	if (text.annotations.strikethrough) {
		textProps.textDecoration = "line-through";
	}
	if (text.annotations.underline) {
		textProps.borderBottomStyle = "solid";
		textProps.borderBottomWidth = "thin";
		textProps.borderBottomColor = "initial";
	}
	if (text.annotations.code) {
		textProps.fontFamily = "monospace";
		textProps.p = "3px 8px";
		textProps.my = -1;
		textProps.color = "#edebff";
		textProps.fontSize = "1.25em";
		const themeCookie =
			(themes[getCookie("theme")] && getCookie("theme")) || "default";
		const rgb = hexToRgb(themes[themeCookie]?.primary);
		textProps.bg = `rgba(${rgb[0]} ${rgb[1]} ${rgb[2]}/ 20%)`;
		textProps.borderRadius = "md";
		textProps.shadow = shadow;
	}
	if (text.annotations.color !== "default") {
		textProps.color = text.annotations.color;
	}

	const plainText = replaceNewlines(text.plain_text);

	if (text.href && !/^[\s\n]+$/g.test(text.plain_text)) {
		return (
			<NextChakraLink
				href={text.href}
				{...textProps}
				color="primary"
				style={{ whiteSpace: "pre-line" }}
				isExternal
			>
				{plainText}
			</NextChakraLink>
		);
	} else if (Object.keys(textProps).length) {
		return (
			<Box as="span" {...textProps} style={{ whiteSpace: "pre-line" }}>
				{plainText}
			</Box>
		);
	} else {
		return plainText;
	}
}

function replaceNewlines(text: string): JSX.Element {
	if (!text.includes("\n") && !text.includes("\r")) return <>{text}</>;

	// >= 1 newline
	const elements: JSX.Element[] = [];

	for (const segment of text.split(/[\n\r]+/g)) {
		elements.push(<>{segment}</>);
		elements.push(<br />);
	}
	elements.pop();

	return <>{elements}</>;
}

export function parseBlock(block: any): JSX.Element {
	switch (block.type) {
		case "paragraph":
			return (
				<Text mt="15px">
					{block.paragraph.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</Text>
			);
		case "heading_1":
			return (
				<Heading as="h1" mt="40px">
					{block.heading_1.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</Heading>
			);
		case "heading_2":
			return (
				<Heading as="h2" pt={2} size="lg">
					{block.heading_2.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</Heading>
			);
		case "heading_3":
			return (
				<Heading as="h3" pt={1} size="md">
					{block.heading_3.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</Heading>
			);
		case "bulleted_list_item":
		case "numbered_list_item":
			return (
				<ListItem>
					{block[block.type].rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</ListItem>
			);
		case "to_do":
			return (
				<Checkbox defaultChecked={block.checked} disabled>
					{block.to_do.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "text_" + idx })
					)}
				</Checkbox>
			);
		case "divider":
			return <Divider borderColor="white" />;
		case "quote":
			return (
				<Box borderLeftColor="white" borderLeftWidth={3} pl={5}>
					{block.quote.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "quote_" + idx })
					)}
				</Box>
			);
		case "code":
			return (
				<Box
					mt="10px"
					_hover={{ cursor: "text" }}
					style={{ tabSize: 2 }}
				>
					<CopyBlock
						text={block.code.rich_text
							.map((block) => block.plain_text)
							.join(", ")}
						language={block.code.language}
						theme={atomOneDark}
						showLineNumbers
						wrapLines
					/>
				</Box>
			);
		//
		case "image":
			const imageFileType: string = block.image.type;
			const imageFile: FileObj = block.image[imageFileType];
			return (
				<Box>
					<Image
						src={imageFile.url}
						mt="10px"
						alt={
							block.image?.caption?.[0]?.plain_text ||
							"No alt text provided 😢"
						}
					/>
				</Box>
			);
		case "callout":
			return (
				<Alert status="warning" color="black" mt={5}>
					<Box pr={5}>
						<Text fontSize={30}>{block.callout.icon.emoji}</Text>
					</Box>
					{block.callout.rich_text.map((item: any, idx: number) =>
						cloneElement(parseText(item), { key: "quote_" + idx })
					)}
				</Alert>
			);
		case "video":
		case "file":
		case "pdf":
		case "table_of_contents":
		case "bookmark":
		case "breadcrumb":
		case "embed":
		case "child_page":
		case "child_database":
		case "toggle":
		default:
			return (
				<Text as="i" color="red">
					UNSUPPORTED
				</Text>
			);
	}
}

export function parsePage(page) {
	const elementList: JSX.Element[] = [];
	let orderedList: JSX.Element[] = [],
		unorderedList: JSX.Element[] = [];
	let cnt = 0;
	for (const block of page.blocks) {
		const element = parseBlock(block);
		if (block.type === "bulleted_list_item") {
			unorderedList.push(element);
			if (orderedList.length) {
				elementList.push(
					<OrderedList key={"block_" + cnt++} pl={6}>
						{orderedList.map((item, idx: number) =>
							cloneElement(item, { key: "ol_" + idx })
						)}
					</OrderedList>
				);
				orderedList = [];
			}
		} else if (block.type === "numbered_list_item") {
			orderedList.push(element);
			if (unorderedList.length) {
				elementList.push(
					<UnorderedList key={"block_" + cnt++} pl={6}>
						{unorderedList.map((item, idx: number) =>
							cloneElement(item, { key: "ul_" + idx })
						)}
					</UnorderedList>
				);
				unorderedList = [];
			}
		} else {
			if (orderedList.length) {
				elementList.push(
					<OrderedList key={"block_" + cnt++} pl={6}>
						{orderedList.map((item, idx: number) =>
							cloneElement(item, { key: "ol_" + idx })
						)}
					</OrderedList>
				);
				orderedList = [];
			}
			if (unorderedList.length) {
				elementList.push(
					<UnorderedList key={"block_" + cnt++} pl={6}>
						{unorderedList.map((item, idx: number) =>
							cloneElement(item, { key: "ul_" + idx })
						)}
					</UnorderedList>
				);
				unorderedList = [];
			}
			elementList.push(cloneElement(element, { key: "block_" + cnt++ }));
		}
	}
	if (orderedList.length) {
		elementList.push(
			<OrderedList key={"block_" + cnt++} pl={6}>
				{orderedList.map((item, idx: number) =>
					cloneElement(item, { key: "ol_" + idx })
				)}
			</OrderedList>
		);
	}
	if (unorderedList.length) {
		elementList.push(
			<UnorderedList key={"block_" + cnt++} pl={6}>
				{unorderedList.map((item, idx: number) =>
					cloneElement(item, { key: "ul_" + idx })
				)}
			</UnorderedList>
		);
	}
	return <>{elementList}</>;
}

export function getFile(block: any): FileObj {
	return block[block.type];
}
