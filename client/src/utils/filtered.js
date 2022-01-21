export const filtered = (data) => {
	let result = data
	.filter(field => field.members)
	.map(data => data.members)

	return result;
}