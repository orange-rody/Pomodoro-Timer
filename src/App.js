import React,{Component} from 'react';
import './App.css';
import Timer from './Timer';
import TimerControllers from './TimerControllers';
import Sound from './Sound';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:'Focus',
      focusTime:'25',
      breakTime:'5',
      sound:'on'
    }
  }

  /*this.setStateの関数を実行するsetSoundというメンバー変数を定義します。
  setSound()の引数の値がstateのsoundプロパティに設定されます。*/
  setSound=(sound)=>{
    this.setState({
      sound: sound
    });
  }

  render(){
    return(
      <div className="window">
        <Timer className = 'timer' remainTime = {this.state.focusTime} cycle={this.state.cycle}/>
        <TimerControllers/>
        <Sound setSound={this.setSound} sound={this.state.sound}/>
      </div>
    );
  }
}

export default App;