import React, { Component } from 'react'

class Brick extends Component {
  constructor() {
    super() 
    this.state = {
      hiddenArray: []
    }
  }

  render() {
    let flagInd = ''
    if (this.props.flags.includes(this.props.index)){
      flagInd = 'flag'
    }
    if (this.props.hidden === true){
      if (!this.props.flags.includes(this.props.index)){
        return (
          <div onClick={() => this.props.toggleHidden(this.props.contentsArray, this.props.hiddenArray, this.props.index)} className={`boxhidden${flagInd}`}>
            
          </div>
        )
      }
      else {
        return (
          <div onClick={() => this.props.toggleHidden('flag', this.props.hiddenArray, this.props.index)} className={`boxhidden${flagInd}`}>
            
          </div>
        )
      }
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