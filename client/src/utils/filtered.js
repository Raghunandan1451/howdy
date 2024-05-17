/**
 * Filters the data array and returns an array of member data
 * @param {Array} data - Array of objects containing a 'members' property
 * @returns {Array} - Array of member data
 */
export const filtered = (data) => {
	// Filter the data array to only include objects with a 'members' property
	let result = data
	.filter(field => field.members)
	
	// Map the filtered data to an array of 'members' property values
	.map(data => data.members)

	return result;
}
