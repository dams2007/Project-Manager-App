"use client";

import { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";

// Define the interface for the toast context properties
interface ToastContextProps {
	showToast: <T>(
		promise: Promise<T>,
		messages: { loading: string; success: (data: T) => string; error: string }
	) => void;
}

// Create the toast context
const ToastContext = createContext<ToastContextProps | undefined>(undefined);

// Define the ToastProvider component
export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Define the showToast function
	const showToast = <T,>(
		promise: Promise<T>,
		messages: { loading: string; success: (data: T) => string; error: string }
	) => {
		// Use the toast library to show a toast for the promise
		toast.promise(promise, {
			loading: messages.loading,
			success: messages.success,
			error: messages.error,
		});
	};

	// Provide the toast context to children components
	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
		</ToastContext.Provider>
	);
};

// Custom hook to use the toast context
export const useToast = () => {
	// Get the context value
	const context = useContext(ToastContext);

	// Throw an error if the hook is used outside of a ToastProvider
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}

	// Return the context value
	return context;
};
