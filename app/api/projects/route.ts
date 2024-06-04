import { NextResponse } from "next/server";
const baseURL = "http://localhost:3000";

export async function GET() {
	try {
		const res = await fetch(`${baseURL}/products?limit=${10}`, {
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const projects = await res.json();
		return NextResponse.json(projects);
	} catch (error: unknown) {
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const requestBody = await request.json();

		const res = await fetch(`${baseURL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
			cache: "no-store",
		});

		if (!res.ok) {
			throw new Error("Network response was not ok");
		}

		const projects = await res.json();
		return NextResponse.json(projects);
	} catch (error: unknown) {
		let errorMessage = "An unknown error occurred";
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return NextResponse.json({ error: errorMessage }, { status: 500 });
	}
}
