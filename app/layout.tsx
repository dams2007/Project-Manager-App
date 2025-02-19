import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/app/contexts/ToastContext";
import { Toaster } from "sonner";

const notosans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={notosans.className}>
				<ToastProvider>
					<Toaster position="top-center" richColors duration={3500} />
					{children}
				</ToastProvider>
			</body>
		</html>
	);
}
