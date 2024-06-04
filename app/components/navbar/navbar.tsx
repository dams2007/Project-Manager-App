import React from "react";
import { Button } from "@/app/components/button";
import Link from "next/link";

export const Navbar = () => {
	return (
		<div
			className="h-20 bg-white flex space-evenly items-center"
			aria-label="Global"
		>
			<div className="flex lg:flex-1 h-9">
				<a href="#" className="ml-12">
					<span className="text-2xl">Lazuli Coding Test</span>
				</a>
			</div>
			<div className="ml-auto ">
				<Button className="self-center mr-12 rounded-md bg-secondary-color px-3.5 py-2.5 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
					<Link href="/addProject">Create New</Link>
				</Button>
			</div>
		</div>
	);
};
