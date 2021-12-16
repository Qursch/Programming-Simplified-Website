import axios from "axios";
import { API_URL } from "config";
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

	// @ts-ignore
	useEffect(async () => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			const { data } = await axios.get("/users/profile");
			setUser(data);
			setIsAuthenticated(true);
		}
		setIsLoading(false);
	}, []);

	const logout = () => {
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

export function useAuth(options = { required: false }) {
	const context = useContext(AuthContext);
	useEffect(() => {
		if (
			options.required &&
			!context.isAuthenticated &&
			!context.isLoading
		) {
			window.location.href = "/login";
		}
	}, [context.isLoading]);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

export default AuthContext;
