import React from 'react'

function Header (props) {
  let ind = ''
  if (props.wonGame) {
    ind = 'wonGame'
  }
  else if (props.hitMine) {
    ind = 'hitMine'
  }
  else {
    ind = 'image'
  }
  return (
    <div className='header'>
      <div className='game-section'>
        <button onClick={() => props.toggleFlag()} className={`flag-${props.flag}`}>Flag</button>
        <div onClick={() => props.newGame(props.boxesArray)} className={`${ind}`}></div>
        <div className='mines-left'>
          <p>{props.numMines - props.minesFlagged}</p>
        </div>
      </div>
      <button onClick={() => props.toggleSetup()} className='setup-button'>Game Setup</button>
    </div>
  )
}

export default Header 