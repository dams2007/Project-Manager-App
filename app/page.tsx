import React from "react";
import { Navbar } from "@/app/components//navbar";
import ProjectList from "@/app/components//ProjectList";

export default function Home() {
	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			<ProjectList />
		</main>
	);
}
