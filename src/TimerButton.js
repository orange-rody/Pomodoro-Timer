import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlayCircle} from '@fortawesome/free-regular-svg-icons';
import {faPauseCircle} from '@fortawesome/free-regular-svg-icons';
import {faRedoAlt} from '@fortawesome/free-solid-svg-icons';

export default class TimerButton extends Component{
  constructor(props){
    super(props);
    this.state={
      startButton:true,
      startIcon: <FontAwesomeIcon icon={faPlayCircle}/>,
      resetIcon: <FontAwesomeIcon icon={faRedoAlt}/>
    }
    this.pushStart=this.pushStart.bind(this);
    this.pushReset=this.pushReset.bind(this);
  }

  pushStart=()=>{
    /* this.state.startIcon===<FontAwesomeIcon icon={faPlayCircle}?
          this.setState({startIcon:<FontAwesomeIcon icon={faPauseCircle}/>})
          :this.setState({startIcon:<FontAwesomeIcon icn={faPlayCircle}/>})
       と書いたら上手くいかなかったので、({startButton:true})というプロパティを作った。 */
    this.state.startButton===true?
    this.setState({
      startButton:false,
      startIcon:<FontAwesomeIcon icon={faPauseCircle} />
    })
    :this.setState({
      startButton:true,
      startIcon:<FontAwesomeIcon icon={faPlayCircle} />
    })
  }

  pushReset=()=>{
    this.setState({
      startButton:true,
      startIcon:<FontAwesomeIcon icon={faPlayCircle} />
    }) 
  }

  render(){
    return(
      <div>
        <p id="startButton" onClick={this.props.handleTimer} >{this.state.startIcon}</p>
        <p id="resetButton" onClick={this.props.resetTimer} >{this.state.resetIcon}</p>
      </div>
    );
  }
}