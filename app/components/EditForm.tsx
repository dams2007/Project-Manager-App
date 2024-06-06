"use client";
import React, { FormEventHandler, useState } from "react";
import Image from "next/image";
import chevronDown from "@/public/chevron-down-icon.svg";
import { Button } from "@/app/components/button";
import { ProjectData } from "@/app/types/ProjectData";
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

interface FormProps {
	project: ProjectData;
	onUpdate: (updatedProject: ProjectData) => Promise<void>;
}

const Form = ({ project, onUpdate }: FormProps) => {
	const router = useRouter();
	const { showToast } = useToast();

	const statusDisplayText = statusDisplayMap[project.status as ProjectStatus];

	const [ProjectNameToEdit, setProjectNameToEdit] = useState<string>(
		project.title
	);
	const [ProjectDescToEdit, setProjectDescToEdit] = useState<string>(
		project.description
	);
	const [ProjectStatusToEdit, setProjectStatusToEdit] =
		useState<string>(statusDisplayText);

	const handleEditProject: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();

		const statusConverted = reverseStatusDisplayMap[
			ProjectStatusToEdit
		] as ProjectStatus;

		const projectData: ProjectData = {
			id: project.id,
			title: ProjectNameToEdit,
			description: ProjectDescToEdit,
			status: statusConverted,
			createdAt: null,
		};

		const updatePromise = onUpdate(projectData);

		showToast(updatePromise, {
			loading: "Updating project...",
			success: () => "Update successful!!!",
			error: "Error updating project",
		});

		try {
			await updatePromise;
			router.push("/");
		} catch (err) {
			console.error("Error:", err);
		}
	};

	return (
		<form onSubmit={handleEditProject} className="max-w-sm ml-12">
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
			<Button
				type="submit"
				className="self-center mr-12 rounded-md bg-secondary-color px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-800"
			>
				SAVE
			</Button>
		</form>
	);
};

export default Form;
