import React from "react";

const Loading = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
			<div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
			<p className="mt-4 text-lg text-gray-700">Loading, projects...</p>
		</div>
	);
};

export default Loading;
