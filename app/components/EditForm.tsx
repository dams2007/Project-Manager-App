"use client";

import React, { FormEventHandler, useState } from "react";
import Image from "next/image";
import chevronDown from "@/public/chevron-down-icon.svg";
import { Button } from "@/app/components/button";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/contexts/ToastContext";
import { ProjectStatus } from "@/app/types/ProjectStatus";
import {
	statusDisplayMap,
	reverseStatusDisplayMap,
} from "@/app/constants/statusMap";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

// Define the props interface for the form component
interface EditFormProps {
	project: ProjectResponse;
	projectId: string;
}

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the EditForm component
const EditForm = ({ project, projectId }: EditFormProps) => {
	// Initialize router and toast context hooks
	const router = useRouter();
	const { showToast } = useToast();

	// Map the project status to display text
	const statusDisplayText = statusDisplayMap[project.status as ProjectStatus];

	// Define state variables for the form inputs
	const [ProjectNameToEdit, setProjectNameToEdit] = useState<string>(
		project.title
	);
	const [ProjectDescToEdit, setProjectDescToEdit] = useState<string>(
		project.description
	);
	const [ProjectStatusToEdit, setProjectStatusToEdit] =
		useState<string>(statusDisplayText);

	// Define the form submission handler
	const handleEditProject: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		// Convert status to a valid format for sending the request
		const statusConverted = reverseStatusDisplayMap[
			ProjectStatusToEdit
		] as ProjectStatus;

		// Create the project data object
		const projectData: ProjectResponse = {
			id: project.id,
			title: ProjectNameToEdit,
			description: ProjectDescToEdit,
			status: statusConverted,
			createdAt: null,
		};

		// Send a PUT request to update the project and handle the response with a toast
		const updatePromise = fetch(`${baseURL}/api/projects/${projectId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(projectData),
		}).then((res) => {
			if (!res.ok) {
				throw new Error("Failed to update project");
			}
			return res.json();
		});

		showToast(updatePromise, {
			loading: "Updating project...",
			success: () => "Update successful!!!",
			error: "Error updating project",
		});

		// Handle the response and navigate to the home page
		try {
			await updatePromise;
			router.push("/");
			router.refresh();
		} catch (err) {
			console.error("Error:", err);
		}
	};

	// Return the form JSX
	return (
		<form onSubmit={handleEditProject} className="max-w-sm ml-12">
			{/* Project Name Input */}
			<div className="mb-5">
				<label
					htmlFor="project_name"
					className="block mb-2 text-sm font-medium text-gray-500"
				>
					Name
				</label>
				<input
					value={ProjectNameToEdit}
					onChange={(e) => setProjectNameToEdit(e.target.value)}
					type="text"
					id="project_name"
					className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					placeholder="Project name"
					required
				/>
			</div>

			{/* Project Description Input */}
			<div className="mb-5">
				<label
					htmlFor="description"
					className="block mb-2 text-sm font-medium text-gray-500"
				>
					Description
				</label>
				<input
					value={ProjectDescToEdit}
					onChange={(e) => setProjectDescToEdit(e.target.value)}
					type="text"
					className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
					required
				/>
			</div>

			{/* Project Status Input */}
			<div className="mb-5">
				<label
					htmlFor="status"
					className="block mb-2 text-sm font-medium text-gray-500"
				>
					Status
				</label>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="border-gray-300 text-gray-600">
							{ProjectStatusToEdit}
							<Image
								className="ml-3"
								src={chevronDown}
								alt="Chevron down Icon"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" side="right" align="start">
						<DropdownMenuRadioGroup
							value={statusDisplayText}
							onValueChange={setProjectStatusToEdit}
						>
							<DropdownMenuRadioItem value="Done">
								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-emerald-500 p-1"></div>
									<p className="text-primary-color">Done</p>
								</div>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="Pending">
								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-orange-500 p-1"></div>
									<p className="text-primary-color">Pending</p>
								</div>
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="In Progress">
								<div className="mt-1 flex items-center gap-x-1.5">
									<div className="flex-none rounded-full bg-yellow-400 p-1"></div>
									<p className="text-primary-color">In Progress</p>
								</div>
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Submit Button */}
			<Button
				type="submit"
				className="self-center mr-12 rounded-md bg-secondary-color px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
			>
				SAVE
			</Button>
		</form>
	);
};

// Export the EditForm component
export default EditForm;
