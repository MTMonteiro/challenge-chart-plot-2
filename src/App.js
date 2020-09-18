import React, { useState, useEffect } from 'react';

import Header from './components/Header/Header'
import CodeArea from './components/CodeArea/CodeArea'
import Charts from './components/Charts/Charts'
import Footer from './components/Footer/Footer'
import Alert from './components/Alert/Alert';
import EventStringParser from './services/EventStringParser';
import {defaultValue} from './constants/CodeEditor.constants.js';
import './App.css';


function App(props) {
  

    const [hasError, setHasError] = useState({})
    const [codeEditor, setCodeEditor] = useState({defaultValue,value: defaultValue})
    const [chart, setChart] = useState({eventStreamList: new EventStringParser()})
  

  /* starts the chart with a default value */
  useEffect(() => {
    onClickButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onClickButton = () => {

    try{
      /**/
      console.log(codeEditor)
      
      const {value} = codeEditor;

      const eventStreamList = new EventStringParser(value);
      
      /* */
      eventStreamList.process();
      console.log({eventStreamList})
      setChart({eventStreamList})

    }catch(err){
      console.log(err)
      setHasError(err);
    }
  }


  /* updates editor value */
  const editorOnChange = value => {
      setCodeEditor(value)
  }

  /* Close ModalAlert */
  const dismissError = () => {
    setHasError({});
  }


    return (
      <Alert
          error = {hasError}
          dismiss = {dismissError}>
        
          <Header />

          <div className="visible-wrapper">
              <CodeArea
                  onChange = {editorOnChange}
                  {...codeEditor} />
              
              {!props.test && (<Charts {...chart}/>)}
          </div>
        
        <Footer onClickButton = {onClickButton}/>

      </Alert>
    );
  
}

export default App;