import {
	Box,
	Heading,
	HStack,
	Input,
	SkeletonText,
	Stack,
	Text,
} from "@chakra-ui/react";
import Layout from "@components/dashboard/layout";
import { useAuth } from "@providers/authContext";
import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";

if (typeof Highcharts === "object") {
	HighchartsExporting(Highcharts);
}

export default function Dashboard() {
	const { user } = useAuth();

	const options: Options = {
		navigation: { buttonOptions: { enabled: false } },
		credits: { enabled: false },
		chart: {
			type: "spline",
			backgroundColor: "transparent",
			margin: [50, 50, 50, 50],
			spacing: [0, 0, 0, 0],
			height: "100%",
		},
		title: { text: "" },
		subtitle: { text: "" },
		yAxis: {
			allowDecimals: false,
			lineWidth: 1,
			lineColor: "#ccc",
			gridLineColor: "#ccc",
			gridLineWidth: 1,

			tickWidth: 0,
			title: { text: "Hours" },
			labels: {
				enabled: true,
				style: {
					color: "#fff",
					fontFamily: "Gagalin",
					// fontSize: "18px",
				},
			},
		},
		xAxis: {
			lineWidth: 1,
			lineColor: "#fff",
			gridLineWidth: 0,
			reversed: true,
			tickWidth: 0,
			title: { text: "Days Ago" },
			labels: {
				enabled: true,
				style: {
					color: "#fff",
					fontFamily: "Segoe UI",
					// fontSize: "18px",
				},
			},
		},

		legend: {
			layout: "vertical",
			align: "right",
			verticalAlign: "middle",
			itemStyle: { color: "#fff" },
			itemHoverStyle: { color: "primary" },
		},

		plotOptions: {
			series: {
				marker: { enabled: false },
				// lineColor: theme.lineColor,
				lineWidth: 3.5,
			},
		},

		// credits: false,
		series: [
			// data
			// 	? {
			// 			name: username,
			// 			data,
			// 			color: chakra_theme.colors[theme_color][50],
			// 	  }
			// 	: {},
			// data2
			// 	? {
			// 			name: username2,
			// 			data: data2,
			// 			color: chakra_theme.colors[
			// 				theme_color === "red" ? "blue" : "red"
			// 			][50],
			// 	  }
			// 	: {},
			{
				type: "spline",
				name: "Hours Spent Total",
				data: [
					{ x: 1, y: 1.22 },
					{ x: 2, y: 2.19 },
					{ x: 3, y: 0.84 },
					{ x: 4, y: 3.98 },
					{ x: 5, y: 2.5 },
					{ x: 6, y: 3.12 },
					{ x: 7, y: 2.14 },
				],
				color: "#fff",
			},
		],
	};

	return (
		<>
			{true ? (
				<Layout></Layout>
			) : (
				<Layout>
					<HStack w="100%" justify="space-between" spacing={0}>
						<HStack spacing={4}>
							{/* <Center boxSize="64px" pos="relative">
								<SkeletonCircle
									isLoaded={status !== "loading"}
									size="64px"
								>
									<NextImage
										className="circle"
										src={
											user?.image
												? `${user.image}?size=64`
												: "/logo_primary.png"
										}
										alt={user?.name + " profile picture"}
										layout="fill"
										priority
									/>
								</SkeletonCircle>
							</Center> */}

							<Stack>
								<SkeletonText
									isLoaded={status != "loading"}
									noOfLines={1}
									w="fit-content"
								>
									<Heading as="h1" size="md">
										Welcome back,{" "}
										{user?.firstName || "Soph"}!
									</Heading>
								</SkeletonText>
								<SkeletonText
									isLoaded={status != "loading"}
									noOfLines={1}
									w="fit-content"
								>
									<Text>
										You're doing great this week, keep it
										up!
									</Text>
								</SkeletonText>
							</Stack>
						</HStack>
						<Input w="200px" />
					</HStack>
					<HStack>
						<Stack>
							<Heading>Statistics</Heading>
							<HStack maxW="1000px" w="100%">
								<Box
									w={{
										base: "250px",
										sm: "350px",
										md: "450px",
										lg: "550px",
										xl: "650px",
									}}
								>
									<HighchartsReact
										highcharts={Highcharts}
										options={options}
									/>
								</Box>
							</HStack>
						</Stack>
					</HStack>
				</Layout>
			)}
		</>
	);
}
