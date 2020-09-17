import React, {useEffect, useState, useRef} from 'react';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import './CodeArea.css';

function CodeEditor(props) {

	const editorWrapper = useRef(null)	
	const [resizeYpivot, setResizeYpivot] = useState(0)
	const [codeCurrentHeight, setCodeCurrentHeight] = useState(0)
	const [resizing, setResizing] = useState(false)


		/* Registering mouse events to be used in resize action */
	useEffect(() => {
		const onMouseUp = () => {
			if( resizing ){
				//resizing = false;
				setResizing(false);
				document.body.style.cursor = "auto";
				document.body.style.userSelect = "auto";
				}
			}



		const onMouseMove = (evt) => {
			if( resizing === true ){

					const currHeight = codeCurrentHeight;
					
					if( evt.clientY > resizeYpivot ){

						const nh = evt.clientY - resizeYpivot;
						
						/* LIMIT: make the chart always visible */
						if ( nh + currHeight <= 260 )
							editorWrapper.current.style.height = currHeight + nh + "px";
					}else{
						
						const nh = resizeYpivot - evt.clientY;
						editorWrapper.current.style.height = currHeight - nh + "px";
					}
			}
		}

		document.body.addEventListener('mousemove', onMouseMove);
		document.body.addEventListener('mouseup', onMouseUp);

		return () => {
          	document.body.removeEventListener('mouseup', onMouseUp);
			document.body.removeEventListener('mousemove', onMouseMove);
		}

	}, [resizing, resizeYpivot, codeCurrentHeight])

	const onMouseDown = ({target}) => {

		setResizeYpivot(target.offsetParent.offsetTop + target.offsetTop);
		const test = editorWrapper.current.style.height || "235px"
		setCodeCurrentHeight(parseInt(test, 10));

		setResizing(true);
		document.body.style.cursor = "row-resize";
		document.body.style.userSelect = "none";
	}


		return (
			<div 
				className = "editor-wrapper"
				ref 	  = {editorWrapper}>
				<AceEditor
				    mode            = "javascript"
				    theme           = "monokai"
				    name            = "custom_ace_editor"
				    width           = "100%"
				    onChange        = {props.onChange}
				    height          = "100%"
				    fontSize        = "15px"
				    value           = {props.value}
				    showPrintMargin = {false}
				    wrapEnabled     = {true}
				    editorProps     = {{$blockScrolling: true}}
					style           = {{lineHeight: '24px'}}
				/>
	  			<span
	  				className    = "resize-btn"
	  				onMouseDown  = {onMouseDown}>
	  			</span>
  			</div>
		);
	
};

export default CodeEditor;