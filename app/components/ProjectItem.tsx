import React from "react";
import databaseIcon from "@/public/database-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import { ConvertDate } from "@/app/utils/dateConverter";
import { ProjectStatus } from "@/app/types/ProjectStatus";
import { statusDisplayMap, statusColorMap } from "@/app/constants/statusMap";

// Define the props interface for the component
interface ProjectItemProps {
	project: ProjectResponse;
}

// Define the ProjectItem component
const ProjectItem = ({ project }: ProjectItemProps) => {
	// Retrieve the status color class and display text for the project status
	const statusColorClass = statusColorMap[project.status as ProjectStatus];
	const statusDisplayText = statusDisplayMap[project.status as ProjectStatus];

	// Return the component JSX
	return (
		<Link href={`/editProject/${project.id}`}>
			<li
				key={project.id}
				className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600 h-20 flex items-center m-3 rounded-lg justify-between"
			>
				{/* Project title and icon */}
				<div className="px-6 py-4 font-medium text-primary-color whitespace-nowrap light:text-white flex items-center gap-3">
					<Image priority src={databaseIcon} alt="Database Icon" />
					{project.title}
				</div>

				{/* Project status and creation date */}
				<div className="flex items-center  gap-5 ">
					<div className="text-primary-color px-6 py-4 w-40">
						<div className="sm:flex sm:flex-col sm:items-start">
							<div className="flex items-center gap-x-1.5">
								<div
									className={`flex-none rounded-full ${statusColorClass} p-1`}
								></div>
								<p className="text-primary-color">{statusDisplayText}</p>
							</div>
						</div>
					</div>
					<div className="text-primary-color px-6 py-4 w-44">
						{ConvertDate(project.createdAt as string)}
					</div>
				</div>
			</li>
		</Link>
	);
};

// Export the ProjectItem component
export default ProjectItem;
