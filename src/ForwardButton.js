import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepForward} from '@fortawesome/free-solid-svg-icons';

export default class ForwardButton extends Component{
  constructor(props){
    super(props);
    this.state={
      forwardIcon:<FontAwesomeIcon icon={faStepForward}/>
    }
  }
  render(){
    return(
    <p id="forwardButton">{this.state.forwardIcon}</p>
    )
  }
}