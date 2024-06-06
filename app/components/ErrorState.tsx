import React from "react";

interface ErrorStateProps {
	errorMessage: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ errorMessage }) => {
	return (
		<div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-col items-center justify-center h-32">
			<p>
				<span className="text-xl font-semibold mt-4">Error</span>
			</p>
			<p>
				<span className="block sm:inline">{errorMessage}</span>
			</p>
		</div>
	);
};

export default ErrorState;
