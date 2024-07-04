// Import necessary module from Next.js
import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongoDB";
import Product from "@/app/models/productShema";
import { error } from "console";

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Define the GET request handler
export async function GET() {
	await connectMongoDB();

	try {
		// Send a GET request to the external API to fetch a limited number of products
		const limit = 10;
		const products = await Product.find({}).limit(limit);
		// Return the projects data as JSON
		return NextResponse.json(products);
	} catch (err: unknown) {
		// Handle errors and return an appropriate error message
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const { title, description, status } = await request.json();
		await connectMongoDB();

		// Attempt to create a new product
		const newProduct = await Product.create({ title, description, status });

		// Check if the response is OK
		if (!newProduct) {
			throw new Error("Network response was not ok");
		}

		// Return the newly created product data as JSON

		return NextResponse.json(newProduct, { status: 201 });
	} catch (error: unknown) {
		// Handle different types of errors appropriately
		let errorMessage = "An unknown error occurred";

		if (error instanceof Error) {
			errorMessage = error.message;
		}

		// Return the error message as JSON with a 500 status code
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
