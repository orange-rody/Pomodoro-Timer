import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {faVolumeOff} from '@fortawesome/free-solid-svg-icons';

export default class AlermSound extends Component{
  constructor(props){
    super(props);
    this.state={
      sound: true,
      soundIcon: <FontAwesomeIcon icon={faVolumeUp}/>,
      src: `${process.env.PUBLIC_URL}/assets/alerm.mp3`
    }
    this.toggleSound=this.toggleSound.bind(this);
    this.changeSoundAttributes=this.changeSoundAttributes.bind(this);
  }

  toggleSound=()=>{
    this.state.sound===true?
    this.changeSoundAttributes(false,<FontAwesomeIcon icon={faVolumeOff} />,false):this.changeSoundAttributes(true,<FontAwesomeIcon icon={faVolumeUp} />,true)
  }


  changeSoundAttributes=(toggle,soundIcon)=>{
    this.setState({
      sound: toggle,
      soundIcon: soundIcon,
    });
  }

  AudioPlay(){
    const audio = document.getElementById('audio');
    if(this.state.sound===true){
      audio.volume=0.2;
      audio.play();
    }else{
      audio.pause();
      audio.currentTime=0;
    }
  }


  render(){
    return(
      <div>
        <p id="soundBtn" onClick={this.toggleSound}>
        <style jsx>{`
          #soundBtn{
            position: absolute;
            bottom: 0;
            margin-left: 20px;
            line-height: 100px;
            font-size: 50px;
          }
        `}</style>
            {this.state.soundIcon}
        </p>
        <audio src={this.state.src} id="audio" />
      </div>
    );
  }
}

