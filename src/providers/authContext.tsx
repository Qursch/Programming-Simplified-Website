import axios from "axios";
import { API_URL } from "config";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "types";
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 5000;

const AuthContext = createContext({
	user: null,
	isAuthenticated: false,
	isLoading: false,
	logout: () => {},
});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			axios
				.get("/users/profile")
				.then(({ data }) => {
					setUser(data);
					setIsAuthenticated(true);
					setIsLoading(false);
				})
				.catch(() => {});
		} else setIsLoading(false);
	}, []);

	const logout = () => {
		router.push("/");
		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
		setIsLoading(true);
	};

	const context: {
		user: User;
		isAuthenticated: boolean;
		isLoading: boolean;
		logout: () => void;
	} = { user, isAuthenticated, isLoading, logout };
	return (
		<AuthContext.Provider value={context}>{children}</AuthContext.Provider>
	);
}

export function useAuth(required = false) {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	useEffect(() => {
		if (required && !context.isAuthenticated && !context.isLoading) {
			window.location.href = "/login";
		}
	}, [context.isLoading]);

	return context;
}

export default AuthContext;
