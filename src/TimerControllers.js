import React,{Component} from 'react';
import FocusController from './FocusController';
import BreakController from './BreakController';

class TimerControllers extends Component{
  render(){
    return(
      <div className="timer-controllers">
        <FocusController/>
        <BreakController/>
      </div>
    );
  }
}

export default TimerControllers;