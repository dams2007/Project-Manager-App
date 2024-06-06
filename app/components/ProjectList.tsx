import React from "react";
import ProjectItem from "@/app/components/ProjectItem";
import Loading from "@/app/components/Loading";
import EmptyState from "@/app/components/EmptyState";
import { ProjectResponse } from "@/app/types/ProjectResponse";

// Define the props interface for the component
interface ProjectListProps {
	projects: ProjectResponse[];
}

// Define the ProjectList component
const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
	// If projects are not yet loaded, display the loading component
	if (!projects) {
		return <Loading />;
	}

	// If there are no projects, display the empty state component
	if (projects.length === 0) {
		return <EmptyState />;
	}

	// Return the component JSX
	return (
		<div className="w-full relative overflow-x-auto">
			<div className="mx-12 mt-6 mb-1">
				{/* Header for the project list */}
				<ul className="w-full text-sm text-left rtl:text-right border-spacing-y-2 border-separate list-none">
					<li className="text-primary-color h-8 flex items-center justify-between">
						<div className="px-6 text-sm font-normal w-1/3">Title</div>
						<div className="flex items-center justify-end w-1/2 gap-6 ">
							<div className="px-6 text-sm font-normal w-1/3">Status</div>
							<div className="px-6 text-sm font-normal w-1/3">Date Created</div>
						</div>
					</li>
					{/* Render a ProjectItem for each project in the projects array */}
					{projects.map((project) => (
						<ProjectItem key={project.id} project={project} />
					))}
				</ul>
			</div>
		</div>
	);
};

// Export the ProjectList component
export default ProjectList;
