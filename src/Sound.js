import React, {Component} from 'react';
import soundOff from './Assets/soundOff.png';
import soundOn from './Assets/soundOff.png';

class Sound extends Component{
  
  toggleSound=()=>{
    /*propsのsoundプロパティが「on」なら、「'off'」を引数にしてpropsのsetSound('off')を実行します。
      propsのsoundプロパティが「off」なら、「'on'」を引数にしてpropsのsetSound('on')を実行します。*/
    this.props.sound==='on'?
    this.props.setSound('off') :
    this.props.setSound('on')
  }

  


  render(){
    return(
      <button onClick={this.toggleSound}>SOUND</button>
    );
  }
}

export default Sound;