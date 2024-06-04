import { Navbar } from "./components/navbar/navbar";
import React, { useState } from "react";
import ProjectList from "./components/ProjectList";
import { ProjectData } from "./types/ProjectData";
import { getAllProjects } from "../lib/dataCall";

export default async function Home() {
	const projects = await getAllProjects();

	return (
		<main className="bg-main-bg-color items-center lg:max-w-8xl h-screen">
			<Navbar />
			<ProjectList projects={projects} />
		</main>
	);
}
