import { newProject } from "@/app/types/newProject";
import { ProjectData } from "@/app/types/ProjectData";

const baseURL = "http://localhost:3001";

export const getAllProjects = async (): Promise<ProjectData[]> => {
	const res = await fetch(`${baseURL}/api/projects/`, {
		cache: "no-store",
	});
	const projects = await res.json();
	return projects.data;
};

export const getProject = async (id: string): Promise<ProjectData> => {
	const idProject: string = id;

	const res = await fetch(`${baseURL}/api/projects/${id}`, {
		cache: "no-store",
	});

	if (!res.ok) {
		throw new Error("Network response was not ok");
	}
	const project = await res.json();
	return project;
};

export const addProject = async (project: newProject): Promise<Response> => {
	const res = await fetch(`${baseURL}/api/projects`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
	return res;
};

export const editProjects = async (project: ProjectData): Promise<Response> => {
	const res = await fetch(`${baseURL}/api/projects/${project.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(project),
	});
	return res;
};

export const deleteProject = async (id: string): Promise<void> => {
	await fetch(`${baseURL}/products/${id}`, {
		method: "DELETE",
	});
};
