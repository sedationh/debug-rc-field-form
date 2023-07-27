import React from "react"

function Input(props) {
  console.log("Input render", props.placeholder)
  return <input {...props}></input>
}

export default Input
