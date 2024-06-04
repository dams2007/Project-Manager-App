import { NextResponse } from "next/server";
import { NextApiRequest } from "next";

const baseURL = "http://localhost:3000";

export const GET = async (
	request: NextApiRequest,
	{ params }: { params: { id: string } }
) => {
	const { id } = params;

	try {
		// Fetching the product using the `id` parameter
		const res = await fetch(`${baseURL}/products/${id}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const product = await res.json();
		return NextResponse.json(product);
	} catch (error: unknown) {
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
};

export async function PUT(request: Request) {
	try {
		const requestBody = await request.json();
		const { id, createdAt, ...updateData } = requestBody;

		if (!id) {
			throw new Error("ID is required");
		}

		const res = await fetch(`${baseURL}/products/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
			cache: "no-store",
		});

		if (!res.ok) {
			console.error("Network response was not ok", res.status, res.statusText);
			throw new Error("Network response was not ok");
		}
		const updatedProject = await res.json();

		return NextResponse.json(updatedProject);
	} catch (error: unknown) {
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		console.error("Error occurred:", errorMessage);
		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
