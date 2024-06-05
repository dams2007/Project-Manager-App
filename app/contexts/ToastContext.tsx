"use client";
import { createContext, useContext, ReactNode } from "react";
import { toast } from "sonner";

interface ToastContextProps {
	showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const showToast = (message: string) => {
		toast.success(message);
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
