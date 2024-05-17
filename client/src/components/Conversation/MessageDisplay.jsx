
import { useEffect, useRef } from 'react' // Importing useEffect and useRef hooks from React
import { format } from 'timeago.js' // Importing format function from timeago.js

/**
 * Component for displaying messages in a conversation
 * @param {Object} props - Object containing message and own properties
 * @param {Object} props.message - Object representing the message to be displayed
 * @param {boolean} props.own - Boolean indicating if the message is from the current user
 * @returns {JSX.Element} - The JSX element representing the message display
 */
function MessageDisplay({ message, own }) {
	
	const scrollRef = useRef() // Creating a ref to the div element that will be used to scroll to the bottom of the messages

	useEffect(() => {
		// Scroll to the bottom of the messages when the component is rendered
		scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	return (
		<div ref={scrollRef} className="msg__container">
			<div className={own ? 'messages sender' : 'messages'} >
				{message.text}
			</div>
			<div className={own ? 'timer sender__timer' : 'timer'} >
				{format(message.createdAt)}
			</div>
		</div>
	)
}

export default MessageDisplay
