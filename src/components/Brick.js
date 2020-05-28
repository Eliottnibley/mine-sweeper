import React, { Component } from 'react'

class Brick extends Component {
  constructor() {
    super() 
    this.state = {
      hiddenArray: []
    }
  }

  render() {
    if (this.props.hidden === true){
      return (
        <div onClick={() => this.props.toggleHidden(this.props.contentsArray, this.props.hiddenArray, this.props.index)} className='boxhidden'>
          
        </div>
      )
    }
    else {
      if (this.props.contents ==='m'){
        return (
          <div className='box'>
           <div className='mine'></div>
          </div>
        )
      }
      else {
        return (
          <div className='box'>
            {this.props.contents}
          </div>
        )
      }
    }
  }
}

export default Brick 