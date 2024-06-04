import React from "react";
import { ProjectData } from "../types/ProjectData";
import ProjectItem from "./ProjectItem";

type ProjectListProps = {
	projects: ProjectData[];
};

export default async function ProjectList({ projects }: ProjectListProps) {
	return (
		<div className="w-full relative overflow-x-auto ">
			<div className="mx-12 mt-6 mb-1">
				<table className="w-full text-sm text-left rtl:text-right border-spacing-y-2 border-separate">
					<thead className="text-primary-color h-2">
						<tr>
							<th scope="col" className="px-6  text-sm font-normal">
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
}
