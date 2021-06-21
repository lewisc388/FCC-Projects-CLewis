// A list that contains various popular quotes. This list can be freely expanded.
const quotes = [
{
  quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  author: "Nelson Mandela" },

{
  quote: "Don’t cry because it’s over, smile because it happened.",
  author: "Dr. Seuss" },

{
  quote: "I’m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can’t handle me at my worst, then you sure as hell don’t deserve me at my best.",
  author: "Marilyn Monroe" },

{
  quote: "Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.",
  author: "Bernard M. Baruch" },

{
  quote: "Be yourself; everyone else is already taken.",
  author: "Oscar Wilde" },

{
  quote: "You know you’re in love when you can’t fall asleep because reality is finally better than your dreams.",
  author: "Dr. Seuss" },

{
  quote: "Don’t walk behind me; I may not lead. Don’t walk in front of me; I may not follow. Just walk beside me and be my friend.",
  author: "Albert Camus" },

{
  quote: "No one can make you feel inferior without your consent.",
  author: "Eleanor Roosevelt" },

{
  quote: "Imagination is the beginning of creation. You imagine what you desire; you will what you imagine; and at last you create what you will.",
  author: "George Bernard Shaw" },

{
  quote: "Success usually comes to those who are too busy to be looking for it.",
  author: "Henry David Thoreau" },

{
  quote: "I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
  author: "Maya Angelou" },

{
  quote: "No one can make you feel inferior without your consent.",
  author: "Eleanor Roosevelt" },

{
  quote: "What the mind of man can conceive and believe, the mind of man can achieve.",
  author: "Napoleon Hill" },

{
  quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  author: "Aristotle" },

{
  quote: "The fear of death follows from the fear of life. A man who loves fully is prepared to die at any time.",
  author: "Mark Twain" },

{
  quote: "There are no accidents; there is only some purpose that we haven’t yet understood.",
  author: "Deepak Chopra" },

{
  quote: "Be miserable. Or motivate yourself. Whatever has to be done, it’s always your choice.",
  author: "Wayne Dyer" },

{
  quote: "Impossible is a word to be found only in the dictionary of fools.",
  author: "Napoleon Bonaparte" },

{
  quote: "The only way of finding the limits of the possible is by going beyond them into the impossible.",
  author: "Arthur C. Clarke" },

{
  quote: "Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do. So throw off the bowlines, Sail away from the safe harbor, Catch the trade winds in your sails. Explore. Dream. Discover.",
  author: "Mark Twain" },

{
  quote: "It is hard to fail but it is worse never to have tried to succeed.",
  author: "Theodore Roosevelt" },

{
  quote: "People often say that motivation doesn’t last. Well, neither does bathing – that’s why we recommend it daily.",
  author: "Zig Ziglar" },

{
  quote: "What we can or cannot do, what we consider possible or impossible, is rarely a function of our true capability. It is more likely a function of our beliefs about who we are.",
  author: "Anthony Robbins" },

{
  quote: "There is just one life for each of us: our own.",
  author: "Euripides" },

{
  quote: "You only live once, but if you do it right, once is enough.",
  author: "Mae West" },

{
  quote: "To live is the rarest thing in the world. Most people exist, that is all.",
  author: "Oscar Wilde" },

{
  quote: "It is better to be hated for what you are than to be loved for what you are not.",
  author: "Andr Gide" },

{
  quote: "Remember, happiness doesn’t depend upon who you are or what you have, it depends solely upon what you think.",
  author: "Dale Carnegie" },

{
  quote: "We are all in the gutter, but some of us are looking at the stars.",
  author: "Oscar Wilde" },

{
  quote: "That which does not kill us makes us stronger.",
  author: "Friedrich Nietzsche" },

{
  quote: "The only man who never makes mistakes is the man who never does anything.",
  author: "Theodore Roosevelt" },

{
  quote: "Man’s mind, once stretched by a new idea, never regains its original dimensions.",
  author: "Oliver Wendell Holmes, Jr" },

{
  quote: "Imperfection is beauty, madness is genius and it’s better to be absolutely ridiculous than absolutely boring.",
  author: "Marilyn Monroe" }];



const colorPalette = [
{ light: '#FA352D', dark: '#7A1916' },
{ light: "#FA742B", dark: "#7A3815" },
{ light: "#FAB338", dark: "#7A571B" },
{ light: "#FADB38", dark: "#7A6A1B" },
{ light: "#C3FA38", dark: "#5F7A1B" },
{ light: "#43FA3D", dark: "#207A1D" },
{ light: "#48FA9B", dark: "#237A4C" },
{ light: "#59FAF6", dark: "#2C7A79" },
{ light: "#54AFFA", dark: "#2A567A" },
{ light: "#4660FA", dark: "#222F7A" },
{ light: "#8142FA", dark: "#40207A" },
{ light: "#D94EFA", dark: "#6A267A" },
{ light: "#FA42A8", dark: "#7A2052" }];


// Quoter controls the rendering and generation of random quotes.
class Quoter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: "",
      author: "",
      colorCounter: 0,
      lightColor: "",
      darkColor: "" };

    this.displayNewQuote = this.displayNewQuote.bind(this);
  }

  // displayNewQuote will generate a random number from 0 - the length
  // of the available quote array.
  displayNewQuote() {
    let quoteNum = Math.floor(Math.random() * (quotes.length - 1));

    let colorNum = this.state.colorCounter + 1;
    if (colorNum >= colorPalette.length) {
      colorNum = 0;
    }

    this.setState({
      quote: quotes[quoteNum].quote,
      author: quotes[quoteNum].author,
      colorCounter: colorNum,
      lightColor: colorPalette[colorNum].light,
      darkColor: colorPalette[colorNum].dark });

  }

  // When the application first mounts, the application will find
  // a random quote to display by calling displayNewQuote.
  componentDidMount() {
    this.displayNewQuote();
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("body", { style: { backgroundColor: this.state.lightColor } }, /*#__PURE__*/


      React.createElement("div", { id: "quote-box", style: { backgroundColor: this.state.darkColor }, className: "fade-in" }, /*#__PURE__*/


      React.createElement("div", { id: "text" }, /*#__PURE__*/
      React.createElement("h2", null, "\"", this.state.quote, "\"")), /*#__PURE__*/



      React.createElement("div", { id: "author" }, /*#__PURE__*/
      React.createElement("h3", null, "- ", this.state.author)), /*#__PURE__*/



      React.createElement("button", {
        id: "new-quote",
        onClick: this.displayNewQuote,
        style: { backgroundColor: this.state.lightColor },
        className: "btn" }, "Next Quote"), /*#__PURE__*/





      React.createElement("a", {
        id: "tweet-quote",
        target: "_blank",
        rel: "noopener noreferrer",
        href: `https://twitter.com/intent/tweet?text=${this.state.quote} - ${this.state.author}` }, /*#__PURE__*/

      React.createElement("button", {
        id: "tweet-button",
        className: "btn" }, /*#__PURE__*/

      React.createElement("i", { className: "fa fa-twitter", style: { color: "#ffffff" } }))))));






  }}

ReactDOM.render( /*#__PURE__*/React.createElement(Quoter, null), document.getElementById("root"));