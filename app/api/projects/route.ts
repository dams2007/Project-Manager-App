// Import necessary module from Next.js
import { NextResponse } from "next/server";

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.SERVER_BASE_URL;

// Define the GET request handler
export async function GET() {
	try {
		// Send a GET request to the external API to fetch a limited number of products
		const res = await fetch(`${baseURL}/products?limit=${10}`, {
			cache: "no-store",
		});

		// Check if the response is OK
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		// Parse the response JSON
		const projects = await res.json();

		// Return the projects data as JSON
		return NextResponse.json(projects);
	} catch (error: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

// Define the POST request handler
export async function POST(request: Request) {
	try {
		// Parse the request body JSON
		const requestBody = await request.json();

		// Send a POST request to the external API to create a new product
		const res = await fetch(`${baseURL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
			cache: "no-store",
		});

		// Check if the response is OK
		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		// Parse the response JSON
		const projects = await res.json();

		// Return the newly created projects data as JSON
		return NextResponse.json(projects);
	} catch (error: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
