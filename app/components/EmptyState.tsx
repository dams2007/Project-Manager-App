import React from "react";

const EmptyState = () => {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h2 className="text-xl font-semibold mt-4">No Projects Found</h2>
			<p className="text-gray-500 mt-2">
				Let's get started by adding your first project ;)
			</p>
		</div>
	);
};

export default EmptyState;
