import { useRef } from "react"
import { FormStore } from "./FormStore"

export default function useForm(form) {
  // 存储 FormStore 实例，在组件的整个生命周期中，只会有一个 FormStore 实例

  const formRef = useRef()
  if (formRef.current === undefined) {
    if (form) {
      formRef.current = form
    } else {
      const formStore = new FormStore()
      formRef.current = formStore.getForm()
    }
  }

  return [formRef.current]
}
