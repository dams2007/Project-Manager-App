import decodeURIComponent from "./decodeURIComponent";

export default function getId(param: string): string {
	const paramDecoded = decodeURIComponent(param);
	const id = paramDecoded.replace("id=", "");
	return id;
}
