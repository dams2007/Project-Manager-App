"use client";

import React from "react";
import Image from "next/image";
import leftarrowIcon from "@/public/left-arrow-icon.svg";
import AddForm from "@/app/components/AddForm";
import Link from "next/link";
import { CreateProjectInput } from "@/app/types/CreateProjectInput";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ProjectForm() {
	// Function to handle the creation of a new project
	const handleUpdate = async (updatedProject: CreateProjectInput) => {
		// Send a POST request to create a new project
		const res = await fetch(`${baseURL}/api/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProject),
		});

		// Check if the response is not OK and handle accordingly
		if (!res.ok) {
			throw new Error("Failed to create project");
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
