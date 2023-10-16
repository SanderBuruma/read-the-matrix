import React, {Component} from "react";

export default class Matrix extends Component {
  constructor(props) {
    super(props)
    const text = props.text.replace(/ /g, '+')
    const characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+'
    const currentText = this.inititialText(text.length, characterSet)
    const charRandom = props.charRandom
    const updateRandom = props.updateRandom

    this.state = { text, characterSet, currentText, charRandom, updateRandom }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 20);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  inititialText(len, characterSet) {
    let newText = ''
    for (let i = 0; i < len; i++){
      newText += this.randomChar(characterSet)
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
      // First check by charRandom if we should update the current character
      if (Math.random() > this.state.updateRandom) {
        // Check again to see if we should assign a random character
        if (Math.random() > this.state.charRandom) {
          // No
          newText += this.state.text[i]
        } else {
          // Yes
          const newChar = this.randomChar(this.state.characterSet)
          const textChar = this.state.text[i]
          if (!/[a-zA-Z]/.test(textChar)) {
            newText += newChar
            continue
          }
          const isLowerCase = textChar.toLowerCase() === textChar
          newText += isLowerCase ? newChar.toLowerCase() : newChar.toUpperCase()
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