import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header'
import CodeArea from './components/CodeArea/CodeArea'
import Charts from './components/Charts/Charts'
import Footer from './components/Footer/Footer'
import './App.css';


import ErrorAlert from './components/ErrorAlert';
import EventStringParser from './services/EventStringParser';
import {defaultValue} from './services/Utils/ace.js';


function App(props) {
  

    const [hasError, setHasError] = useState({})
    const [codeEditor, setCodeEditor] = useState({defaultValue,value: defaultValue})
    const [chart, setChart] = useState({eventStreamList: new EventStringParser()})
  

  /* starts the chart with a default value */

  useEffect(() => {
    onClickButton()
  }, [])


  const onClickButton = () => {

    try{

      const {value} = codeEditor;

      const eventStreamList = new EventStringParser(value);
      
      /* some magic! */
      eventStreamList.process();
      setChart({eventStreamList})

    }catch(err){
      setHasError(err);
    }
  }

  /* updates editor value */
  const editorOnChange = value => {
      setCodeEditor(value)
      console.log(value)
  }

  /* Close ErrorModalAlert */
  const dismissError = () => {
    setHasError({});
  }


    return (
      <ErrorAlert
          error = {hasError}
          dismiss = {dismissError}>
        
        <Header />

        <CodeArea
            onChange = {editorOnChange}
            {...codeEditor} />
        
        {!props.test && 
          (<Charts {...chart}/>)}

        
        <Footer onClickButton = {onClickButton}/>

      </ErrorAlert>
    );
  
}

export default App;