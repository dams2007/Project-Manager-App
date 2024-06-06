import React from "react";
import Navbar from "@/app/components/navbar";
import ProjectList from "@/app/components/ProjectList";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import ErrorState from "./components/ErrorState";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to fetch all projects from the API
const getAllProjects = async (): Promise<ProjectResponse[]> => {
	try {
		// Send a GET request to fetch all projects
		const res = await fetch(`${baseURL}/api/projects/`, {
			cache: "no-store",
		});
		// Check if the response is OK
		if (!res.ok) {
			throw new Error("Failed to fetch projects");
		}
		// Parse the response JSON
		const projects = await res.json();
		return projects.data;
	} catch (error) {
		console.error("Error fetching projects:", error);
		throw error;
	}
};

// Define the Home component
const Home = async () => {
	let projects: ProjectResponse[] = [];
	let error: string | null = null;

	// Attempt to fetch all projects, and handle any errors
	try {
		projects = await getAllProjects();
	} catch (err) {
		error = "Failed to load projects. Please try again later.";
	}

	// Return the component JSX
	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			{/* Render the Navbar component */}
			<Navbar />
			{/* Render the ErrorState component if there is an error, otherwise render the ProjectList component */}
			{error ? (
				<ErrorState errorMessage={error} />
			) : (
				<ProjectList projects={projects} />
			)}
		</main>
	);
};

// Export the Home component
export default Home;
