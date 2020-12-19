import React,{Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStepForward} from '@fortawesome/free-solid-svg-icons';

export default class ForwardButton extends Component{
  constructor(props){
    super(props);
    this.state={
      cycle: this.props.cycle
    }
  }
  render(){
    return(
    <div id="forwardButton">
      <FontAwesomeIcon icon={faStepForward} onClick={this.props.skipForward}/>
    </div>
    );
  }
} 


