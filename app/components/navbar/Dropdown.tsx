"use client";
import React from "react";

type buttonProps = {
	text: string;
	url: string;
};

const Dropdown = ({ text, url }: buttonProps) => {
	return (
		<div>
			<button
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Button
			</button>

			<div
				id="dropdown"
				className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
			>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">
							Dashboard
						</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">
							Settings
						</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">
							Earnings
						</a>
					</li>
					<li>
						<a href="#" className="block px-4 py-2 hover:bg-gray-100">
							Sign out
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Dropdown;
