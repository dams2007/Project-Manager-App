import React from "react";
import Navbar from "@/app/components/navbar";
import ProjectList from "@/app/components/ProjectList";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import ErrorState from "./components/ErrorState";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getAllProjects = async (): Promise<ProjectResponse[]> => {
	try {
		const res = await fetch(`${baseURL}/api/projects/`, {
			cache: "no-store",
		});
		if (!res.ok) {
			throw new Error("Failed to fetch projects");
		}
		const projects = await res.json();
		return projects.data;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

const Home = async () => {
	let projects: ProjectResponse[] = [];
	let error: string | null = null;

	try {
		projects = await getAllProjects();
	} catch (err) {
		error = "Failed to load projects. Please try again later.";
	}

	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			{error ? (
				<ErrorState errorMessage={error} />
			) : (
				<ProjectList projects={projects} />
			)}
		</main>
	);
};

export default Home;
