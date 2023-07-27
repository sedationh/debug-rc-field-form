import React from "react"
import Input from "../component/Input"
import Form from "../mini/Form.jsx"
import Field from "../mini/Field.jsx"
import useForm from "../mini/useForm"

function MiniLoginPage() {
  const [form] = useForm()

  return (
    <Form
      form={form}
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

export default MiniLoginPage
