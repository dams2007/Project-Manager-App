import { Navbar } from "./components/navbar/navbar";
import React, { Suspense } from "react";
import ProjectList from "./components/ProjectList";
import { ProjectData } from "./types/ProjectData";
import { getAllProjects } from "../lib/dataCall";
import Loading from "./components/Loading";

export default async function Home() {
	const projects = await getAllProjects();

	const Projects = async () => {
		const projectData = (await getAllProjects()) as ProjectData[];
		return <ProjectList projects={projects} />;
	};

	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			<Suspense fallback={<Loading />}>
				<Projects />
			</Suspense>
		</main>
	);
}
