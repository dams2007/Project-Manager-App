"use client";
import React, { FormEventHandler, useState } from "react";

import Image from "next/image";
import chevronDown from "../../public/chevron-down-icon.svg";
import { Button } from "@/app/components/button";
import { editProjects } from "../../lib/dataCall";
import { ProjectData } from "../types/ProjectData";
import { useRouter } from "next/navigation";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

interface FormProps {
	project: ProjectData;
}

const Form = ({ project }: FormProps) => {
	const router = useRouter();
	const [ProjectNameToEdit, setProjectNameToEdit] = useState<string>(
		project.title
	);
	const [ProjectDescToEdit, setProjectDescToEdit] = useState<string>(
		project.description
	);
	const [ProjectStatusToEdit, setProjectStatusToEdit] = useState<string>(
		project.status
	);

	const handleEditProject: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		const projectData: ProjectData = {
			id: project.id,
			title: ProjectNameToEdit,
			description: ProjectDescToEdit,
			status: ProjectStatusToEdit,
			createdAt: null,
		};

		editProjects(projectData)
			.then((res) => {
				if (res.status === 200) {
					return res.json();
				} else {
					return res.json().then((err) => {
						throw new Error(err.message || "Failed to edit project");
					});
				}
			})
			.then((updatedProject) => {
				router.push("/");
			})
			.catch((err) => {
				console.error("Error:", err);
			});
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
							value={ProjectStatusToEdit}
							onValueChange={setProjectStatusToEdit}
						>
							<DropdownMenuRadioItem value="DONE">Done</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="PENDING">
								Pending
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value="IN_PROGRESS">
								In Progress
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Button
				type="submit"
				className="self-center mr-12 rounded-md bg-secondary-color px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				SAVE
			</Button>
		</form>
	);
};

export default Form;
