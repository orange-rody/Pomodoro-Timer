import React,{Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component {
  timer={
    color:"hsl(213,100%,69%)",
    fontSize:"25px"
  }
  render(){
    return(
      <div className="window">
        <Timer style={this.timer} />
      </div>
    )
  }
}

export default App;