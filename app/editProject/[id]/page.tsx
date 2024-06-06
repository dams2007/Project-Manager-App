import Image from "next/image";
import leftarrowIcon from "@/public/left-arrow-icon.svg";
import Link from "next/link";
import EditForm from "@/app/components/EditForm";
import { ProjectResponse } from "@/app/types/ProjectResponse";
import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import ErrorState from "@/app/components/ErrorState";

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define the props interface for the page component
interface PageProps {
	params: { id: string };
}

// Function to fetch project data from the API
async function fetchProject(id: string): Promise<ProjectResponse> {
	const res = await fetch(`${baseURL}/api/projects/${id}`, {
		cache: "no-store",
	});
	if (!res.ok) {
		throw new Error("Failed to fetch project");
	}
	return res.json();
}

// Define the default export function for the EditProject page
export default async function EditProject({ params }: PageProps) {
	// Extract the project ID from the parameters
	const id = params.id;
	let project: ProjectResponse;

	// Attempt to fetch the project data, and handle any errors
	try {
		project = await fetchProject(id);
	} catch (error) {
		return <ErrorState errorMessage={"Failed to fetch project"} />;
	}

	// Return the component JSX
	return (
		<div>
			{/* Header with a back link and title */}
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
			{/* Suspense component to handle the loading state */}
			<Suspense fallback={<Loading />}>
				<EditForm project={project} projectId={id} />
			</Suspense>
		</div>
	);
}
