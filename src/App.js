import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Brick from './components/Brick'
import Header from './components/Header'

class App extends Component {
  constructor () {
    super()
    this.state = {
      difficulty: 'medium',
      hitMine: false,
      isSetup: false,
      flagOn: false,
      numMines: 50,
      userInput: '',
      gameHeight: 20,
      gameWidth: 30,
      mines: [],
      minesFlagged: 0,
      hidden: [],
      flags: [],
      wonGame: false
    }

    this.toggleFlag = this.toggleFlag.bind(this)
    this.newGame = this.newGame.bind(this)
    this.clearBlanks = this.clearBlanks.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
    this.placeFlag = this.placeFlag.bind(this)
    this.toggleSetup = this.toggleSetup.bind(this)
  }

  toggleFlag() {
    this.setState({flagOn: !this.state.flagOn})
  }

  randomMines (boxesArray) {
    let mines = []
    for (let i = 0; i < this.state.numMines; i++){
      mines[i] = boxesArray[Math.floor(Math.random() * boxesArray.length)]
    }
    this.setState({mines: mines})
  }

  endGame () {
    this.setState({hitMine: !this.state.hitMine})
  }

  placeMines (boxesArray) {
    let mines = this.state.mines
    let minesArray = []

    for (let i = 0; i < boxesArray.length; i++) {
      let count = 0;
      if (mines.includes(boxesArray[i])){
        minesArray[i] = 'm'
      }
      else {
        if (mines.includes(boxesArray[i-this.state.gameWidth-1])  && i % this.state.gameWidth != 0){
          count++
        }
        if (mines.includes(boxesArray[i-this.state.gameWidth])){
          count++
        }
        if (mines.includes(boxesArray[i-this.state.gameWidth+1])  && (i + 1) % this.state.gameWidth != 0){
          count++
        }
        if (mines.includes(boxesArray[i-1]) && i % this.state.gameWidth != 0){
          count++
        }
        if (mines.includes(boxesArray[i+1]) && (i + 1) % this.state.gameWidth != 0){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameWidth-1])  && i % this.state.gameWidth != 0){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameWidth])){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameWidth+1])  && (i + 1) % this.state.gameWidth != 0){
          count++
        }
        minesArray[i] = count

        if (minesArray[i] === 0){
          minesArray[i] = ' '
        }
      }
    }
    return minesArray
  }

  gameWon = () => {
    let hiddenArray = []
    for (let i = 0; i < this.state.hidden.length; i++){
      hiddenArray[i] = false
    }

    this.setState({hidden: hiddenArray})
    this.setState({wonGame: true})
  }

  newGame (boxesArray) {
    this.randomMines(boxesArray)
    let hiddenArray = []
    for (let i = 0; i < boxesArray.length; i++){
      hiddenArray[i] = true
    }

    this.setState({hidden: hiddenArray})
    this.setState({flags: []})
    this.setState({hitMine: false})
    this.setState({minesFlagged: 0})
    this.setState({wonGame: false})

  }

  minesFlagged () {
    this.setState({minesFlagged: this.state.minesFlagged - 1})
  }

  flagsCorrect = () => {
    for (let i = 0; i < this.state.mines.length; i++) {
      if (!this.state.flags.includes(this.state.mines[i])) {
        return false
      }
    }
    return true
  }

  placeFlag (contents, array, index){
    if (array[index] === true){
      let flags = this.state.flags.slice()
      if (this.state.flags.includes(index)){
        let ind = flags.indexOf(index)
        flags.splice(ind, 1)
        this.setState({minesFlagged: this.state.minesFlagged - 1})
      }
      else {
        if(this.state.flags.length >= this.state.numMines) {
          return
        }
        flags.push(index)
        this.setState({minesFlagged: this.state.minesFlagged + 1})
      }
      
      this.setState({flags: flags})
    }
  }

  toggleHidden (contents, array, index) {
    if (this.state.hitMine) {
      return
    }
    if (contents === 'flag'){

    }
    else {
      if (contents[index] === 'm'){
        this.setState({hitMine: true})
      }
      let newHidden = this.clearBlanks(contents, array, index)
      let flagArray = []
      for (let i = 0; i < this.state.flags.length; i ++) {
        if (this.state.hidden[this.state.flags[i]]) {
          flagArray.push(this.state.flags[i])
        }
      }

      this.setState({hidden: newHidden, flags: flagArray, minesFlagged: flagArray.length})
    }
  }

  clearBlanks (contents, array, index) {
    if (array[index] === false){
      return array
    }
    if(contents[index] === ' '){
      array[index] = false
      if (index >= this.state.gameWidth){
        array = this.clearBlanks(contents, array, index - this.state.gameWidth)
      }
      if (index < this.state.gameWidth*this.state.gameHeight - this.state.gameWidth){
        array = this.clearBlanks(contents, array, index + this.state.gameWidth)
      }
      if (index % this.state.gameWidth !== 0){
        array = this.clearBlanks(contents, array, index - 1)
      }
      if (index % this.state.gameWidth !== this.state.gameWidth -1){
        array = this.clearBlanks(contents, array, index + 1)
      }
      return array
    }
    else {
      array[index] = false
      return array
    }
  }

  genColumns = () => {
    let autoStr = ''

    for (let i = 0; i < this.state.gameWidth; i++) {
      autoStr += 'auto '
    }

    return autoStr
  }

  toggleSetup = () => {
    if (!this.state.isSetup) {
      document.getElementById(this.state.difficulty).click()
    }

    this.setState({isSetup: !this.state.isSetup})
  }

  changeSettings = (difficulty) => {
    document.getElementById('easy').checked = false
    document.getElementById('medium').checked = false
    document.getElementById('hard').checked = false

    document.getElementById(difficulty).checked = true

    let numBoxes = 0

    if (difficulty === 'easy') {
      this.setState({gameHeight: 15, gameWidth: 15, numMines: 10})
      numBoxes = 15 * 15
    }
    else if (difficulty === 'medium') {
      numBoxes = 20*30
      this.setState({gameHeight: 20, gameWidth: 30, numMines: 50})
    }
    else {
      numBoxes = 35 * 40
      this.setState({gameHeight: 35, gameWidth: 40, numMines: 200})
    }

    let boxesArray = []
    for (let i = 0; i < numBoxes; i++){
      boxesArray[i]  = i
    }
    this.newGame(boxesArray)

    this.setState({difficulty: difficulty})
  }

  render () {
    let numBoxes = this.state.gameWidth * this.state.gameHeight
    let boxesArray = []
    for (let i = 0; i < numBoxes; i++){
      boxesArray[i]  = i
    }

    let contentsArray = this.placeMines(boxesArray)
    
    let flag = ''
    if (this.state.flagOn){
      flag = 'on'
    }
    else {
      flag = 'off'
    }


    if (this.flagsCorrect() && !this.state.wonGame) {
      this.gameWon()
    }

    if (this.state.hitMine){
      return (
        <div className='App'>
          <div className='game'>
            <Header toggleSetup={this.toggleSetup} wonGame={this.state.wonGame} hitMine={this.state.hitMine} numMines={this.state.numMines} minesFlagged={this.state.minesFlagged} boxesArray={boxesArray} newGame={this.newGame} toggleFlag={this.toggleFlag} flag={flag}/>
            <div className='grid-container' style={{'display': 'grid', 'grid-template-columns': this.genColumns()}}>
              {contentsArray.map((elem, ind) => {
                return <Brick flags={this.state.flags} hiddenArray={this.state.hidden} contentsArray={contentsArray} toggleHidden={this.toggleHidden} index={ind} hidden={this.state.hidden[ind]} key={ind} contents={elem}/>
              })}
            </div>
          </div>
          <div className={`setup-menu-${this.state.isSetup}`}>
          <h2>Game Options</h2>
          <span>
            <p>Easy</p>
            <input id='easy' type='checkbox' onClick={() => this.changeSettings('easy')}></input>
          </span>
          <span>
            <p>Medium</p>
            <input id='medium' type='checkbox' onClick={() => this.changeSettings('medium')}></input>
          </span>
          <span>
            <p>Hard</p>
            <input id='hard' type='checkbox' onClick={() => this.changeSettings('hard')}></input>
          </span>
        </div>
        </div>
      )
    }
    else if (this.state.flagOn){
      return (
        <div className='App'>
          <div className='game'>
            <Header toggleSetup={this.toggleSetup} wonGame={this.state.wonGame} hitMine={this.state.hitMine} numMines={this.state.numMines} minesFlagged={this.state.minesFlagged} boxesArray={boxesArray} newGame={this.newGame} toggleFlag={this.toggleFlag} flag={flag}/>
            <div className='grid-container'  style={{'display': 'grid', 'grid-template-columns': this.genColumns()}}>
              {contentsArray.map((elem, ind) => {
                return <Brick flags={this.state.flags} hiddenArray={this.state.hidden} contentsArray={contentsArray} toggleHidden={this.placeFlag} index={ind} hidden={this.state.hidden[ind]} key={ind} contents={elem}/>
              })}
            </div>
          </div>
          <div className={`setup-menu-${this.state.isSetup}`}>
          <h2>Game Options</h2>
          <span>
            <p>Easy</p>
            <input id='easy' type='checkbox' onClick={() => this.changeSettings('easy')}></input>
          </span>
          <span>
            <p>Medium</p>
            <input id='medium' type='checkbox' onClick={() => this.changeSettings('medium')}></input>
          </span>
          <span>
            <p>Hard</p>
            <input id='hard' type='checkbox' onClick={() => this.changeSettings('hard')}></input>
          </span>
        </div>
        </div>
      )
    }
    else {
      return (
        <div className='App'>
          <div className='game'>
            <Header toggleSetup={this.toggleSetup} wonGame={this.state.wonGame} hitMine={this.state.hitMine} numMines={this.state.numMines} minesFlagged={this.state.minesFlagged} boxesArray={boxesArray} newGame={this.newGame} toggleFlag={this.toggleFlag} flag={flag}/>
            <div className='grid-container'  style={{'display': 'grid', 'grid-template-columns': this.genColumns()}}>
              {contentsArray.map((elem, ind) => {
                return <Brick flags={this.state.flags} flagOn={this.state.flagOn} hiddenArray={this.state.hidden} contentsArray={contentsArray} toggleHidden={this.toggleHidden} index={ind} hidden={this.state.hidden[ind]} key={ind} contents={elem}/>
              })}
            </div>
          </div>
          <div className={`setup-menu-${this.state.isSetup}`}>
          <h2>Game Options</h2>
          <span>
            <p>Easy</p>
            <input id='easy' type='checkbox' onClick={() => this.changeSettings('easy')}></input>
          </span>
          <span>
            <p>Medium</p>
            <input id='medium' type='checkbox' onClick={() => this.changeSettings('medium')}></input>
          </span>
          <span>
            <p>Hard</p>
            <input id='hard' type='checkbox' onClick={() => this.changeSettings('hard')}></input>
          </span>
        </div>
        </div>
      )
    }
  }
}

export default App;
