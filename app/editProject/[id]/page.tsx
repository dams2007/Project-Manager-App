import Image from "next/image";
import leftarrowIcon from "../../../public/left-arrow-icon.svg";
import { getProject } from "../../../lib/dataCall";
import { ProjectData } from "@/app/types/ProjectData";
import Link from "next/link";
import Form from "@/app/components/Form";

async function EditProject({ params }: { params: { id: string } }) {
	const id = params.id as string;

	const projectData = (await getProject(id)) as ProjectData;

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
			<Form project={projectData} />
		</div>
	);
}

export default EditProject;
