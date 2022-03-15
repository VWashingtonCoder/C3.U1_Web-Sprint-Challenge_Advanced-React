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
  


  render() {
    const { className } = this.props
    const { data, message, error, errorData } = this.state
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
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
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
