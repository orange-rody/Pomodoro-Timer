import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay} from '@fortawesome/free-solid-svg-icons';
import {faPause} from '@fortawesome/free-solid-svg-icons';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';


export default class TimerButton extends Component{
  constructor(props){
    super(props);
    this.state={
      startFlag: true,
      startIcon: <FontAwesomeIcon icon={faPlay}/>,
      resetIcon: <FontAwesomeIcon icon={faRedoAlt}/>,
    }
    this.pushStart=this.pushStart.bind(this);
    this.pushReset=this.pushReset.bind(this);
  }

  pushStart=()=>{
    /* this.state.startIcon===<FontAwesomeIcon icon={faPlayCircle}?
          this.setState({startIcon:<FontAwesomeIcon icon={faPauseCircle}/>})
          :this.setState({startIcon:<FontAwesomeIcon icn={faPlayCircle}/>})
       と書いたら上手くいかなかった。 */
    this.state.startFlag===true?
    this.setState({
      startFlag: false,
      startIcon:<FontAwesomeIcon icon={faPause} />,
    },console.log(this.state.startFlag))
    :this.setState({
      startFlag: true,
      startIcon:<FontAwesomeIcon icon={faPlay} />
    },console.log(this.state.startFlag))
  }

  pushReset=()=>{
    this.setState({
      startFlag: true,
      startIcon:<FontAwesomeIcon icon={faPlay} />
    }) 
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
        <p id="startButton" onClick={this.props.handleTimer}>
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
          {this.state.startIcon}
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
          {this.state.resetIcon}
        </p>       
      </div>
    );
  }
}