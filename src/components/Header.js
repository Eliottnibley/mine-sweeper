import React from 'react'

function Header (props) {
  return (
    <div className='header'>
      <button onClick={() => props.toggleFlag()} className={`flag-${props.flag}`}>Flag</button>
      <div onClick={() => props.newGame(props.boxesArray)} className='image'></div>
      <div className='mines-left'>
        <p>{props.numMines - props.minesFlagged}</p>
      </div>
    </div>
  )
}

export default Header 