"use client";
import React, { FormEventHandler, useState } from "react";
import Image from "next/image";
import chevronDown from "../../public/chevron-down-icon.svg";
import { Button } from "@/app/components/button";
import { useRouter } from "next/navigation";
import { addProject } from "../../lib/dataCall";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";
import { newProject } from "../types/newProject";

export default function ProjectForm() {
	const router = useRouter();
	const [newProjectName, setNewProjectName] = useState<string>("");
	const [newProjectDesc, setNewProjectDesc] = useState<string>("");
	const [newProjectStatus, setNewProjectStatus] = useState<string>("");

	const handleSubmitNewProject: FormEventHandler<HTMLFormElement> = async (
		e
	) => {
		e.preventDefault();

		const projectData: newProject = {
			title: newProjectName,
			description: newProjectDesc,
			status: newProjectStatus,
		};

		await addProject(projectData)
			.then((res) => {
				console.log("Response received");
				if (res.status === 200) {
					return res.json();
				} else {
					throw new Error("Failed to add project");
				}
			})
			.then((newProject) => {
				console.log(newProject);
				router.replace("/");
			})
			.catch((err) => {
				console.error("Error:", err);
			});

		router.refresh();
	};

	return (
		<form onSubmit={handleSubmitNewProject} className="max-w-sm ml-12">
			<div className="mb-5">
				<label
					htmlFor="project_name"
					className="block mb-2 text-sm font-medium text-gray-500"
				>
					Name
				</label>
				<input
					value={newProjectName}
					onChange={(e) => setNewProjectName(e.target.value)}
					type="text"
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
					value={newProjectDesc}
					onChange={(e) => setNewProjectDesc(e.target.value)}
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
						<Button
							variant="outline"
							className=" border-gray-300 text-gray-600"
						>
							{newProjectStatus}
							<Image
								className="ml-3"
								src={chevronDown}
								alt="Chevron down Icon"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" side="right" align="start">
						<DropdownMenuRadioGroup
							value={newProjectStatus}
							onValueChange={setNewProjectStatus}
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
				Save
			</Button>
		</form>
	);
}
