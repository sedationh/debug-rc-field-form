import React, { PropsWithChildren } from "react"
import { FieldContext } from "./FieldContext"
import useForm from "./useForm"

function Form({ onFinish, onFinishFailed, children, form }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onFinish(form.getFieldsValue())
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
