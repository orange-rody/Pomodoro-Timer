import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons';
import {faVolumeOff} from '@fortawesome/free-solid-svg-icons';
import Sound from 'react-sound';

export default class AlermSound extends Component{
  constructor(props){
    super(props);
    this.state={
      sound:true,
      soundIcon: <FontAwesomeIcon icon={faVolumeUp}/>,
      status: Sound.status.STOPPED
    }
    this.toggleSound=this.toggleSound.bind(this);
    this.changeSoundAttributes=this.changeSoundAttributes.bind(this);
    this.doAlerm=this.doAlerm.bind(this);
  }

  toggleSound=(e)=>{
    this.state.sound===true?
    this.changeSoundAttributes(false,<FontAwesomeIcon icon={faVolumeOff} />,e):this.changeSoundAttributes(true,<FontAwesomeIcon icon={faVolumeUp} />,e)
  }


  changeSoundAttributes=(toggle,soundIcon,e)=>{
    this.setState({
      sound: toggle,
      soundIcon: soundIcon,
    });
  }

  doAlerm(){
    this.state.sound===true?
    this.setState({status: Sound.status.PLAYING}):this.setState({status: Sound.status.STOPPED})
  }

  stopAlerm(){
    this.setState({status: Sound.status.STOPPED});
  }

  render(){
    return(
      <div id="soundBtn" onClick={this.toggleSound} alt="sound on">
      <style jsx>{`
        #soundBtn{
          position: absolute;
          bottom: 0;
          width: 100px;
          height: 100px;
          margin-left: 20px;
        }
      `}</style>
      <Sound url={`${process.env.PUBLIC_URL}/assets/alerm.mp3`} playStatus={this.state.status} />
        <p id="soundIcon">
        <style jsx>{`
          #soundIcon{
            margin-left: 20px;
            line-height: 100px;
            font-size: 50px;
          }
        `}</style>
            {this.state.soundIcon}
        </p>
      </div>
    );
  }
}

