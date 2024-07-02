"use server";

import { CreateProjectInput } from "@/app/types/CreateProjectInput";

const baseURL = process.env.SERVER_BASE_URL;

export const postProject = async (
	newProject: CreateProjectInput
): Promise<void> => {
	const response = await fetch(`${baseURL}/products`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newProject),
		cache: "no-store",
	});

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || "Failed to create project");
	}

	const data = await response.json();

	return data;
};

export async function updateProject(projectData: {
	id: string;
	[key: string]: any;
}) {
	try {
		const { id, createdAt, ...updateData } = projectData;

		// Check if the ID is provided
		if (!id) {
			throw new Error("ID is required");
		}

		// Send a PUT request to the external API to update product data by ID
		const res = await fetch(`${baseURL}/products/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
			cache: "no-store",
		});

		// Check if the response is OK
		if (!res.ok) {
			console.error("Network response was not ok", res.status, res.statusText);
			throw new Error("Network response was not ok");
		}

		// Parse the updated project data
		const updatedProject = await res.json();

		// Return the updated project data
		return updatedProject;
	} catch (error: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		console.error("Error occurred:", errorMessage);

		// Throw the error to be handled by the caller
		throw new Error(errorMessage);
	}
}
