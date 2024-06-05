"use client";
import React, { useEffect, useState } from "react";
import ProjectItem from "@/app/components/ProjectItem";
import Loading from "@/app/components/Loading";
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

	return (
		<div className="w-full relative overflow-x-auto ">
			<div className="mx-12 mt-6 mb-1">
				<table className="w-full text-sm text-left rtl:text-right border-spacing-y-2 border-separate">
					<thead className="text-primary-color h-2">
						<tr>
							<th scope="col" className="px-6 text-sm font-normal">
								Title
							</th>
							<th scope="col" className="px-6 text-sm font-normal">
								Status
							</th>
							<th scope="col" className="px-6 text-sm font-normal">
								Date Created
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((project) => (
							<ProjectItem key={project.id} project={project} />
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProjectList;
