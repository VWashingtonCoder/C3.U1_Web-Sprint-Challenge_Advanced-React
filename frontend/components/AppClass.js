import axios from 'axios';
import React from 'react'
//initial Data
const intialState = {
  grid: [
    ["square", "square", "square"],
    ["square", "square active", "square"],
    ["square", "square", "square"], 
  ],
  coordinates: { x: null, y: null },
  index: {x: null, y: null},
  steps: 0,
  email:"",
  message: null,
  error: null,
  errorData: {
    upErr: "Ouch: y coordinate must be 1, 2 or 3",
    downErr: "Ouch: y coordinate must be 1, 2 or 3",
    leftErr: "Ouch: x coordinate must be 1, 2 or 3",
    rightErr: "Ouch: x coordinate must be 1, 2 or 3"
  }, 
}
export default class AppClass extends React.Component {
  // Intial State
  state = intialState;
  componentDidMount(){
    this.getCordinates(this.state.grid);
  }
  // Form Functions
  postData = data => {
    axios.post("http://localhost:9000/api/result", data)
    .then(res => {
      console.log(res.data)
      this.setState({
        ...this.state,
        message: res.data.message,
      })
    })
    .catch(err => {
      this.setState({
        ...this.state,
        error: err.response
      })
    })
  }
  updateEmail = (emailValue) => {
    this.setState({
      ...this.state,
      email: emailValue,
    })
  }
  onChange = evt => {
    const value = evt.target.value
    this.updateEmail(value)
  }
  onSubmit = evt =>{
    evt.preventDefault()
    const data = { 
      x: this.state.coordinates.x, 
      y: this.state.coordinates.y, 
      steps: this.state.steps, 
      email: this.state.email 
    }
    this.postData(data)
    this.setState({
      ...this.state,
      error: null,
      email: '',
    })
  }
  // Keypad Functions
  moveLeft = () => {
    const coordinatesX = this.state.coordinates.x
    const grid = this.state.grid
    const i = this.state.index
    const steps = this.state.steps

    if ( coordinatesX > 1) {
      grid[i.x].splice([i.y], 1, "square")
      grid[i.x].splice([i.y - 1], 1, "square active")
      this.setState({
        ...this.state,
        coordinates: { ...this.state.coordinates, x: coordinatesX - 1 },
        index: { ...this.state.index, y: i.y - 1 },  
        steps: steps+1,
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        steps: steps + 1,
        error: this.state.errorData.leftErr,
      })
    }

  }
  moveUp = () => {
    const coordinatesY = this.state.coordinates.y
    const grid = this.state.grid
    const i = this.state.index
    const steps = this.state.steps
    
    if (coordinatesY > 1) {
      grid[i.x].splice([i.y], 1, "square")
      grid[i.x - 1].splice([i.y], 1, "square active")

      this.setState({
        ...this.state,
        coordinates: { ...this.state.coordinates, y: coordinatesY - 1 },
        index: { ...this.state.index, x: i.x - 1 },
        steps: steps + 1,
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state, 
        steps: steps + 1,
        error: this.state.errorData.upErr,
      })
    }
  }
  moveRight = () => {
    const coordinatesX = this.state.coordinates.x
    const grid = this.state.grid
    const i = this.state.index
    const steps = this.state.steps
   
    if ( coordinatesX < 3) {
      grid[i.x].splice([i.y], 1, "square")
      grid[i.x].splice([i.y + 1], 1, "square active")
      
      this.setState({
        ...this.state,
        coordinates: { ...this.state.coordinates, x: coordinatesX + 1 },
        index: { ...this.state.index, y: i.y + 1 },  
        steps: steps+1,
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        steps: steps + 1,
        error: this.state.errorData.rightErr,
      })
    }
  }
  moveDown = () => {
    const coordinatesY = this.state.coordinates.y
    const grid = this.state.grid
    const i = this.state.index
    const steps = this.state.steps
    
    if (coordinatesY < 3) {
      grid[i.x].splice([i.y], 1, "square")
      grid[i.x + 1].splice([i.y], 1, "square active")
      
      this.setState({
        ...this.state,
        coordinates: { ...this.state.coordinates, y: coordinatesY + 1 },
        index: { ...this.state.index, x: i.x + 1 },
        steps: steps + 1,
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state, 
        steps: steps + 1,
        error: this.state.errorData.downErr,
      })
    }
  }
  reset = () => {
    this.setState({ ...this.state,
      grid: [
        ["square", "square", "square"],
        ["square", "square active", "square"],
        ["square", "square", "square"], 
      ],
      coordinates: { x: 2, y: 2 },
      index: {x: 1, y: 1},
      steps: 0,
      email:"",
      message: null,
      error: null,
    })
    
  }
  // Grid Helpers
  getCordinates = (grid) => {
    for (let x = 0; x < grid.length; x++) {
      for (let y=0; y < grid[x].length; y++) {
        if (grid[x][y] === 'square active'){
          this.setState({
            ...this.state,
            coordinates: { x: x+1, y: y+1 },
            index: { x: x, y: y }
          })
        }
      }
    }
  }
  
  render() {
    const { className } = this.props
    const { coordinates, steps, grid, message, error, email } = this.state
    
    console.log(`coordinates: ${coordinates.x}, ${coordinates.y}`)
    console.log(`index: ${this.state.index.x}, ${this.state.index.y}`)
   
    console.log(grid)
    // console.log(`steps: ${steps}`)
    // console.log(`email: ${email}`)
    // console.log(`error: ${error}`)
    // console.log(`message: ${message}`)
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({coordinates.x}, {coordinates.y})</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
        <div id="grid">
          {grid.flat().map((square, id) => {
            console.log(square, id);
            return(
              <div className={square} key={id}>
                {square === "square active" ? "B" : ""}
              </div>
            )
          })}
        </div>
        <div className="info">
          <h3 id="message">{error === null ? message : error}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.moveLeft()}>LEFT</button>
          <button id="up" onClick={() => this.moveUp()}>UP</button>
          <button id="right" onClick={() => this.moveRight()}>RIGHT</button>
          <button id="down" onClick={() => this.moveDown()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            name='email'
            onChange={this.onChange}
            value={email}
          />
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
