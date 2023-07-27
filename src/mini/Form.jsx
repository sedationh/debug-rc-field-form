import React, { PropsWithChildren } from "react"

function Form({ onFinish, onFinishFailed, children }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      {children}
    </form>
  )
}

export default Form
