import React,{Component} from 'react';
import TimerButton from './TimerButton';
import ForwardButton from './ForwardButton'; 

export default class Timer extends Component{
  constructor(props){
    super(props);
    this.state={
      remainTime:props.totalTime,
      clockBoard:`${('0'+String(Math.floor(props.totalTime/60))).slice(-2)}
                   :${('0'+ String(props.totalTime % 60)).slice(-2)}`,
      startFlag:true,
      complete:false,
      cycle:1
    };
    this.clockBoard=this.clockBoard.bind(this);
    this.handleTimer=this.handleTimer.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.pauseTimer=this.pauseTimer.bind(this);
    this.resetTimer=this.resetTimer.bind(this);
    this.completeTimer=this.completeTimer.bind(this);
    this.TimerButtonRef=React.createRef();
  }

  //clockBoard(時計の表示)を更新するメソッド
  clockBoard(){
    return `${(0+String(Math.floor(this.state.remainTime/60))).slice(-2)}
            :${(0+String(this.state.remainTime%60).slice(-2))}`;
  }

  handleTimer(){
    this.state.startFlag===true?
      this.startTimer():this.pauseTimer()
    this.setState(state=>({
      startFlag: !state.startFlag
    }));
  }

  completeTimer(boolean){
    this.setState({complete: boolean});
  }

  changeCycle=()=>{
    this.setState((state)=>({
      cycle: state.cycle+1
    }))
  }

  setTimer(){
    const cycle = this.state.cycle;
    switch(cycle){
      case 1:
        this.setState({
          remainTime: this.props.breakTime,
          clockBoard:`${('0'+String(Math.floor(this.props.breakTime/60))).slice(-2)}
                 :${('0'+ String(this.props.breakTime % 60)).slice(-2)}`
        });
        break;
      case 2:
        this.setState({
          remainTime: this.props.focusTime,
          clockBoard:`${('0'+String(Math.floor(this.props.focusTime/60))).slice(-2)}
                  :${('0'+ String(this.props.focusTime % 60)).slice(-2)}`
        });
        break;
      case 3:
        this.setState({
          remainTime: this.props.breakTime,
          clockBoard:`${('0'+String(Math.floor(this.props.breakTime/60))).slice(-2)}
                 :${('0'+ String(this.props.breakTime % 60)).slice(-2)}`
        });
        break;
      case 4:
        this.setState({
          remainTime: this.props.focusTime,
          clockBoard:`${('0'+String(Math.floor(this.props.focusTime/60))).slice(-2)}
                  :${('0'+ String(this.props.focusTime % 60)).slice(-2)}`
        });
        break;
      case 5:
        this.setState({
          remainTime: this.props.longBreak,
          clockBoard:`${('0'+String(Math.floor(this.props.longBreak/60))).slice(-2)}
          :${('0'+ String(this.props.longBreak % 60)).slice(-2)}`,
          cycle:1
        });
        break;
      default:
        return;
    }
  }

  startTimer(){
    this.TimerButtonRef.current.pushStart();
    if(this.state.remainTime===0){
      this.setTimer();
      this.changeCycle();
    }
    this.timerId=setInterval(()=>{
      if(this.state.remainTime===0){
        this.setState({
          clockBoard: 'Time Up!!',
        });
        this.completeTimer(true);
        this.handleTimer();
      }
      else{
        this.setState((state)=>{
          return({
            remainTime:--state.remainTime,
            clockBoard:this.clockBoard()
          });
        });
      }
    },1000)
  }

  pauseTimer(){
    clearInterval(this.timerId);
    this.TimerButtonRef.current.pushStart();
  }

  resetTimer(){
    this.TimerButtonRef.current.pushReset();
    this.setState({
      remainTime:this.props.totalTime,
      clockBoard:`${('0'+String(Math.floor(this.props.totalTime/60))).slice(-2)}
                  :${('0'+ String(this.props.totalTime % 60)).slice(-2)}`,
      startFlag:true 
    });
    clearInterval(this.timerId);
  }

  render(){
    return(
      <div>
        <div id='clockBoard'>
        <style jsx>{`
          #clockBoard{
            display: block;
            font-size:40px;
            color: hsl(230,100%,70%);
          }
        `}</style>
          {this.state.clockBoard}
        </div>
        <TimerButton handleTimer={this.handleTimer} resetTimer={this.resetTimer} ref={this.TimerButtonRef} />
        <ForwardButton/>
      </div>
    )
  }
}