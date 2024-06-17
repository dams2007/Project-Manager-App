"use client";

import React from "react";
import Image from "next/image";
import leftarrowIcon from "@/public/left-arrow-icon.svg";
import AddForm from "@/app/components/AddForm";
import Link from "next/link";
import { CreateProjectInput } from "@/app/types/CreateProjectInput";
import { postProject } from "../action";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProjectForm() {
	const handleUpdate = async (
		updatedProject: CreateProjectInput
	): Promise<void> => {
		try {
			await postProject(updatedProject);
		} catch (error: unknown) {
			let errorMessage = "Something went wrong";
			if (error instanceof Error) {
				errorMessage = error.message;
				throw errorMessage;
			}
		}
	};

	return (
		<div>
			{/* Header with a back link and title */}
			<div
				className="h-20 bg-white flex space-evenly items-center"
				aria-label="Global"
			>
				<div className="flex h-9">
					<Link className="ml-12" href="/">
						<Image src={leftarrowIcon} alt="Back Icon" />
					</Link>
				</div>
				<div className="ml-7">
					<h1 className="text-black text-2xl font-medium">Item Details</h1>
				</div>
			</div>
			{/* AddForm component for adding a new project */}
			<AddForm onUpdate={handleUpdate} />
		</div>
	);
}
