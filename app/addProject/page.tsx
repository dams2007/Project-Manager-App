"use client";
import React from "react";
import Image from "next/image";
import leftarrowIcon from "@/public/left-arrow-icon.svg";
import AddForm from "@/app/components/AddForm";
import Link from "next/link";
import { CreateProjectInput } from "@/app/types/CreateProjectInput";

const baseURL = "http://localhost:3001";
export default function ProjectForm() {
	const handleUpdate = async (updatedProject: CreateProjectInput) => {
		const res = await fetch(`${baseURL}/api/projects`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProject),
		});

		if (res.ok) {
			const updatedData = await res.json();
		} else {
			throw new Error("Failed to update project");
		}
	};

	return (
		<div>
			<div
				className="h-20 bg-white flex space-evenly items-center"
				aria-label="Global"
			>
				<div className="flex h-9">
					<Link className="ml-12" href="/">
						<Image src={leftarrowIcon} alt="Database Icon" />
					</Link>
				</div>
				<div className="ml-7">
					<h1 className="text-black text-2xl font-medium">Item Details</h1>
				</div>
			</div>
			<AddForm onUpdate={handleUpdate} />
		</div>
	);
}
