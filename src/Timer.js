import React, {Component} from 'react';

class Timer extends Component{
  constructor(props){
    super(props);
    this.state={
      // 初期のremainTime(=残り時間)はprops.remainTimeから取得します。
      remainTime:props.remainTime*60,  
      // 初期のremainTime(=残り時間)から「分」を取得して、文字盤へ表示するために調整します。
      clockBoard:`${('0' + String(props.remainTime)).slice(-2)}:00`,
      startButton:'false',
      btnMessage:'START'
    };
    //startTimer()とstopTimer()にthisをバインドして、this.timerIdを読み取れるようにします。
    this.handleTimer=this.handleTimer.bind(this);
    this.startTimer=this.startTimer.bind(this);
    this.stopTimer=this.stopTimer.bind(this);
    this.resetTimer=this.resetTimer.bind(this);
  }
  
  clockStyle={
    fontSize:'60px',
    color:'hsl(213,100%,70%)',
    textAlign:'center',
    padding:'50px',
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

  handleTimer(){
    if(this.state.startButton===false){
      this.startTimer();
      this.setState({
        startButton:true,
        btnMessage:'STOP'
      });
    }else{
      this.stopTimer();
      this.setState({
        startButton:false,
        btnMessage:'START'
      });
    }
  }

  startTimer(){
     // setInterval()を使用し、1000ミリ秒ごとにthis.state.remainTimeが更新されるようにします。
    this.timerId=setInterval(()=>{
      // remainTimeが0になったらclearInterval()で処理をストップさせます。
      if(this.state.remainTime===0){
        this.setState({
          clockBoard:'Time Up!!', 
          //カウントが0になったら、ボタンの内容を「START」に切り替えます。
          startButton:false,
          btnMessage:'START'
        });
        clearInterval(this.timerId);
      }else{
        this.setState((state)=>{
          return{
            /* 
            「--(デクリメント演算子)」を書く位置に注意が必要です。
            「--」を変数の前に書いたら前置処理(処理を行ってから代入)、後に書いたら後置処理(代入してから処理となります。
            後置処理の場合、処理の結果は変数に反映されません。
            */
           remainTime:--state.remainTime,
            /* 
            Math.floor(state.remainTime/60)で「分」を、Math.floor(state.remainMin)で「秒」をそれぞれ算出します。
            「分」と「秒」をそのままの形でcloackBoardにsetState()してしまうと、例えば9分4秒は「9:4」と一桁で表示されてしまうので、「09:04」といった風に二桁で表示されるようにする必要があります。
            「分」と「秒」がそれぞれ10秒未満となるか否かでif文を書くこともできますが、コードの量が増えてしまうので別の方法をとります。
            ① String()を使って、Math.floor以下を文字列型に変換します。
            ② Math.floor~に'0'をくっつけます。
            ③ ①と②で作った文字列からslice()を使って、引数に(-2)を指定し、最後から数えて二つ目以降の文字を取り出します。
               例：[10分15秒の場合] 010:015 => 10:15
                   [ 9分 4秒の場合]  09: 04 => 09:04
                   slice()で終了インデックスを省略した場合は、「開始インデックス以降の全ての文字を取り出す」という処理を行います。
            */
            clockBoard:`${('0'+String(Math.floor(state.remainTime / 60))).slice(-2)}:${('0'+String(Math.floor(state.remainTime % 60))).slice(-2)}` 
          }
        }); 
      }
    },1000);
  }

  stopTimer(){
    //stopTimerのclearIntervalでカウントダウン処理をストップさせます。
    clearInterval(this.timerId);
  }

  resetTimer(){
    //リセットボタンを押したら、カウントダウン処理をストップさせた後、stateの内容を初期値に戻します。
    clearInterval(this.timerId);
    this.setState({
      remainTime:this.props.remainTime*60,
      clockBoard:`${('0' + String(this.props.remainTime)).slice(-2)}:00`,
      start:false,
      btnMessage:'START'
    });
  }

  render(){
    return <div className={this.props.className}> 
      <p style={this.clockStyle}>{this.state.clockBoard}</p>
      <p id="button" style={this.btnStyle} onMouseEnter={this.btnHover} onMouseLeave={this.btnLeave} onClick={this.handleTimer}>{this.state.btnMessage}</p>
      <p id="resetButton" style={this.btnStyle} onMouseEnter={this.resetButtonHover} onMouseLeave={this.btnLeave} onClick={this.resetTimer}>RESET</p>
    </div>
  }
}

export default Timer;