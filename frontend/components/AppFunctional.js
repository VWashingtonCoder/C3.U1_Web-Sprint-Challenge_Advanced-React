import axios from 'axios'
import React, { useState } from 'react'

//initial Data
const intialData = {
  x: 2, 
  y: 2, 
  steps: 0, 
  email:""
}
const errorData = {
  upErr: "You can't go up",
  downErr: "You can't go down",
  leftErr: "You can't go left",
  rightErr: "You can't go right"
}

export default function AppFunctional(props) {
  //States
  const [data, setData] = useState(intialData)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  //State Breakdown
  const x = data.x
  const y = data.y
  const steps = data.steps
  const email = data.email
  //Data Post
  const postData = data =>{
    axios.post("http://localhost:9000/api/result", data)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(res => console.log(res))
  }
  //onClick functions
  const addX = () => {
    if (x < 3){
      return(
        setData({ x: x + 1, y: y, steps: steps + 1, email: email }),
        setError(null),
        setMessage(null)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        setError(errorData.rightErr)
      )
    }
  }

  const subX = () => { 
    if (x > 1){
      return(
        setData({ x: x - 1, y: y, steps: steps + 1, email: email }),
        setError(null),
        setMessage(null)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        setError(errorData.leftErr)
      )
    }
  }
  
  const addY = () => {
    if (y < 3){
      return(
        setData({ x: x, y: y + 1, steps: steps + 1, email: email }),
        setError(null),
        setMessage(null)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        setError(errorData.upErr)
      )
    }
  }
  
  const subY = () => {
    if (y > 1){
      return(
        setData({ x: x, y: y - 1, steps: steps + 1, email: email }),
        setError(null),
        setMessage(null)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        setError(errorData.downErr)
      )
    }
  }

  const reset = () => {
    setData({ "x": 2, "y": 2, "steps": 0, "email": email })
    setError(null)
    setMessage(null)
  }
  
  const updateEmail = (inputValue) => {
    setData({...data, email: inputValue})
  }

  const onSubmit = evt =>{
    evt.preventDefault()
    setError(null)
    postData(data)
    setData({ ...data, email: "" })
    
  }

  const onChange = evt => {
    const value  = evt.target.value
    updateEmail(value)
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates ({x}, {y})</h3>
        <h3 id="steps">You moved {steps} times</h3>
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
        <h3 id="message">{message === null ? error : message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => subX()}>LEFT</button>
        <button id="up" onClick={() => addY()}>UP</button>
        <button  id="right" onClick={() => addX()}>RIGHT</button>
        <button id="down" onClick={() => subY()}>DOWN</button>
        <button id="reset" onClick={() => reset()}> reset </button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
          id="email" 
          type="email"
          name='email' 
          placeholder="type email"
          onChange={onChange}
          value={data.email}
        />
        <input id="submit" type="submit" ></input>
      </form>
    </div>
  )
}
