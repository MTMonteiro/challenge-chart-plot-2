import React from 'react'

import './TextArea.css'






export default (props) => {
	return(
			<>
				<textarea  onChange={props.on} id="Text" rows="4" cols="50">
					{props.children}
				</textarea>

			</>

		)
}