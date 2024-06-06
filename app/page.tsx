import React from "react";
import Navbar from "@/app/components/navbar";
import ProjectList from "@/app/components/ProjectList";
import { ProjectResponse } from "@/app/types/ProjectResponse";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAllProjects = async (): Promise<ProjectResponse[]> => {
	const res = await fetch(`${baseURL}/api/projects/`, {
		cache: "no-store",
	});
	const projects = await res.json();
	return projects.data;
};

const Home = async () => {
	const projects = await getAllProjects();

	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			<ProjectList projects={projects} />
		</main>
	);
};

export default Home;
