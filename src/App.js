import React,{Component} from 'react';
import ForwardButton from './ForwardButton';
import TimerButton from './TimerButton';
import AlermSound from './AlermSound';

export default class App extends Component {
  constructor(props){
    super(props);
    this.state={
      cycle: 0,
      session: 'Focus',
      remainTime: 6,
      focusTime: 6,
      breakTime: 3,
      longBreak: 4,
      startFlag: true,
      complete: false,
    }
    this.TimerButtonRef=React.createRef();
    this.ForwardButtonRef=React.createRef();
    this.AlermSoundRef=React.createRef();
    this.format=this.format.bind(this);
    this.changeCycle=this.changeCycle.bind(this);
    this.setTime=this.setTime.bind(this);
    this.handleTimer=this.handleTimer.bind(this);
    this.resetTimer=this.resetTimer.bind(this);
    this.skipForward=this.skipForward.bind(this);
  }
  
  // changeCycleはcycleをインクリメントするメソッド
  changeCycle(){
    this.state.cycle===5?
      this.setState({cycle: 0, complete: true})
      :this.setState((state)=>({cycle: state.cycle+1,complete: true}));
  }

  getSession(){
    return[
      {session: 'Focus', remainTime: this.state.focusTime},
      {session: 'Break', remainTime: this.state.breakTime},
      {session: 'LongBreak', remainTime: this.state.longBreak}
    ];
  }

  setTime(cycle){
    this.setState({startFlag: true, complete: false});
    let sessions = this.getSession();
    switch(cycle){
      case 0: case 2: case 4:
        this.setState(sessions[0]);
        return;
      case 1: case 3:
        this.setState(sessions[1]);
        return;
      case 5:
        this.setState(sessions[2]);
        return;
      default:
        return;
    }
  }

  format(seconds){
    let clockboard;
    if(this.state.complete===true){
      clockboard="Time Up!!";
    }else{ 
      let m=Math.floor(seconds/60);
      let s=Math.floor(seconds%60);
      clockboard=(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
    }
    return clockboard;
  }

  // handleTimerはstartとpauseを切り替えるメソッド
  handleTimer(){ 
    this.state.startFlag===true?
    this.startTimer():this.pauseTimer()
    this.setState((state)=>({startFlag:!state.startFlag}));
    console.log(this.state.startFlag);
    this.TimerButtonRef.current.pushStart();
  }

  startTimer(){
    if(this.state.complete===true){
      this.setTime(this.state.cycle);
    }
    this.timerId=setInterval(()=>{   
      if(this.state.remainTime===0){
        this.AlermSoundRef.current.AudioPlay();
        this.handleTimer();
        this.changeCycle();
      }
      else{
        this.setState((state)=>({remainTime:--state.remainTime}));
      }
    },1000);
  }

  pauseTimer(){
    clearInterval(this.timerId);
  }

  resetTimer(){
    this.TimerButtonRef.current.pushReset();
    clearInterval(this.timerId);
    this.state.complete===true?this.setTime(this.state.cycle-1):this.setTime(this.state.cycle);
  }

  skipForward(){
    if(this.state.complete===true){
      this.setTime(this.state.cycle)
    }else{
      let nextCycle;
      this.state.cycle===5? nextCycle=0 : nextCycle=this.state.cycle+1;
      this.setTime(nextCycle);
      this.setState({cycle: nextCycle});
      this.resetTimer();
    }
  }

  render(){
    return(
      <div id="wrap">
      <style jsx>{`
        #wrap{
          width: 100%;
          height: 100%;
          display:flex;
          flex-direction:column;
          justify-content: center;
          background-image: radial-gradient(hsla(166,43%,57%,40%) 10%,rgba(255,255,255,0) 10%);
          background-size: 10px 10px;
        }
      `}</style>
        <p id="session">
        <style jsx>{`
          #session{
            font-family: 'Roboto Mono', monospace;
            width: 40%;
            margin: 0 auto;
            text-align: center;
            font-size: 50px;
            border-radius: 100%;
          }
        `}</style>
          {this.state.session}
        </p>
        <p id="clockboard">
        <style jsx>{`
          #clockboard{
            margin: 0;
            font-family: 'Roboto Mono', monospace;
            display: block;
            font-size:130px;
            text-align: center;
          }
        `}</style>
          {this.format(this.state.remainTime)}
        </p>
        <ForwardButton skipForward={this.skipForward}/>
        <TimerButton id='timerButton'
            handleTimer={this.handleTimer} 
            resetTimer={this.resetTimer} 
            ref={this.TimerButtonRef}/>
        <AlermSound id='AlermSound' ref={this.AlermSoundRef} />
      </div>
    );
  }
}
