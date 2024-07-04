// Import necessary modules from Next.js
import { NextRequest, NextResponse } from "next/server";

import connectMongoDB from "@/lib/mongoDB";
import Product from "@/app/models/productShema";

// Retrieve the base URL for the API from environment variables
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	await connectMongoDB();
	// Extract the ID parameter from the request
	const { id } = params;

	try {
		// Send a GET request to the external API to fetch product data by ID
		const product = await Product.findById(id);
		// Check if the response is OK
		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

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
}

export async function PUT(request: NextRequest) {
	try {
		await connectMongoDB();
		console.log("MongoDB connected");

		// Parse the request body JSON
		const requestBody = await request.json();
		console.log("Request body received:", requestBody);

		const { _id, ...updateData } = requestBody;
		// Check if the ID is provided
		if (!_id) {
			console.log("ID is missing in the request body");
			return NextResponse.json({ error: "ID is required" }, { status: 400 });
		}

		// Send a PUT request to the external API to update product data by ID
		const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
			new: true,
			cache: "no-store",
		});
		console.log("Updated product:", updatedProduct);

		// Check if the response is OK
		if (!updatedProduct) {
			console.log("Product not found or update failed");
			return NextResponse.json(
				{ error: "Product not found or update failed" },
				{ status: 404 }
			);
		}

		// Return the updated product data as JSON
		return NextResponse.json(updatedProduct, { status: 200 });
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
