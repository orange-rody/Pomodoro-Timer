import React,{Component} from 'react';
import Timer from './Timer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:1,
      totalTime:20,
      sound:true,
      focusTime:20,
      breakTime:30,
      longBreak:20,
    }  
  }

  setSound=(sound)=>{
    this.setState({sound: sound});
  }

  render(){
    return(
      <div>
        <Timer totalTime={this.state.totalTime} focusTime={this.state.focusTime} breakTime={this.state.breakTime} longBreak={this.state.longBreak}/>
      </div>
    );
  }
}

export default App;