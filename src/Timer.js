// import React, {Component} from 'react';

// class Timer extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       remainTime: 1500,  //初期の残り時間は25分(=1500秒)
//       label: '25:00'
//     };    
//     this.startTimer = this.startTimer.bind(this);
//   }
  
//   timerStyle = {
//     fontSize: '40px',
//     color: 'hsl(213,100%,69%)'
//   }

//   btnStyle = {
//     fontSize: '20px',
//     padding: '10px',
//   }

//   startTimer(){
//     const timerId = setInterval(()=>{
//       if(this.state.remainTime===0){
//         this.setState({
//           label:'Time Up!!'
//         });
//         clearInterval(timerId);
//       }else{
//         this.setState((state)=>{
//           return{
//             remainTime: --state.remainTime,
//             label:`${Math.floor(state.remainTime / 60)}:${state.remainTime % 60}`
//           };
//         });  
//       }
//     },1000);
//   }

//   render(){
//     return <div>
//       <p style={this.timerStyle}>{this.state.label}</p>
//       <p style={this.btnStyle} onClick={this.startTimer}>スタート</p>
//     </div>
//   }
// }

// export default Timer;