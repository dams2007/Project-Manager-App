import React, { Suspense } from "react";
import { Navbar } from "@/app/components//navbar";
import ProjectList from "@/app/components//ProjectList";
import Loading from "@/app/components//Loading";

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
