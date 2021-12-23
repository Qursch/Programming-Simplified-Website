import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Center,
	Divider,
	Flex,
	FormControl,
	FormErrorMessage,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	SimpleGrid,
	Stack,
	Text,
	useToast,
	VisuallyHidden,
	VStack,
} from "@chakra-ui/react";
import Button from "@components/button";
import NextChakraLink from "@components/nextChakraLink";
import { setCookie } from "@lib/cookie";
import { rounded } from "@styles/theme";
import { FaDiscord, FaGithub, FaGoogle } from "react-icons/fa";
import { login } from "api/index";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function Login() {
	const toast = useToast();
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	return (
		<Center minH="100vh">
			<Formik
				initialValues={initialValues}
				validationSchema={LoginSchema}
				onSubmit={async (values) => {
					// @ts-ignore
					// await createApplication({ id: user?.id, ...values })
					await login(values)
						.then((res) => {
							setCookie("token", res.data.token);
							localStorage.setItem("token", res.data.token);
							location.href = "/dashboard";
						})
						.catch((reason) => {
							toast({
								title: "Error",
								description:
									reason.response?.data?.message ??
									"Generic error. Refresh and try again. If the issue persists please contact owner",
								status: "error",
								duration: 5000,
								isClosable: true,
							});
						});
				}}
			>
				{({ isSubmitting }) => (
					<Form style={{ width: "100%" }}>
						<VStack align="center" justify="center">
							<Card>
								<Heading textAlign="center">Login</Heading>
								<Stack>
									<Box>
										<Text>Email: </Text>

										<Field name="email">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.email &&
														form.touched.email
													}
												>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															children={
																<EmailIcon />
															}
														/>
														<Input
															{...field}
															type="email"
															id="email"
															placeholder="email@domain.com"
														/>
													</InputGroup>
													<FormErrorMessage>
														{form.errors.email}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
									</Box>

									<Box>
										<Text>Password: </Text>

										<Field name="password">
											{({ field, form }) => (
												<FormControl
													isInvalid={
														form.errors.password &&
														form.touched.password
													}
												>
													<InputGroup>
														<InputLeftElement
															pointerEvents="none"
															children={
																<LockIcon />
															}
														/>
														<Input
															{...field}
															pr="50px"
															id="password"
															type={
																show
																	? "text"
																	: "password"
															}
															placeholder="********"
														/>
														<InputRightElement>
															<Center
																aria-label="toggle password"
																_hover={{
																	cursor: "pointer",
																}}
																onClick={
																	handleClick
																}
															>
																{show ? (
																	<ViewOffIcon />
																) : (
																	<ViewIcon />
																)}
															</Center>
														</InputRightElement>
													</InputGroup>
													<FormErrorMessage>
														{form.errors.password}
													</FormErrorMessage>
												</FormControl>
											)}
										</Field>
										<NextChakraLink
											href="/forgot"
											color="primary"
										>
											Forgot password?
										</NextChakraLink>
									</Box>
								</Stack>
								<Button
									type="submit"
									isLoading={isSubmitting}
									disabled={isSubmitting}
									bg="gradient"
									border="none"
									_hover={{ transform: "scale(1.05)" }}
									w="100%"
								>
									Login
								</Button>
								<Flex align="center" color="gray.300">
									<Box flex="1">
										<Divider borderColor="currentcolor" />
									</Box>
									<Text
										as="span"
										px="3"
										color="gray.600"
										fontWeight="medium"
									>
										OR
									</Text>
									<Box flex="1">
										<Divider borderColor="currentcolor" />
									</Box>
								</Flex>
								<Heading textAlign="center">
									Coming Soon
								</Heading>
								<SimpleGrid mt="6" columns={3} spacing="3">
									<Button
										color="white"
										variant="outline"
										rounded="md"
										isDisabled
									>
										<VisuallyHidden>
											Login with Discord
										</VisuallyHidden>
										<FaDiscord />
									</Button>
									<Button
										color="white"
										variant="outline"
										rounded="md"
										isDisabled
									>
										<VisuallyHidden>
											Login with Google
										</VisuallyHidden>
										<FaGoogle />
									</Button>
									<Button
										color="white"
										variant="outline"
										rounded="md"
										isDisabled
									>
										<VisuallyHidden>
											Login with Github
										</VisuallyHidden>
										<FaGithub />
									</Button>
								</SimpleGrid>

								<Text textAlign="center">
									Don't have an account?{" "}
									<NextChakraLink
										href="/register"
										color="primary"
									>
										Register
									</NextChakraLink>
								</Text>
							</Card>
						</VStack>
					</Form>
				)}
			</Formik>
		</Center>
	);
}

const initialValues = {
	email: "",
	password: "",
};

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Email is not valid").required("Email Required"),
	password: Yup.string()
		// .min(6, "Password must be at least 6 characters")
		.required("Password Required"),
});

export function Card({ children }) {
	return (
		<Stack
			spacing="40px"
			maxW="400px"
			w="100%"
			boxSizing="border-box"
			p="25px"
			bg="dashboard.input"
			rounded={rounded}
			boxShadow="xl"
			transition="all ease-in-out 0.2s"
		>
			{children}
		</Stack>
	);
}
