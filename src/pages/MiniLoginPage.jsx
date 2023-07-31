import React from "react"
import Input from "../component/Input"
import Form from "../mini/Form.jsx"
import Field from "../mini/Field.jsx"
import useForm from "../mini/useForm"

function MiniLoginPage() {
  const [form] = useForm()

  React.useEffect(() => {
    form.setFieldsValue({ username: "default" })
  }, [])

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
            message: "Please input your username!",
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
