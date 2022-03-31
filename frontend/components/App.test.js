import React from "react"
import AppFunctional from "./AppFunctional"
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

const indexSquares = document.querySelectorAll('.square')
const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}
const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
}

test("Active Square is at index 7", () => {
  render (<AppFunctional/>)
  screen.debug()
  fireEvent.click(down)
  testSquares(indexSquares, 7)
})
test("coordinates match active square index", () => {
  render (<AppFunctional/>)
  fireEvent.click(down)
  fireEvent.click(left)
  expect(coordinates.textContent).toMatch(/\(1.*3\)$/)
})
test("steps matches number of moves", () => {
  render (<AppFunctional/>)
  fireEvent.click(up)
  fireEvent.click(up)
  fireEvent.click(right)
  fireEvent.click(left)
  expect(steps.textContent).toBe("You moved 3 times")
})
test("message show limit left", () => {
  render (<AppFunctional/>)
  fireEvent.click(left)
  fireEvent.click(left)
  expect(message.textContent).toBe("You can't go left")
})
test("keypad should be visible on render", () => {
  render (<AppFunctional/>)
  const resetBtn = screen.getByText("reset", { exact: false })
  expect(resetBtn).toBeVisible()
})