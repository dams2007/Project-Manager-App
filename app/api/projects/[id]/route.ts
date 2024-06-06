// Import necessary modules from Next.js
import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.SERVER_BASE_URL;

// Define the GET request handler
export const GET = async (
	request: NextApiRequest,
	{ params }: { params: { id: string } }
) => {
	// Extract the ID parameter from the request
	const { id } = params;

	try {
		// Send a GET request to the external API to fetch product data by ID
		const res = await fetch(`${baseURL}/products/${id}`, {
			cache: "no-store",
		});

		// Check if the response is OK
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		// Parse the response JSON
		const product = await res.json();

		// Return the product data as JSON
		return NextResponse.json(product);
	} catch (error: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
};

// Define the PUT request handler
export async function PUT(request: Request) {
	try {
		// Parse the request body JSON
		const requestBody = await request.json();
		const { id, createdAt, ...updateData } = requestBody;

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

		// Return the updated project data as JSON
		return NextResponse.json(updatedProject);
	} catch (error: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		console.error("Error occurred:", errorMessage);

		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
