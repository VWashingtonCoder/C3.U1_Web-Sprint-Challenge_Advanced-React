import axios from 'axios'
import React, { useEffect, useState } from 'react'

//initial Data
const intialData = {
  "x": 2, 
  "y": 2, 
  "steps": 0, 
  "email":"ex@example.com"
}

export default function AppFunctional(props) {
  const [data, setData] = useState(intialData)
  const [message, setMessage] = useState(null)
  
  const x = data.x
  const y = data.y
  const steps = data.steps
  const email = data.email

  const postData = data =>{
    axios.post("http://localhost:9000/api/result", data)
      .then(res => {
        console.log((res.data.message))
        setMessage(res.data.message)
      })
      .catch(res => console.log(res))
  }
  
  //onClick functions
  const addX = () => {
    if (x < 3){
      return(
        setData({ x: x + 1, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    }
  }

  const subX = () => { 
    if (x > 1){
      return(
        setData({ x: x - 1, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    }
  }
  
  const addY = () => {
    if (y < 3){
      return(
        setData({ x: x, y: y + 1, steps: steps + 1, email: email }),
        postData(data)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    }
  }
  
  const subY = () => {
    if (x > 1){
      return(
        setData({ x: x, y: y - 1, steps: steps + 1, email: email }),
        postData(data)
      )
    } else {
      return (
        setData({ x: x, y: y, steps: steps + 1, email: email }),
        postData(data)
      )
    }
  }

  const reset = () => {
    setData(intialData)
  }
    
  
  // console.log(data)
  

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
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button 
          id="left" 
          onClick={() => subX()}
        > LEFT </button>
        <button 
          id="up" 
          onClick={() => addY()}
        > UP </button>
        <button  
          id="right" 
          onClick={() => addX()}
        > RIGHT </button>
        <button 
          id="down" 
          onClick={() => subY()}
        > DOWN  </button>
        <button 
          id="reset" 
          onClick={() => reset()}
        > reset </button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
