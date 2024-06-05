"use client";
import React, { useEffect, useState } from "react";
import ProjectItem from "@/app/components/ProjectItem";
import Loading from "@/app/components/Loading";
import { ProjectData } from "@/app/types/ProjectData";
import { usePathname } from "next/navigation";

const baseURL = "http://localhost:3001";
const getAllProjects = async (): Promise<ProjectData[]> => {
	const res = await fetch(`${baseURL}/api/projects/`, {
		cache: "no-store",
	});
	const projects = await res.json();
	return projects.data;
};

const ProjectList = () => {
	const [projects, setProjects] = useState<ProjectData[] | null>(null);
	const pathname = usePathname(); // Get the current pathname

	const fetchProjects = async () => {
		const projectData = await getAllProjects();
		setProjects(projectData);
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
