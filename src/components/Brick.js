import React, { Component } from 'react'

class Brick extends Component {
  constructor() {
    super() 
    this.state = {
      hiddenArray: []
    }
  }

  contentColor = () => {
    const {contents} = this.props
    switch (contents) {
      case 1: 
        return 'blue'
      case 2: 
        return 'green'
      case 3: 
        return 'red'
      case 4: 
        return 'navy'
      case 5: 
        return 'maroon'
      case 6: 
        return 'teal'
      case 7: 
        return 'purple'
      case 8: 
        return 'black'
      case 'm': 
        return ''
      default:
        return 'black'
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
          <div className='box' style={{color: this.contentColor()}}>
            {this.props.contents}
          </div>
        )
      }
    }
  }
}

export default Brick 