import axios from 'axios';
import React from 'react'

//initial Data
const intialState = {
  data: {
    x: 2, 
    y: 2, 
    steps: 0, 
    email:""
  },
  message: '',
  error: '',
  errorData: {
    upErr: "You can't go up",
    downErr: "You can't go down",
    leftErr: "You can't go left",
    rightErr: "You can't go right"
  }
}

export default class AppClass extends React.Component {
  // Intial State
  state = intialState;
  // Form Functions
  postData = data => {
    axios.post("http://localhost:9000/api/result", data)
    .then(res => {
      console.log(res.data)
      this.setState({
        ...this.state,
        message: res.data.message
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
      data: { ...this.state.data, email: emailValue }
    })
  }
  onSubmit = evt =>{
    evt.preventDefault()
    console.log(this.state.data)
    this.postData(this.state.data)
    this.setState({
      ...this.state,
      error: '',
      data: { ...this.state.data, email: '' },
    })
  }
  onChange = evt => {
    const value = evt.target.value
    this.updateEmail(value)
  }
  // Keypad Functions
  addX = () => {
    const x = this.state.data.x
    const steps = this.state.data.steps
    if (x < 3) {
      this.setState({
        ...this.state,
        data: { ...this.state.data, x: x + 1, steps: steps + 1 },
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        data: { ...this.state.data, steps: steps + 1 },
        error: this.state.errorData.rightErr,
      })
    }
  }
  subX = () => {
    const x = this.state.data.x
    const steps = this.state.data.steps
    if (x > 1) {
      this.setState({
        ...this.state,
        data: { ...this.state.data, x: x - 1, steps: steps + 1 },
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        data: { ...this.state.data, steps: steps + 1 },
        error: this.state.errorData.leftErr,
      })
    }
  }
  addY = () => {
    const y = this.state.data.y
    const steps = this.state.data.steps
    if (y < 3) {
      this.setState({
        ...this.state,
        data: { ...this.state.data, y: y + 1, steps: steps + 1 },
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        data: { ...this.state.data, steps: steps + 1 },
        error: this.state.errorData.upErr,
      })
    }
  }
  subY = () => {
    const y = this.state.data.y
    const steps = this.state.data.steps
    if (y > 1) {
      this.setState({
        ...this.state,
        data: { ...this.state.data, y: y - 1, steps: steps + 1 },
        error: null,
        message: null,
      })
    }else{
      this.setState({
        ...this.state,
        data: { ...this.state.data, steps: steps + 1 },
        error: this.state.errorData.downErr,
      })
    }
  }
  reset = () => {
    this.setState(intialState)
  }

  render() {
    const { className } = this.props
    const { data, message, error } = this.state
    console.log(data)
    console.log(`error: ${error}`)
    console.log(`message: ${message}`)
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.subX()}>LEFT</button>
          <button id="up" onClick={() => this.addY()}>UP</button>
          <button id="right" onClick={() => this.addX()}>RIGHT</button>
          <button id="down" onClick={() => this.subY()}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input 
            id="email" 
            type="email" 
            placeholder="type email"
            name='email'
            onChange={this.onChange}
            value={data.email}
          />
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
