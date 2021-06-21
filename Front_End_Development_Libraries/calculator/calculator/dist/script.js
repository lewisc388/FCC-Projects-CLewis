class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
      data: '0',
      prevRes: '0' };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let val = e.target.value;
    let vers = e.target.className;
    let curVal = this.state.display;
    let history = this.state.data;
    let prev = this.state.prevRes;

    if (prev != '0') {
      history = prev;
      curVal = '0';
      prev = 'done';
    }
    console.log(val);

    if (vers == "nums" && prev != 'done') {
      if (val === ".") {
        if (curVal.includes(".") === false) {
          curVal += val;
        }
      } else {
        curVal += val;
      }
      /*After inputting numbers, if the first number is
      0, it is omitted.*/
      if (curVal.charAt(0) === '0') {
        curVal = curVal.substring(1);
      }
      this.setState({ display: curVal });

    } else
    if (vers == "ops") {
      // Clears the history and current data.
      if (val === "clear") {
        this.setState({
          display: '0',
          data: '0',
          prevRes: '0' });

      }

      // Proceed to calculate the history
      else if (val === "=") {
          if (curVal.includes("-")) {
            let newVal = "(" + curVal + ")";
            curVal = newVal;
          }
          history += curVal;
          let res = math.evaluate(history);
          history += val;
          history += res.toString();
          this.setState({
            display: res,
            data: history,
            prevRes: res.toString() });

        } else

        if (val === "/" || val === "*" || val === "+") {
          // Used to remove any leading zeros, as they
          // are arbritary to the calculation.
          if (history.charAt(0) === '0') {
            history = history.substring(1);
          }

          // Checks what the last operator is.
          let lastOp = history.charAt(history.length - 1);

          // If the user has not inputted a new number, then ignore
          // +0 or /0 or *0
          if (curVal === '0') {
            // If the user selects another operator, just after another
            // then the previous operator will be updated to the new one.
            if (lastOp === "/" || lastOp === "*" || lastOp === "+") {
              history = history.slice(0, -1);
              history += val;
            }
            if (history != '0') {
              history += val;
            }
            this.setState({
              display: "0",
              data: history,
              prevRes: '0' });

          } else if (curVal === '-') {
            if (lastOp === "/" || lastOp === "*" || lastOp === "+") {
              history = history.slice(0, -1);
              history += val;
            }
            this.setState({
              data: history,
              prevRes: '0' });

          } else {
            if (curVal.includes("-")) {
              let newVal = "(" + curVal + ")";
              curVal = newVal;
            }
            curVal += val;
            history += curVal;

            this.setState({
              display: '0',
              data: history,
              prevRes: '0' });

          }

        } else

        if (val === '-') {
          // Used to remove any leading zeros, as they
          // are arbritary to the calculation.
          if (history.charAt(0) === '0') {
            history = history.substring(1);
          }

          let lastOp = history.charAt(history.length - 1);

          if (curVal === "-") {
            if (lastOp === '-' || lastOp === '+' || lastOp === '/' || lastOp === '*') {
              this.setState({
                display: "0",
                data: history,
                prevRes: '0' });

            }
          } else if (curVal === "0") {
            if (lastOp === '-' || lastOp === '+' || lastOp === '/' || lastOp === '*') {
              this.setState({
                display: '-',
                data: history,
                prevRes: "0" });

            } else {
              curVal += val;
              history += curVal;
              this.setState({
                display: '0',
                data: history,
                prevRes: '0' });

            }
          } else {
            curVal += val;
            history += curVal;
            this.setState({
              display: '0',
              data: history,
              prevRes: '0' });

          }
        }
    }
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator" }, /*#__PURE__*/
      React.createElement("div", { id: "display-container" }, /*#__PURE__*/
      React.createElement("div", { id: "formula" }, this.state.data), /*#__PURE__*/
      React.createElement("div", { id: "display" }, this.state.display)), /*#__PURE__*/


      React.createElement("div", { id: "numbers" }, /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "seven", className: "nums", value: "7" }, "7"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "eight", className: "nums", value: "8" }, "8"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "nine", className: "nums", value: "9" }, "9"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "clear", className: "ops", value: "clear", title: "Clear" }, "CA"), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "four", className: "nums", value: "4" }, "4"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "five", className: "nums", value: "5" }, "5"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "six", className: "nums", value: "6" }, "6"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "add", className: "ops", value: "+", title: "Add" }, "+"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "subtract", className: "ops", value: "-", title: "Subtract" }, "-"), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "one", className: "nums", value: "1" }, "1"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "two", className: "nums", value: "2" }, "2"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "three", className: "nums", value: "3" }, "3"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "multiply", className: "ops", title: "Multiply", value: "*" }, "*"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "divide", className: "ops", title: "Divide", value: "/" }, "/"), /*#__PURE__*/
      React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "zero", className: "nums", value: "0" }, "0"), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "decimal", className: "nums", value: ".", title: "Decimal" }, "."), /*#__PURE__*/
      React.createElement("button", { onClick: this.handleClick, id: "equals", className: "ops", value: "=", title: "Calculate" }, /*#__PURE__*/React.createElement("b", null, "=")))));



  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("app"));