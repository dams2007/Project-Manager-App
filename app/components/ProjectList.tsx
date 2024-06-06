"use client";
import React, { useEffect, useState } from "react";
import ProjectItem from "@/app/components/ProjectItem";
import Loading from "@/app/components/Loading";
import EmptyState from "@/app/components/EmptyState";
import { ProjectData } from "@/app/types/ProjectData";
import { usePathname } from "next/navigation";
import { useToast } from "@/app/contexts/ToastContext";

const baseURL = "http://localhost:3001";
const getAllProjects = async (): Promise<ProjectData[]> => {
	const res = await fetch(`${baseURL}/api/projects/`, {
		cache: "no-store",
	});
	const projects = await res.json();
	return projects.data;
};

const ProjectList = () => {
	const { showToast } = useToast();
	const [projects, setProjects] = useState<ProjectData[] | null>(null);
	const pathname = usePathname(); // Get the current pathname

	const fetchProjects = async () => {
		try {
			const projectData = await getAllProjects();
			setProjects(projectData);
		} catch (error) {
			console.error("Error fetching project data:", error);
			const rejectedPromise = Promise.reject(error);

			showToast(rejectedPromise, {
				loading: "Looking for projects...",
				success: () => "",
				error: "Error fetching projects",
			});
		}
	};

	useEffect(() => {
		fetchProjects(); // Re-fetch when pathname changes
	}, [pathname]);

	if (!projects) {
		return <Loading />;
	}

	if (projects.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className="w-full relative overflow-x-auto">
			<div className="mx-12 mt-6 mb-1">
				<ul className="w-full text-sm text-left rtl:text-right border-spacing-y-2 border-separate list-none">
					<li className="text-primary-color h-8 flex items-center justify-between">
						<div className="px-6 text-sm font-normal w-1/3">Title</div>
						<div className="flex items-center justify-end w-1/2 gap-6 ">
							<div className="px-6 text-sm font-normal w-1/3">Status</div>
							<div className="px-6 text-sm font-normal w-1/3">Date Created</div>
						</div>
					</li>
					{projects.map((project) => (
						<ProjectItem key={project.id} project={project} />
					))}
				</ul>
			</div>
		</div>
	);
};

export default ProjectList;
