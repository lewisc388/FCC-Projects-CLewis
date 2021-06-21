const keySounds = [
{
  id: 'Heater-1',
  keyCode: 81,
  keyLetter: 'Q',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },

{
  id: 'Heater-2',
  keyCode: 87,
  keyLetter: 'W',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },

{
  id: 'Heater-3',
  keyCode: 69,
  keyLetter: 'E',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },

{
  id: 'Heater-4',
  keyCode: 65,
  keyLetter: 'A',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' },

{
  id: 'Heater-6',
  keyCode: 83,
  keyLetter: 'S',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },

{
  id: 'Dsc-Oh',
  keyCode: 68,
  keyLetter: 'D',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },

{
  id: 'Kick_n_Hat',
  keyCode: 90,
  keyLetter: 'Z',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },

{
  id: 'RP4_KICK-1',
  keyCode: 88,
  keyLetter: 'X',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },

{
  id: 'Cev_H2',
  keyCode: 67,
  keyLetter: 'C',
  audioLink: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayText: '- - - - -' };

    this.createPad = this.createPad.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyRelease);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
    document.removeEventListener('keyup', this.handleKeyRelease);
  }

  handleKeyPress(e) {
    let keyPress = event.keyCode;
    for (let items in keySounds) {
      if (keySounds[items].keyCode === keyPress) {
        document.getElementById(keySounds[items].keyLetter).play();
        let element = document.getElementById(keySounds[items].id);
        ReactDOM.findDOMNode(element).classList.add("enabled");
        this.setState({
          displayText: keySounds[items].id });

      }
    }
  }
  handleKeyRelease(e) {
    let keyPress = event.keyCode;
    for (let items in keySounds) {
      if (keySounds[items].keyCode === keyPress) {
        let element = document.getElementById(keySounds[items].id);
        ReactDOM.findDOMNode(element).classList.remove("enabled");
        this.setState({
          displayText: keySounds[items].id });

      }
    }
  }

  handleClick(e) {
    //play audio
    document.getElementById(e.target.value).play();
    this.setState({
      displayText: e.target.id });

  }

  createPad() {
    let pad = [];
    let row = [];
    let counter = 0;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        row.push( /*#__PURE__*/
        React.createElement("button", {
          className: "drum-pad",
          id: keySounds[counter].id,
          onClick: this.handleClick,
          value: keySounds[counter].keyLetter },

        keySounds[counter].keyLetter, /*#__PURE__*/
        React.createElement("audio", { id: keySounds[counter].keyLetter, className: "clip", src: keySounds[counter].audioLink })));



        counter += 1;
      }
      pad.push(row);
      pad.push( /*#__PURE__*/React.createElement("br", null));
      row = [];
    }
    return pad;
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "drum-machine" }, /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.state.displayText), /*#__PURE__*/
      React.createElement("div", { id: "drum-container" },
      this.createPad())));



  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));