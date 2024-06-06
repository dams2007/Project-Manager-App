import React from "react";
import databaseIcon from "@/public/database-icon.svg";
import Image from "next/image";
import Link from "next/link";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import { ConvertDate } from "@/app/utils/dateConverter";
import { ProjectStatus } from "@/app/types/ProjectStatus";
import { statusDisplayMap, statusColorMap } from "@/app/constants/statusMap";

interface ProjectItemProps {
	project: ProjectResponse;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
	const statusColorClass = statusColorMap[project.status as ProjectStatus];
	const statusDisplayText = statusDisplayMap[project.status as ProjectStatus];
	return (
		<Link href={`/editProject/${project.id}`}>
			<li
				key={project.id}
				className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600 h-20 flex items-center m-3 rounded-lg justify-between"
			>
				<div className="px-6 py-4 font-medium text-primary-color whitespace-nowrap light:text-white flex items-center gap-3 w-1/3">
					<Image priority src={databaseIcon} alt="Database Icon" />
					{project.title}
				</div>
				<div className="flex items-center justify-end w-1/2 gap-6">
					<div className="text-primary-color px-6 py-4 w-1/3">
						<div className="sm:flex sm:flex-col sm:items-start">
							<div className="flex items-center gap-x-1.5">
								<div
									className={`flex-none rounded-full ${statusColorClass} p-1`}
								></div>
								<p className="text-primary-color">{statusDisplayText}</p>
							</div>
						</div>
					</div>
					<div className="text-primary-color px-6 py-4 w-1/3">
						{ConvertDate(project.createdAt as string)}
					</div>
				</div>
			</li>
		</Link>
	);
};

export default ProjectItem;
