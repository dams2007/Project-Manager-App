"use client";
import React, { FormEventHandler, useState } from "react";
import Image from "next/image";
import chevronDown from "@/public/chevron-down-icon.svg";
import { Button } from "@/app/components/button";
import { CreateProjectInput } from "@/app/types/CreateProjectInput";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/contexts/ToastContext";
import { ProjectStatus } from "@/app/types/ProjectStatus";
import { reverseStatusDisplayMap } from "@/app/constants/statusMap";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "@/app/components/dropdown-menu";

interface FormProps {
	onUpdate: (updatedProject: CreateProjectInput) => Promise<void>;
}

const AddForm = ({ onUpdate }: FormProps) => {
	const router = useRouter();
	const { showToast } = useToast();
	const [newProjectName, setNewProjectName] = useState<string>("");
	const [newProjectDesc, setNewProjectDesc] = useState<string>("");
	const [newProjectStatus, setNewProjectStatus] = useState<string>("");

	const handleSubmitNewProject: FormEventHandler<HTMLFormElement> = async (
		e
	) => {
		e.preventDefault();

		const statusConverted = reverseStatusDisplayMap[
			newProjectStatus
		] as ProjectStatus;

		const projectData: CreateProjectInput = {
			title: newProjectName,
			description: newProjectDesc,
			status: statusConverted,
		};

		const updatePromise = onUpdate(projectData);

		showToast(updatePromise, {
			loading: "Creating project...",
			success: () => "Project created!!!",
			error: "Failed to create project",
		});
		try {
			await updatePromise;
			router.push("/");
			router.refresh();
		} catch (err) {
			console.error("Error:", err);
		}
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
					placeholder="Give your project a name"
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
					placeholder="Summarize your project"
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
				Save
			</Button>
		</form>
	);
};

export default AddForm;
