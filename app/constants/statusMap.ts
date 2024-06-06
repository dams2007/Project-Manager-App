import { ProjectStatus } from "@/app/types/ProjectStatus";

export const statusDisplayMap: Record<ProjectStatus, string> = {
	DONE: "Done",
	IN_PROGRESS: "In Progress",
	PENDING: "Pending",
};

export const statusColorMap: Record<ProjectStatus, string> = {
	DONE: "bg-emerald-500",
	IN_PROGRESS: "bg-yellow-400",
	PENDING: "bg-orange-500",
};

export const reverseStatusDisplayMap = Object.fromEntries(
	Object.entries(statusDisplayMap).map(([key, value]) => [value, key])
);
