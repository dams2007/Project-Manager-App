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
