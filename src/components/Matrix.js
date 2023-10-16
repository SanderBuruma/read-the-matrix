import React, {Component} from "react";

export default class Matrix extends Component {
  constructor(props) {
    super(props)
    console.log({props})
    const text = props.text
    const characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+'
    const currentText = this.inititialText(text, characterSet)
    const randomness = props.randomness

    this.state = { text, characterSet, currentText, randomness }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 90);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  inititialText(text, characterSet, randomness) {
    let newText = ''
    for (let i = 0; i < text.length; i++){
      if (text[i] === '+') {
        newText+='+'
      } else {
        newText+= Math.random() > randomness ** .5 ? 
        text[i] : 
        this.randomChar(characterSet)
      }
    }

    return newText
  }

  randomChar(charSet) {
    return charSet[Math.floor(Math.random()*charSet.length)]
  }

  tick() {
    this.setState({ currentText: this.updateText() })
  }

  updateText(props) {
    let newText = ''

    for (let i = 0; i < this.state.currentText.length; i++)
    {
      // First check by randomness if we should update the text
      if (Math.random() > this.state.randomness) {
        // Check again to see if we should assign a random character
        if (Math.random() > this.state.randomness) {
          // No
          newText += this.state.text[i]
        } else {
          // Yes
          newText += this.randomChar(this.state.characterSet)
        }
      } else {
        newText += this.state.currentText[i]
      }
    }

    return newText
  }

  render() {
    return <h1><code>{this.state.currentText}</code></h1>
  }
}