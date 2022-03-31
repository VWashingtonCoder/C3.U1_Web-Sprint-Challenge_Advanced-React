import axios from 'axios';
import React from 'react'
//initial Data
const intialState = {
  coordinates: { x: null, y: null },
  steps: 0,
  index: 4,
  message: "",
  email:"",
  errorData: {
    upErr: "You can't go up",
    downErr: "You can't go down",
    leftErr: "You can't go left",
    rightErr: "You can't go right",
  }, 
}
export default class AppClass extends React.Component {
  // Intial State
  state = intialState;
  // component mount
  componentDidMount(){
    this.getCoordinates(this.state.index);
  }
  // coordinate setter
  getCoordinates(index){
    const columns = 3;
    const coorX = Math.floor(index % columns)
    const coorY = Math.floor(index / columns)
    this.setState({
      ...this.state,
        coordinates: {x: coorX + 1, y: coorY + 1}
    })
  }
  // keypad handlers
  moveLeft(){
    const steps = this.state.steps
    const x = this.state.coordinates.x
    const index = this.state.index
    const errLeft = this.state.errorData.leftErr

    if (x > 1) {
      this.setState({ ...this.state, 
        steps: steps + 1,
        index: index - 1, 
        coordinates: { ...this.state.coordinates, x: x - 1 },
        message: null 
      })
    } else {
      this.setState({ ...this.state, message: errLeft })
    }
  }
  moveUp(){
    const steps = this.state.steps
    const y = this.state.coordinates.y
    const index = this.state.index
    const errUp = this.state.errorData.upErr
    
    if (y > 1) {
      this.setState({ ...this.state, 
        steps: steps + 1,
        index: index - 3, 
        coordinates: { ...this.state.coordinates, y: y - 1 },
        message: null 
      })
    } else {
      this.setState({ ...this.state, message: errUp })
    }
  }
  moveRight(){
    const steps = this.state.steps
    const x = this.state.coordinates.x
    const index = this.state.index
    const errRight = this.state.errorData.rightErr

    if (x < 3) {
      this.setState({ ...this.state, 
        index: index + 1, 
        coordinates: { ...this.state.coordinates, x: x + 1 },
        steps: steps + 1,
        message: null 
      })
    } else {
      this.setState({ ...this.state, message: errRight })
    }
  }
  moveDown(){
    const steps = this.state.steps
    const y = this.state.coordinates.y
    const index = this.state.index
    const errDown = this.state.errorData.downErr

    if (y < 3) {
      this.setState({ ...this.state, 
        index: index + 3, 
        coordinates: { ...this.state.coordinates, y: y + 1 },
        steps: steps + 1,
        message: null 
      })
    } else {
      this.setState({ ...this.state, message: errDown })
    }
  }
  reset(){
    this.setState({ ...this.state,
      coordinates: {x: 2, y: 2},
      steps: 0,
      index: 4,
      email: "",
      message: null
    })
  }
  // Email Change Handler
  emailChange = evt => {
    const value = evt.target.value
    this.setState({ ...this.state, email: value })
  }
  //Form Data Post
  postData = data => {
    axios.post("http://localhost:9000/api/result", data)
    .then(res => {
      this.setState({
        ...this.state,
        message: res.data.message,
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        message: err.response.data.message,
      })
    })
  }
  submit = evt => {
    evt.preventDefault()
    const userData = { 
      x: this.state.coordinates.x, 
      y: this.state.coordinates.y, 
      steps: this.state.steps, 
      email: this.state.email 
    }
    this.postData(userData)
    this.setState({ ...this.state, email: "" })
  }
  
  render() {
    // props & state breakdown
    const { className } = this.props
    const { coordinates, steps, index, message, email } = this.state
    const { x, y } = coordinates
    
    console.log(email)
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({x}, {y})</h3>
          <h3 id="steps">
            {steps === 1 ? `You moved ${steps} time` : `You moved ${steps} times`}
          </h3>
        </div>
        <div id="grid">
          <div className={index === 0 ? 'square active' : 'square'}>
            {index === 0 ? 'B' : ''}
          </div>
          <div className={index === 1 ? 'square active' : 'square'}>
            {index === 1 ? 'B' : ''}
          </div>
          <div className={index === 2 ? 'square active' : 'square'}>
            {index === 2 ? 'B' : ''}
          </div>
          <div className={index === 3 ? 'square active' : 'square'}>
            {index === 3 ? 'B' : ''}
          </div>
          <div className={index === 4 ? 'square active' : 'square'}>
            {index === 4 ? 'B' : ''}
          </div>
          <div className={index === 5 ? 'square active' : 'square'}>
            {index === 5 ? 'B' : ''}
          </div>
          <div className={index === 6 ? 'square active' : 'square'}>
            {index === 6 ? 'B' : ''}
          </div>
          <div className={index === 7 ? 'square active' : 'square'}>
            {index === 7 ? 'B' : ''}
          </div>
          <div className={index === 8 ? 'square active' : 'square'}>
            {index === 8 ? 'B' : ''}
          </div>
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLeft()}>LEFT</button>
          <button id="up" onClick={() => this.moveUp()}>UP</button>
          <button id="right" onClick={() => this.moveRight()}>RIGHT</button>
          <button id="down" onClick={() => this.moveDown()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.submit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            name='email'
            onChange={this.emailChange}
            value={email}
          />
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
