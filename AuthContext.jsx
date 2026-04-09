import { useMemo, useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => localStorage.getItem("token") || "");

	const login = (nextToken) => {
		localStorage.setItem("token", nextToken);
		setToken(nextToken);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
	};

	const value = useMemo(
		() => ({
			token,
			isAuthenticated: Boolean(token),
			login,
			logout,
		}),
		[token]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
