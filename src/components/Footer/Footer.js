import React from 'react'

import './Footer.css'


export default ({ onClickButton }) => {
	
	return (
		<div className="footer-area">
			<footer>
				<button onClick={onClickButton}>Generate Chart</button>
			</footer>
		</div>
		)
}