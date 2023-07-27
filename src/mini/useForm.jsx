import { useRef } from "react"

// Form 状态
class FormStore {
  constructor() {
    this.store = {}
  }

  // get
  getFieldValue = (name) => {
    return this.store[name]
  }

  getFieldsValue = () => {
    return { ...this.store }
  }

  // set
  setFieldValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore,
    }
  }

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
    }
  }
}

export default function useForm() {
  // 存储 FormStore 实例，在组件的整个生命周期中，只会有一个 FormStore 实例

  const formRef = useRef()
  if (formRef.current === undefined) {
    const formStore = new FormStore()
    formRef.current = formStore.getForm()
  }

  return [formRef.current]
}
