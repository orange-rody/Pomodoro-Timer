import React,{Component} from 'react';
import Timer from './Timer';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:1,
      totalTime:5,
      focusTime:5,
      breakTime:3,
      longBreak:6,
    }  
  }

  setSound=(sound)=>{
    this.setState({sound: sound});
  }

  render(){
    return(
      <div id="wrap">
      <style jsx>{`
        #wrap{
          background-image: radial-gradient(hsla(166,43%,57%,40%) 10%,rgba(255,255,255,0) 10%);
          background-size: 10px 10px;
          width: 100%;
          height: 100%;
        }
      `}</style>
        <Timer totalTime={this.state.totalTime} focusTime={this.state.focusTime} breakTime={this.state.breakTime} longBreak={this.state.longBreak}/>
      </div>
    );
  }
}

export default App;