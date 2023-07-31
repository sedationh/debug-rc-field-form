import React, { forwardRef, useImperativeHandle } from "react"
import { FieldContext } from "./FieldContext"
import useForm from "./useForm"

const Form = forwardRef(({ onFinish, onFinishFailed, children, form: formProp }, ref) => {
  const [form] = useForm(formProp)

  form.setCallbacks({
    onFinish,
    onFinishFailed,
  })

  console.log("sedationh Form render")

  // 使用 useImperativeHandle 将指定方法暴露给父组件
  useImperativeHandle(ref, () => ({
    submit: form.submit,
    resetFields: form.resetFields,
    setFieldsValue: form.setFieldsValue,
    getFieldsValue: form.getFieldsValue,
  }))

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
})

export default Form
