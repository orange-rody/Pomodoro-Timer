import React,{Component} from 'react';
import Timer from './Timer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:1,
      totalTime:5,
      sound:true,
      focusTime:5,
      breakTime:3,
      longBreak:10,
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