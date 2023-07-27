import React, { PropsWithChildren } from "react"
import { FieldContext } from "./FieldContext"
import useForm from "./useForm"

function Form({ onFinish, onFinishFailed, children, form: _form }) {
  let form = _form;
  if (!form) {
    [form] = useForm();
  }
  console.log("sedationh Form render")
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
