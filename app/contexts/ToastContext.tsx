"use client";
import { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";

interface ToastContextProps {
	showToast: <T>(
		promise: Promise<T>,
		messages: { loading: string; success: (data: T) => string; error: string }
	) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const showToast = <T,>(
		promise: Promise<T>,
		messages: { loading: string; success: (data: T) => string; error: string }
	) => {
		toast.promise(promise, {
			loading: messages.loading,
			success: messages.success,
			error: messages.error,
		});
	};

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
		</ToastContext.Provider>
	);
};

export const useToast = () => {
	const context = useContext(ToastContext);
	if (context === undefined) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};
