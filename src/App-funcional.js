//import React, { useState } from 'react';
import React from 'react';

import Header from './components/Header/Header'
import CodeArea from './components/CodeArea/CodeArea'
import Charts from './components/Charts/Charts'
import Footer from './components/Footer/Footer'
import './App.css';


import ErrorAlert from './components/ErrorAlert';
import EventStringParser from './services/EventStringParser';
import {defaultValue} from './services/Utils/ace.js';


class App extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      hasError: {},
      codeEditor:{
        defaultValue,
        value: defaultValue
      },
      chart: {
        eventStreamList: new EventStringParser()
      }
    };
  }

  /* starts the chart with a default value */
  componentDidMount(){
    this.buttonClick();
  }

  /* updates editor value */
  editorOnChange = value => {

    this.setState( prevState => ({
      ...prevState,
      codeEditor: {
        ...prevState.CodeEditor,
        value
      }
    }));
  }

  /* Close ErrorModalAlert */
  dismissError = () => {
    this.setState(prev => ({
      ...prev,
      hasError: {}
    }));
  }

  /* onClick Generate new chart */
  buttonClick = () => {

    try{

      const {value} = this.state.codeEditor;

      const eventStreamList = new EventStringParser(value);
      
      /* some magic! */
      eventStreamList.process();

      this.setState(prevState => ({
        ...prevState,
        chart:{
          eventStreamList
        }
      }));

    }catch(err){
      
      this.setState(prev => ({
        ...prev,
        hasError: err
      }));
    }
  }


  render() {
    return (
      <ErrorAlert
          error = {this.state.hasError}
          dismiss = {this.dismissError}>
        
        <Header />

        <CodeArea
            onChange = {this.editorOnChange}
            {...this.state.codeEditor} />
        
        {!this.props.test && 
          (<Charts {...this.state.chart}/>)}

        
        <Footer onClickChart = {this.buttonClick}/>

      </ErrorAlert>
    );
  }
}

export default App;

/////////////////


/*


const initial_value = '{teste: 123}'


function App() {
  const [obj, setObj] = useState(initial_value)

  const onChange = newValue => {
    //content = newValue;
    console.log("change", newValue);
    setObj(newValue)
  }




  return (
    <div className="App">
     <Header />

      <div className="visible-space">
          <CodeArea onChange={onChange}  value={obj}/>
          <Charts />
      </div>
     <Footer content= {obj}/>
    </div>
  );
}

export default App;
*/