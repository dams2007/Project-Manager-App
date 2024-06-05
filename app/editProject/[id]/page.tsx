"use client";
import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import leftarrowIcon from "../../../public/left-arrow-icon.svg";
import { ProjectData } from "@/app/types/ProjectData";
import Link from "next/link";
import Form from "@/app/components/Form";
import Loading from "@/app/components/Loading";
import useSWR from "swr";

const baseURL = "http://localhost:3001";
const fetcher = (...args: Parameters<typeof fetch>) =>
	fetch(...args).then((res) => res.json());

function EditProject({ params }: { params: { id: string } }) {
	const id = params.id as string;
	const request = `${baseURL}/api/projects/${id}`;
	const { data, error, isLoading, mutate } = useSWR(request, fetcher);

	const handleUpdate = async (updatedProject: ProjectData) => {
		const res = await fetch(`${baseURL}/api/projects/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProject),
		});

		if (res.ok) {
			const updatedData = await res.json();
			mutate(updatedData, false); // Update the local data and revalidate
		} else {
			throw new Error("Failed to update project");
		}
	};

	if (isLoading) return <Loading />;
	if (error) return <div>Failed to load</div>;

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
			<Suspense fallback={<Loading />}>
				{<Form project={data} onUpdate={handleUpdate} />}
			</Suspense>
		</div>
	);
}

export default EditProject;
