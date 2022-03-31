import axios from 'axios'
import React, { useEffect, useState } from 'react'

//initial Data
const errData = {
  upErr: "You can't go up",
  downErr: "You can't go down",
  leftErr: "You can't go left",
  rightErr: "You can't go right",
}


export default function AppFunctional(props) {
  //States
  const [coordinates, setCoords] = useState({ x: null, y: null })
  const [steps, setSteps] = useState(0)
  const [index, setIndex] = useState(4)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState("")
  //State Breakdown
  const { x, y } = coordinates 

  console.log(email)
  // useEffect
  useEffect(() => {
    getCoordinates(index)
  }, [])
  // initial coodrinate setter
  function getCoordinates(index) {
    const columns = 3;
    const coorX = Math.floor(index % columns)
    const coorY = Math.floor(index / columns)
    setCoords({...coordinates, x: coorX + 1, y: coorY + 1})
  }
  // Keypad Handlers
  function moveLeft() {
    if (x > 1){
      setIndex(index - 1)
      getCoordinates(index - 1)
      setMessage(null)
      setSteps(steps + 1)
    } else {
      setMessage(errData.leftErr)
    }
  }
  function moveUp() {
    if (y > 1) {
      setIndex(index - 3)
      getCoordinates(index - 3)
      setMessage(null)
      setSteps(steps + 1)
    } else {
      setMessage(errData.upErr)
    }
  }
  function moveRight() {
    if (x < 3) {
      setIndex(index + 1)
      getCoordinates(index + 1)
      setMessage(null)
      setSteps(steps + 1)
    } else {
      setMessage(errData.rightErr)
    }
  }
  function moveDown() {
    if (y < 3) {
      setIndex(index + 3)
      getCoordinates(index + 3)
      setMessage(null)
      setSteps(steps + 1)
    } else {
      setMessage(errData.downErr)
    }
  }
  function reset() {
    getCoordinates(4)
    setSteps(0)
    setIndex(4)
    setEmail("")
    setMessage(null)
    
  }
  // Change Handlers
   const onChange = evt => {
     console.log(evt)
    const value = evt.target.value
    setEmail(value)
  }
  // Data Post
  const postData = data =>{
    axios.post("http://localhost:9000/api/result", data)
      .then(res => {
        setMessage(res.data.message)
      })
      .catch(err => setMessage(err.response.data.message))
  }
  // Submit Handler
  const onSubmit = evt =>{
    evt.preventDefault()
    const userData = { x: x, y: y, steps: steps, email: email }
    postData(userData)
    setEmail("")
  }
 
  

  return (
    <div id="wrapper" className={props.className}>
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
        <button id="left" onClick={moveLeft}>LEFT</button>
        <button id="up" onClick={moveUp}>UP</button>
        <button  id="right" onClick={moveRight}>RIGHT</button>
        <button id="down" onClick={moveDown}>DOWN</button>
        <button id="reset" onClick={reset}> reset </button>
      </div>
      <form onSubmit={onSubmit}>
        <input 
          id='email'
          name='email'
          type='email' 
          value={email}
          placeholder="type email"
          onChange={onChange}
        />
        <input id="submit" type="submit" ></input>
      </form>
    </div>
  )
}
