import React, { PropsWithChildren } from "react"
import { FieldContext } from "./FieldContext"
import useForm from "./useForm"

function Form({ onFinish, onFinishFailed, children, form: formProp }) {
  const [form] = useForm(formProp)

  form.setCallbacks({
    onFinish,
    onFinishFailed,
  })

  console.log("sedationh Form render")
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.submit()
      }}
    >
      <FieldContext.Provider value={form}>{children}</FieldContext.Provider>
    </form>
  )
}

export default Form
