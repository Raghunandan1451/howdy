import React from 'react'
import './form.css'

function Form(props) {

	const { type, name, placeholder, value, label, handleInput } = props;

	return (
		<div className="form__groups">
			<label className='form__labels'> {label} </label>
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
