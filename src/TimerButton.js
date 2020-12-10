import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {faPause} from '@fortawesome/free-solid-svg-icons';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import Sound from 'react-sound';

export default class TimerButton extends Component{
  constructor(props){
    super(props);
    this.state={
      startButton:true,
      startIcon: <FontAwesomeIcon icon={faPlay}/>,
      resetIcon: <FontAwesomeIcon icon={faRedoAlt}/>,
      status: Sound.status.STOPPED
    }
    this.pushStart=this.pushStart.bind(this);
    this.pushReset=this.pushReset.bind(this);
    this.stopSound=this.stopSound.bind(this);
  }

  pushStart=()=>{
    /* this.state.startIcon===<FontAwesomeIcon icon={faPlayCircle}?
          this.setState({startIcon:<FontAwesomeIcon icon={faPauseCircle}/>})
          :this.setState({startIcon:<FontAwesomeIcon icn={faPlayCircle}/>})
       と書いたら上手くいかなかったので、({startButton:true})というプロパティを作った。 */
    this.state.startButton===true?
    this.setState({
      startButton:false,
      startIcon:<FontAwesomeIcon icon={faPause} />,
      status: Sound.status.PLAYING
    })
    :this.setState({
      startButton:true,
      startIcon:<FontAwesomeIcon icon={faPlay} />
    })
  }

  pushReset=()=>{
    this.setState({
      startButton:true,
      startIcon:<FontAwesomeIcon icon={faPlay} />
    }) 
  }

  stopSound(){
    setTimeout(this.setState({status:Sound.status.STOPPED}),1000);
  }

  render(){
    return(
      <div id="buttonWrap">
      <style jsx>{`
        #buttonWrap{
          display: flex;
          flex-flow: row;
          justify-content: space-around;
          width: 55%;
          margin: 0 auto;
        }
      `}</style>
        <p id="startButton" onClick={this.props.handleTimer} >{this.state.startIcon}
        <style jsx>{`
          #startButton{
            width: 100px;
            font-size: 35px;
            line-height: 100px;
            text-align: center;
            border-radius: 100%;
            color: hsl(332,76%,95%);
            background-color: hsl(166,43%,57%);
            box-shadow: 4px 1px hsl(332,76%,61%);
            transition: all 0.1s linear;
          }
          #startButton:active{
            background-color: hsl(166,43%,80%);
          }
        `}</style>
        </p>
        <p id="resetButton" onClick={this.props.resetTimer} >
        <style jsx>{`
          #resetButton{
            width: 100px;
            font-size: 35px;
            line-height: 100px;
            text-align: center;
            border-radius: 100%;
            color: hsl(332,76%,95%);
            background-color: hsl(166,43%,57%);
            box-shadow: 4px 1px hsl(332,76%,61%);
            transition: all 0.1s linear;
          }
          #resetButton:active{
            background-color: hsl(166,43%,80%);
            
          }
        `}</style>
          {this.state.resetIcon}</p>
          <Sound url={`${process.env.PUBLIC_URL}/assets/cursor1.mp3`} />
      </div>
    );
  }
}