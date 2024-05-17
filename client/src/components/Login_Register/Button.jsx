import React from 'react'
import './form.css'

/**
 * Button component for the form
 * @return {JSX.Element} Returns the JSX element
 */
function Button() {
	return (
		<React.Fragment>
			{/* Submit button for form */}
			<input type='submit' className='btn__block' />
			</React.Fragment>
	)
}

export default Button
