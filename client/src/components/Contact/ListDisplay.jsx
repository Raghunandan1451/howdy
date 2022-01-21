import React from 'react'

function List({list, click}) {

	return (
		<div className='list__design' value={list.username} data_id={list._id} onClick={click}>
			{list.username}
		</div>
	)
}

export default List
