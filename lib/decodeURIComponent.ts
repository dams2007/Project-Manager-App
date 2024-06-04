export default function decodeURIComponent(param: string): string {
	return param.replace(/%([a-f0-9]{2})/gi, (match, p1) => {
		return String.fromCharCode(parseInt(p1, 16));
	});
}
