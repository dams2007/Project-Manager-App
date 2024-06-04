const baseURL = process.env.BASE_URL;

const get = async (url: string) => {
	const response = await fetch(`${baseURL + url}`);

	if (!response.ok) {
		throw new Error("Failed to fetch data.");
	}
	const data = (await response.json()) as unknown;
	return data;
};

export default get;
