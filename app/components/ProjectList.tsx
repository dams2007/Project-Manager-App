import React from "react";
import ProjectItem from "@/app/components/ProjectItem";
import Loading from "@/app/components/Loading";
import EmptyState from "@/app/components/EmptyState";
import { ProjectData } from "@/app/types/ProjectData";

interface ProjectListProps {
	projects: ProjectData[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
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
