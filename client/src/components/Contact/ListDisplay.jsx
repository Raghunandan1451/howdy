import React from 'react'

/**
 * List component renders a list item with username and its corresponding id
 * @param {Object} props - Object containing list item data and click event handler
 * @param {Object} props.list - Object containing user data
 * @param {string} props.list.username - Username of the user
 * @param {string} props.list.id - Id of the user
 * @param {Function} props.click - Event handler for click event
 * @returns {JSX.Element} - JSX element representing a list item
 */
function List({list, click}) {
	return (
		// Render a div element with class name 'list__design'
		// Set the value and data_id attributes to user's username and id respectively
		// Attach a click event handler to the div element
		<div className='list__design' value={list.username} data_id={list._id} onClick={click}>
			{/* Render the user's username */}
			{list.username}
		</div>
	)
}

export default List
