import React from "react"
import Input from "../component/Input"
import Form, { Field } from "rc-field-form"

function LoginPage() {
  return (
    <Form
      onFinish={(values) => {
        console.log("Finish:", values)
      }}
      onFinishFailed={(err) => {
        console.log("onFinishFailed:", err)
      }}
    >
      <Field
        rules={[
          {
            required: true,
          },
        ]}
        name="username"
      >
        <Input placeholder="Username" />
      </Field>
      <Field name="password">
        <Input placeholder="Password" />
      </Field>

      <button>Submit</button>
    </Form>
  )
}

export default LoginPage
