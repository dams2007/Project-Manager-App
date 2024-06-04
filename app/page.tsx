import { Navbar } from "./components/navbar/navbar";
import React, { Suspense } from "react";
import ProjectList from "./components/ProjectList";
import Loading from "./components/Loading";

export default function Home() {
	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			<Suspense fallback={<Loading />}>
				<ProjectList />
			</Suspense>
		</main>
	);
}
