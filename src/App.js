import React,{Component} from 'react';
import Timer from './Timer';
import TimerControllers from './TimerControllers';
import AlermSound from './AlermSound';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:'Focus',
      totalTime: 5,
      focusTime:5,
      breakTime:10,
      sound:true,
    }
  }

  /*this.setStateの関数を実行するsetSoundというメンバー変数を定義します。
  setSound()の引数の値がstateのsoundプロパティに設定されます。*/
  setSound=(sound)=>{
    this.setState({sound: sound});
  }

  setCycle=(cycle,time)=>{
    this.setState({
      cycle: cycle,
      totalTime: time});
  }

  render(){
    return(
      <div>
      <style jsx>{`
        div{
          max-width:375px;
          max-height:667px;
        }
      `}
      </style>
        <Timer cycle={this.state.cycle}
               totalTime={this.state.totalTime}
               focusTime={this.state.focusTime}
               breakTime={this.state.breakTime}
               setCycle={this.setCycle}
               sound={this.state.sound} />
        <TimerControllers id="timer-controllers"/>
        <AlermSound setSound={this.setSound} 
                    sound={this.state.sound} />
      </div>
    );
  }
}

export default App;