import React from "react";
import databaseIcon from "../../public/database-icon.svg";
import { Button } from "@/app/components/button";
import Image from "next/image";
import Link from "next/link";
import { ProjectData } from "../types/ProjectData";
import { ConvertDate } from "@/lib/dateConverter";

interface ProjectItemProps {
	project: ProjectData;
}

const ProjectItem = ({ project }: ProjectItemProps) => {
	return (
		<tr className="bg-white border-b light:bg-gray-800 light:border-gray-700 hover:bg-gray-50 light:hover:bg-gray-600 h-14">
			<td
				scope="row"
				className=" rounded-l-lg rounded-b-lg px-6 py-4 font-medium text-primary-color whitespace-nowrap light:text-white"
			>
				<div className="flex items-center gap-3">
					<Image priority src={databaseIcon} alt="Database Icon" />
					{project.title}
				</div>
			</td>
			<td scope="row" className="text-primary-color px-6 py-4">
				<div className="sm:flex sm:flex-col sm:items-start">
					<div className="mt-1 flex items-center gap-x-1.5">
						<div className="flex-none rounded-full bg-emerald-500/20 p-1">
							<div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
						</div>
						<p className="text-primary-color">{project.status}</p>
					</div>
				</div>
			</td>
			<td scope="row" className="text-primary-color  rounded-r-lg px-6 py-4">
				{ConvertDate(project.createdAt as string)}
			</td>
			<td className="text-primary-color rounded-r-lg px-6 py-4">
				<Button className="self-center mr-12 rounded-md bg-secondary-color px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					<Link href={`/editProject/${project.id}`}>Edit</Link>
				</Button>
			</td>
		</tr>
	);
};

export default ProjectItem;
