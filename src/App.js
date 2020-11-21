import React,{Component} from 'react';
import Timer from './Timer';
import TimerControllers from './TimerControllers';
import AlermSound from './AlermSound';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle:'Focus',
      focusTime:5,
      breakTime:5,
      sound:true,
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
      <div>
      <style jsx>{`
        div{
          max-width:375px;
          max-height:667px;
        }
      `}
      </style>
        <Timer totalTime = {this.state.focusTime} cycle={this.state.cycle} sound={this.state.sound}/>
        <TimerControllers id="timer-controllers"/>
        <AlermSound setSound={this.setSound} sound={this.state.sound} />
      </div>
    );
  }
}

export default App;