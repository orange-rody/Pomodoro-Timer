import React, {Component} from 'react';

class Timer extends Component{
  constructor(props){
    super(props);
    this.state={
      cycle:props.cycle,
      // 初期のremainTime(=残り時間)はprops.totalTimeから取得。
      remainTime:props.totalTime,  
      startButton:true,
      btnMessage:'START',
      // props.totalTimeには「秒」の合計が入っているので、60で割って「分」にする。
      clockBoard:`${('0' + String(Math.floor(props.totalTime / 60))).slice(-2)}:00`
    };
    //thisをバインドして、それぞれのメソッドが正常にthisの値を取得できるようにする。
    this.handleTimer=this.handleTimer.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.stopTimer=this.stopTimer.bind(this);
    this.resetTimer=this.resetTimer.bind(this);
    this.params=this.params.bind(this);
    this.clockBoard=this.clockBoard.bind(this);
  }


  clockStyle={
    fontSize:'60px',
    color:'hsl(213,100%,70%)',
    textAlign:'center',
    padding:'50px 50px 0px 50px',
    margin:'0'
  }

  cycleStyle={
    fontSize:'30px',
    color:'hsl(213,100%,70%)',
    textAlign:'center',
    paddingBottom: '50px', 
    margin:'0'
  }

  btnStyle={
    fontSize:'15px',
    width:'80px',
    padding:'10px',
    margin:'20px auto',
    textAlign:'center',
    color:'#fff',
    backgroundColor:'hsl(213,80%,60%)',
    cursor:'pointer'
  }

  btnHover(){
    const button = document.getElementById('button');
    button.style.outline='solid 5px hsl(213,80%,80%)';
    button.style.outlineOffset='-5px';
  }
  resetButtonHover(){
    const resetButton = document.getElementById('resetButton');
    resetButton.style.outline='solid 5px hsl(213,80%,80%)';
    resetButton.style.outlineOffset='-5px';
  }

  btnLeave(){
    const button = document.getElementById('button');
    button.style.outline='none';
    const resetButton = document.getElementById('resetButton');
    resetButton.style.outline='none';
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
      return(
        `${('0'+String(Math.floor(this.state.remainTime / 60))).slice(-2)}:${('0'+String(Math.floor(this.state.remainTime % 60))).slice(-2)}`
      );
  }
  

  startTimer(){
    //startTimerが起動したら、params()でstartButtonとbtnMessageの内容を書き換える。
    this.setState(this.params(false));
     // setInterval()を使用し、1000ミリ秒ごとにthis.state.remainTimeが更新されるようにします。
    this.timerId=setInterval(()=>{
      // remainTimeが0になったらclearInterval()で処理をストップさせます。
      if(this.state.remainTime===0){
        this.setState({
          clockBoard:'Time Up!!', 
          //カウントが0になったら、ボタンの内容を「START」に切り替えます。
          startButton:true,
          btnMessage:'START'
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
      clockBoard:`${('0' + String(Math.floor(this.props.totalTime / 60))).slice(-2)}:00`,
    });
    this.setState(this.params(true));
  };
  

  render(){
    return(
      <div className={this.props.className}> 
        <p style={this.clockStyle}>{this.state.clockBoard}</p>
        <p style={this.cycleStyle}>{this.state.cycle}</p>
        <p id="button" style={this.btnStyle} onMouseEnter={this.btnHover} onMouseLeave={this.btnLeave} onClick={this.handleTimer}>{this.state.btnMessage}</p>
        <p id="resetButton" style={this.btnStyle} onMouseEnter={this.resetButtonHover} onMouseLeave={this.btnLeave} onClick={this.resetTimer}>RESET</p>
      </div>
    );
  }
}

export default Timer;