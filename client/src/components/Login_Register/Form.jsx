import React from 'react'
import './form.css'

/**
 * Form Component for Login and Register
 * @param {Object} props - The properties passed to the component
 * @param {string} props.type - The type of the input field
 * @param {string} props.name - The name of the input field
 * @param {string} props.placeholder - The placeholder text for the input field
 * @param {string} props.value - The value of the input field
 * @param {string} props.label - The label for the input field
 * @param {function} props.handleInput - The function to handle input change event
 */
function Form(props) {
	const { type, name, placeholder, value, label, handleInput } = props;

	return (
		<div className="form__groups">
			{/* Label for the input field */}
			<label className='form__labels'> {label} </label>
			{/* Input field */}
			<input 
				className='form__fields' 
				type={type} 
				name={name} 
				placeholder={placeholder} 
				value={value}
				onChange={handleInput}
				required
			/>
		</div>
	)
}

export default Form
