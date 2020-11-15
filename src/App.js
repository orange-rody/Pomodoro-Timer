import React,{Component} from 'react';
import './App.css';
import Timer from './Timer';

class App extends Component {
  render(){
    return(
      <div className="window">
        <Timer className = 'timer' remainTime = {Number('25')}/>
      </div>
    )
  }
}

export default App;