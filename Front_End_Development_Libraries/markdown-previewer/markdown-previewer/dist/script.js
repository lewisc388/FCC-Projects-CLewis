marked.setOptions({
  breaks: true });

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      markdown: "" };


    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      input: event.target.value,
      markdown: marked(event.target.value, { renderer: renderer }) });

  }
  componentDidMount() {
    this.setState({
      input: sample,
      markdown: marked(sample, { renderer: renderer }) });

  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "editor-box" }, /*#__PURE__*/
      React.createElement("div", { id: "editor-toolbar" }, "Editor"), /*#__PURE__*/
      React.createElement("div", { id: "editor-wrap" }, /*#__PURE__*/
      React.createElement("textarea", { id: "editor", type: "text", onChange: this.handleChange, value: this.state.input }))), /*#__PURE__*/


      React.createElement("div", { id: "preview-box" }, /*#__PURE__*/
      React.createElement("div", { id: "preview-toolbar" }, "Markdown Preview"), /*#__PURE__*/
      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: this.state.markdown } }))));



  }}




const sample = `# Welcome to my React Markdown Previewer!

## This is a sub-heading or H2,
### and this is a second sub-heading also known as H3!

Here is some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

Here, we can make the text **bold**,
Or _italic_.
Or even **_both!_**
And for mistakes, we can ~~cross stuff out~~.

There is also [links](https://www.freecodecamp.com), and even
> Block Quotes

Dont forget about tables:

Header A | Header B | Header C
------------ | ------------- | -------------
A1 | B1 | C1
A2 | B2 | C2

- Of course there are lists.
  - Some are bulleted
     - with different indentation levels
        - such as this.


1. We can make numbered lists,
2. but if desired: 
3. And last but not least, embedded images:

![React Logo](https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png)
`;

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('app'));