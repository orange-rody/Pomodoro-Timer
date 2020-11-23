
import React, {Component} from 'react';

class AlermSound extends Component{
  
  toggleSound=(e)=>{
    /*propsのsoundプロパティが「on」なら、「'off'」を引数にしてpropsのsetSound('off')を実行します。propsのsoundプロパティが「off」なら、「'on'」を引数にしてpropsのsetSound('on')を実行します。*/
    this.props.sound===true?
    this.changeSoundAttributes(false,`${process.env.PUBLIC_URL}/assets/soundOff.png`,e)
    :
    this.changeSoundAttributes(true,`${process.env.PUBLIC_URL}/assets/soundOn.png`,e)
  }

  changeSoundAttributes = (toggle,src,e)=>{
    this.props.setSound(toggle);
    e.target.src=src ;
  }

  render(){
    return(
      <label for="soundIcon" id="soundBtn">
      <style jsx>{`
        #soundBtn {
          position: absolute;
          top: 80%;
          left: 250px;
          border-radius: 100%;
          display: block;
          background-color: hsl(213,80%,60%);
        }
      `}</style>
        <img id="soundIcon" src={`${process.env.PUBLIC_URL}/assets/soundOn.png`} onClick={this.toggleSound} alt="sound on"/>
        <style jsx>{`
          #soundIcon {
            width: 50px;
            height: 50px;
            display: inline-block;
            padding:20px;
          }
        `}
        </style>
      </label>
    );
  }
}

export default AlermSound;