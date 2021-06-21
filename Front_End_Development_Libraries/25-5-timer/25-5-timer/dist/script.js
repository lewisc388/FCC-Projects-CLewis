const playI = /*#__PURE__*/React.createElement("i", { class: "fas fa-play" });
const pauseI = /*#__PURE__*/React.createElement("i", { class: "fas fa-pause" });
const beepp = "https://freesound.org/data/previews/320/320181_274531-lq.mp3";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessTime: 25,
      breakTime: 5,
      curSecs: 1500,
      playPause: 'Set',
      running: false,
      timeType: "Session",
      timerInterval: null };

    this.audioBeep = React.createRef();

    this.setTimer = this.setTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.adjustSession = this.adjustSession.bind(this);
    this.adjustBreak = this.adjustBreak.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.minutesToSecs = this.minutesToSecs.bind(this);
    /*this.runTimer = this.runTimer.bind(this);*/
    this.decreaseTime = this.decreaseTime.bind(this);
    this.controlPhase = this.controlPhase.bind(this);
  }

  secondsToTime(secs) {
    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);
    minutes = minutes.toString();

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);
    seconds = seconds.toString();

    minutes = minutes.length < 2 ? "0" + minutes : minutes;
    seconds = seconds.length < 2 ? "0" + seconds : seconds;

    let obj = minutes + ":" + seconds;
    return obj;
  }

  minutesToSecs(mins) {
    return mins * 60;
  }

  adjustSession(e) {
    let curId = e.target.id;
    let curLen = this.state.sessTime;

    if (this.state.playPause != "play") {
      if (curId === "session-decrement" && curLen > 1) {
        curLen -= 1;
        this.setState({
          sessTime: curLen,
          curSecs: this.minutesToSecs(curLen) });

      } else
      if (curId === "session-increment" && curLen < 60) {
        curLen += 1;
        this.setState({
          sessTime: curLen,
          curSecs: this.minutesToSecs(curLen) });

      }
    }
  }

  adjustBreak(e) {
    let curId = e.target.id;
    let curLen = this.state.breakTime;

    if (this.state.playPause != "play") {
      if (curId === "break-decrement" && curLen > 1) {
        curLen -= 1;
        this.setState({
          breakTime: curLen });

      } else
      if (curId === "break-increment" && curLen < 60) {
        curLen += 1;
        this.setState({
          breakTime: curLen });

      }
    }
  }

  /*
  runTimer(){
    if (this.state.playPause === 'Play'){
      this.setState({
        running: true,
        timerInterval: setInterval(() => {
        this.decreaseTime();
        this.controlPhase();
      }, 1000)});
    } else {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);
       this.setState({
        running: false,
        timerInterval: null
      });
    }
  }*/


  decreaseTime() {
    this.setState({ curSecs: this.state.curSecs - 1 });
  }

  controlPhase() {
    if (this.state.curSecs === 0) {
      //Play audio
      this.audioBeep.current.play();
    } else if (this.state.curSecs === -1) {
      if (this.state.timeType === 'Session') {
        //start break timer
        this.setState({
          timeType: 'Break',
          curSecs: this.minutesToSecs(this.state.breakTime) });

      } else {
        //start session timer
        this.setState({
          timeType: 'Session',
          curSecs: this.minutesToSecs(this.state.sessTime) });

      }
    }
  }

  setTimer() {
    let curState = this.state.playPause;
    if (curState === "Set" || curState === "Pause") {
      if (this.state.timeType === "Session") {
      } else {
      }
      this.setState({
        playPause: "Play",
        running: true,
        timerInterval: setInterval(() => {
          this.decreaseTime();
          this.controlPhase();
        }, 1000) });
    } else
    if (curState === "Play") {
      this.audioBeep.current.pause();
      this.audioBeep.current.currentTime = 0;
      this.state.timerInterval && clearInterval(this.state.timerInterval);

      this.setState({
        playPause: "Pause",
        running: false,
        timerInterval: null });

    }

  }

  resetTimer() {
    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval(this.state.timerInterval);

    this.setState({
      sessTime: 25,
      breakTime: 5,
      curSecs: 1500,
      playPause: 'Set',
      running: false,
      timeType: 'Session',
      timerInterval: null });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "main-container" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-container" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-box" }, /*#__PURE__*/
      React.createElement("div", { id: "timer-label" }, this.state.timeType), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.secondsToTime(this.state.curSecs)), /*#__PURE__*/
      React.createElement("div", { id: "play-stop-container" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", onClick: this.setTimer }, this.state.running ? pauseI : playI), /*#__PURE__*/
      React.createElement("button", { id: "reset", onClick: this.resetTimer }, /*#__PURE__*/React.createElement("i", { class: "fas fa-redo" }))))), /*#__PURE__*/



      React.createElement("div", { id: "sesbrk-container" }, /*#__PURE__*/
      React.createElement("div", { id: "session-box", className: "mod-box" }, /*#__PURE__*/
      React.createElement("div", { id: "session-label", className: "box-label" }, "Session"), /*#__PURE__*/
      React.createElement("div", { className: "addsub-container" }, /*#__PURE__*/
      React.createElement("button", { id: "session-decrement", onClick: this.adjustSession }, "-"), /*#__PURE__*/
      React.createElement("div", { id: "session-length", className: "lengths", title: "Time in minutes" }, this.state.sessTime), /*#__PURE__*/
      React.createElement("button", { id: "session-increment", onClick: this.adjustSession }, "+"))), /*#__PURE__*/


      React.createElement("div", { id: "break-box", className: "mod-box" }, /*#__PURE__*/
      React.createElement("div", { id: "break-label", className: "box-label" }, "Break"), /*#__PURE__*/
      React.createElement("div", { className: "addsub-container" }, /*#__PURE__*/
      React.createElement("button", { id: "break-decrement", onClick: this.adjustBreak }, "-"), /*#__PURE__*/
      React.createElement("div", { id: "break-length", className: "lengths", title: "Time in minutes" }, this.state.breakTime), /*#__PURE__*/
      React.createElement("button", { id: "break-increment", onClick: this.adjustBreak }, "+")))), /*#__PURE__*/



      React.createElement("audio", { id: "beep", preload: "auto", src: "https://freesound.org/data/previews/131/131348_1513948-lq.mp3", ref: this.audioBeep })));


  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));