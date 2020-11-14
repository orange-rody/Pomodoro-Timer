import React, {Component} from 'react';

class Timer extends Component{
  constructor(props){
    super(props);
    this.state = {
      remainTime: 1500,  // 初期のremainTime(=残り時間)は25分(=1500秒)とします。
      label: '25:00'
    };
    //startTimer()とstopTimer()にthisをバインドして、this.timerIdを読み取れるようにします。
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }
  
  timerStyle = {
    fontSize: '40px',
    color: 'hsl(213,100%,55%)'
  }

  btnStyle = {
    fontSize: '15px',
    width: '80px',
    padding: '10px',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'hsl(213,80%,60%)',
  }

  startTimer(){
     // setInterval()を使用し、1000ミリ秒ごとにthis.state.remainTimeが更新されるようにします。
    this.timerId = setInterval(() => {
      // remainTimeが0になったらclearInterval()で処理をストップさせます。
      if(this.state.remainTime === 0){
        this.setState({
          label: 'Time Up!!'
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
            remainTime: -- state.remainTime,
            /* 
            Math.floor(state.remainTime/60)で「分」を、Math.floor(state.remainMin)で「秒」をそれぞれ算出します。
            「分」と「秒」をそのままの形でlabelにsetState()してしまうと、例えば9分4秒は「9:4」と一桁で表示されてしまうので、「09:04」といった風に二桁で表示されるようにする必要があります。
            「分」と「秒」がそれぞれ10秒未満となるか否かでif文を書くこともできますが、コードの量が増えてしまうので別の方法をとります。
            ① String()を使って、Math.floor以下を文字列型に変換します。
            ② Math.floor~に'0'をくっつけます。
            ③ ①と②で作った文字列からslice()を使って、引数に(-2)を指定し、最後から数えて二つ目以降の文字を取り出します。
               例：[10分15秒の場合] 010:015 => 10:15
                   [ 9分 4秒の場合]  09: 04 => 09:04
                   slice()で終了インデックスを省略した場合は、「開始インデックス以降の全ての文字を取り出す」という処理を行います。
            */
            label:`${('0' + String(Math.floor(state.remainTime / 60))).slice(-2)}:${('0' + String(Math.floor(state.remainTime % 60))).slice(-2)}` 
          }
        }); 
      }
    },1000);
  }

  stopTimer(){
    clearInterval(this.timerId);
  }

  render(){
    return <div>
      <p style={this.timerStyle}>{this.state.label}</p>
      <p style={this.btnStyle} onClick={this.startTimer}>スタート</p>
      <p style={this.btnStyle} onClick={this.stopTimer}>ストップ</p>
    </div>
  }
}

export default Timer;