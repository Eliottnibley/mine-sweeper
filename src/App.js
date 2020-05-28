import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Brick from './components/Brick'
import Header from './components/Header'

class App extends Component {
  constructor () {
    super()
    this.state = {
      hitMine: false,
      isSetup: false,
      flagOn: false,
      numMines: 60,
      userInput: '',
      gamewidth: 25,
      gameHeight: 20,
      mines: [],
      minesFlagged: 0,
      hidden: []
    }

    this.toggleFlag = this.toggleFlag.bind(this)
    this.newGame = this.newGame.bind(this)
    this.clearBlanks = this.clearBlanks.bind(this)
    this.toggleHidden = this.toggleHidden.bind(this)
    this.noToggleHidden = this.noToggleHidden.bind(this)
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
        if (mines.includes(boxesArray[i-this.state.gameHeight-1])){
          count++
        }
        if (mines.includes(boxesArray[i-this.state.gameHeight])){
          count++
        }
        if (mines.includes(boxesArray[i-this.state.gameHeight+1])){
          count++
        }
        if (mines.includes(boxesArray[i-1])){
          count++
        }
        if (mines.includes(boxesArray[i+1])){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameHeight-1])){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameHeight])){
          count++
        }
        if (mines.includes(boxesArray[i+this.state.gameHeight+1])){
          count++
        }
        minesArray[i] = count

        if (minesArray[i] === 0){
          minesArray[i] = ''
        }
      }
    }
    return minesArray
  }

  newGame (boxesArray) {
    this.randomMines(boxesArray)
    let hiddenArray = []
    for (let i = 0; i < boxesArray.length; i++){
      hiddenArray[i] = true
    }
    this.setState({hidden: hiddenArray})
    this.setState({hitMine: false})
  }

  minesFlagged () {
    this.setState({minesFlagged: this.state.minesFlagged - 1})
  }

  noToggleHidden (contents, array, index){

  }

  toggleHidden (contents, array, index) {
    if (contents[index] === 'm'){
      this.setState({hitMine: true})
    }
    let newHidden = this.clearBlanks(contents, array, index)
    this.setState({hidden: newHidden})
  }

  clearBlanks (contents, array, index) {
    if (array[index] === false){
      return array
    }
    if(contents[index] === ''){
      array[index] = false
      if (index >= this.state.gameHeight){
        array = this.clearBlanks(contents, array, index - this.state.gameHeight)
      }
      if (index < this.state.gameHeight*this.state.gamewidth - this.state.gameHeight){
        array = this.clearBlanks(contents, array, index + this.state.gameHeight)
      }
      if (index % this.state.gameHeight !== 0){
        array = this.clearBlanks(contents, array, index - 1)
      }
      if (index % this.state.gameHeight !== this.state.gameHeight -1){
        array = this.clearBlanks(contents, array, index + 1)
      }
      return array
    }
    else {
      array[index] = false
      return array
    }
  }

  render () {
    let numBoxes = this.state.gameHeight * this.state.gamewidth
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

    if (this.state.isSetup){
      return (
        <div className='App'>
          <div className='game'>

          </div>
        </div>
      )
    }
    else {
      if (!this.state.hitMine){
        return (
          <div className='App'>
            <div className='game'>
              <Header hitMine={this.state.hitMine} numMines={this.state.numMines} minesFlagged={this.state.minesFlagged} boxesArray={boxesArray} newGame={this.newGame} toggleFlag={this.toggleFlag} flag={flag}/>
              <div className='grid-container'>
                {contentsArray.map((elem, ind) => {
                  return <Brick hiddenArray={this.state.hidden} contentsArray={contentsArray} toggleHidden={this.toggleHidden} index={ind} hidden={this.state.hidden[ind]} key={ind} contents={elem}/>
                })}
              </div>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className='App'>
            <div className='game'>
              <Header hitMine={this.state.hitMine} numMines={this.state.numMines} minesFlagged={this.state.minesFlagged} boxesArray={boxesArray} newGame={this.newGame} toggleFlag={this.toggleFlag} flag={flag}/>
              <div className='grid-container'>
                {contentsArray.map((elem, ind) => {
                  return <Brick hiddenArray={this.state.hidden} contentsArray={contentsArray} toggleHidden={this.noToggleHidden} index={ind} hidden={this.state.hidden[ind]} key={ind} contents={elem}/>
                })}
              </div>
            </div>
          </div>
        )
      }
    }
  }
}

export default App;
