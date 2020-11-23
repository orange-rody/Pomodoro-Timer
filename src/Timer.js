import React, {Component} from 'react';
//react-soundをインポートし、audioデータを再生できるようにする。
import Sound from 'react-sound';

class Timer extends Component{
  constructor(props){
    super(props);
    this.state={
      cycle: props.cycle,
      // 初期のremainTime(=残り時間)はprops.focusTimeから取得。
      remainTime: props.totalTime,
      startButton: true,
      btnMessage: 'START',
      // props.focusTimeには「秒」の合計が入っているので、60で割って「分」にする。
      clockBoard:`${('0'+String(Math.floor(props.totalTime/60))).slice(-2)}:${('0'+String(props.totalTime %60)).slice(-2)}`,
      status: Sound.status.STOPPED,
      message: props.cycle
    };
    //thisをバインドして、それぞれのメソッドが正常にthisの値を取得できるようにする。
    this.handleTimer=this.handleTimer.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.stopTimer=this.stopTimer.bind(this);
    this.resetTimer=this.resetTimer.bind(this);
    this.params=this.params.bind(this);
    this.clockBoard=this.clockBoard.bind(this);
  }

 //stateの真偽値によって、プロパティを変更してreturnする関数paramsを定義する
  params(state=true){
    return{
      startButton: state,
      btnMessage: state ? 'START':'STOP',
    }
  }

  //startButtonがtrueならstartTimer()を、falseならstopTimer()を起動する。
   handleTimer(){
    this.state.startButton === true? this.startTimer():this.stopTimer()
  }

  clockBoard(){
    return `${('0' + String(Math.floor(this.state.remainTime / 60))).slice(-2)}:${('0'+String(this.state.remainTime %60)).slice(-2)}`;
  }

  finishMessage(){
    switch(this.state.cycle){
      case 'Focus':
        return 'Next is "Break"';
      case 'Break':
        return 'Next is "Focus';
      default: return
    }
  }

  finishDisplay(){
    this.setState(()=>({
      clockBoard: 'Time Up!',
      startButton: true,
      btnMessage: 'START',
      message: this.finishMessage()
    }))
  }

  startTimer(){
    //startTimerが起動したら、params()でstartButtonとbtnMessageの内容を書き換える。
    this.setState(this.params(false));
    this.setState({
      message: this.state.cycle,
      clockBoard: this.clockBoard(),
      status:Sound.status.STOPPED
    });
     // setInterval()を使用し、1000ミリ秒ごとにthis.state.remainTimeが更新されるようにします。
   this.timerId=setInterval(()=>{
      // remainTimeが0になったらclearInterval()で処理をストップさせます。
      if(this.state.remainTime===0){
        this.finishDisplay();
        if(this.props.sound===true){this.setState({status: Sound.status.PLAYING});}
        this.state.cycle==='Focus'?
          this.setState({
            cycle:'Break',
            remainTime: this.props.breakTime
          }):
          this.setState({
            cycle:'Focus',
            remainTime: this.props.focusTime
          });
        clearInterval(this.timerId);
      }else{
        this.setState((state)=>{
          return{
            remainTime:--state.remainTime,
            clockBoard: this.clockBoard()
          }
        })
      }
    },1000);
  }

  stopTimer(){
    //stopTimerが起動したら、params()でstartButtonとbtnMessageの内容を書き換える。
    this.setState(this.params(true));
    //clearIntervalでカウントダウン処理をストップさせる。
    clearInterval(this.timerId);
  }

  resetTimer(){
    //resetTimerが起動したら、setIntervalの処理をストップさせた後、stateの内容を切り替える。
    clearInterval(this.timerId);
    this.setState({
      remainTime: this.props.totalTime,
      clockBoard:`${('0' + String(Math.floor(this.props.totalTime / 60))).slice(-2)}:${(('0'+String(this.props.totalTime % 60)).slice(-2))}`,
      message: this.props.cycle
    });
    this.setState(this.params(true));
    this.setState({
      status: Sound.status.STOPPED
    })
  };
  

  render(){
    return(
      <div className={this.props.className}> 
      <style jsx>{`
        div{
          width: 100%;
          height: 100vh;
          background-color: hsl(213,70%,10%);
          outline: none;
        }      
      `}</style>
        <p id="clockBoard">
        <style jsx>{`
          #clockBoard{
            margin: 0;
            font-size: 60px;
            color: hsl(213,100%,70%);
            text-align: center;
            padding: 50px 50px 0 50px
          }
        `}</style>
          {this.state.clockBoard}</p>
        <p id="message">
        <style jsx>{`
          #message{
            display:block;
            padding-top: 0px;
            margin: 0 auto 50px;
            text-align: center;
            color: hsl(213,100%,70%);
            font-size: 30px;
          }
        `}
        </style>
          {this.state.message}
        </p>
        <p id="button" style={this.btnStyle} onMouseEnter={this.btnHover} onMouseLeave={this.btnLeave} onClick={this.handleTimer}>
        <style jsx>{`
          #button {
            font-size:15px;
            width: 80px;
            padding: 10px;
            margin: 20px auto;
            text-align: center;
            color: #fff;
            background-color: hsl(213,80%,60%);
            cursor: pointer;
          }
          #button:hover {
            outline: 3px solid #fff;
            outline-offset: -3px;
          }
        `}</style>  
          {this.state.btnMessage}</p>
        <p id="button" onClick={this.resetTimer}>RESET</p>
        <Sound url={`${process.env.PUBLIC_URL}/assets/alerm.mp3`} playStatus={this.state.status} />
      </div>
    );
  }
}

export default Timer;