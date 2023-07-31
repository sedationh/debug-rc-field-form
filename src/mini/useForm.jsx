import { useRef } from "react"

// Form 状态
class FormStore {
  constructor() {
    this.store = {}
    this.entities = []
    this.callbacks = {}
  }

  setCallbacks = (newCallbacks) => {
    this.callbacks = {
      ...this.callbacks,
      ...newCallbacks,
    }
  }

  registerEntity = (entity) => {
    this.entities.push(entity)

    return () => {
      this.entities = this.entities.filter((item) => item !== entity)
      delete this.store[entity.props.name]
    }
  }

  // get
  getFieldValue = (name) => {
    return this.store[name]
  }

  getFieldsValue = () => {
    return { ...this.store }
  }

  // set
  setFieldsValue = (newStore) => {
    console.log("sedationh setFieldValue", newStore)
    // 1. 更新 store
    this.store = {
      ...this.store,
      ...newStore,
    }
    // 2. 更新组件
    this.entities.forEach((entity) => {
      const { name } = entity.props
      Object.keys(newStore).forEach((key) => {
        if (key === name) {
          entity.onStoreChange()
        }
      })
    })
  }

  validate = () => {
    const err = []

    this.entities.forEach((entity) => {
      const { name, rules } = entity.props

      if (!rules?.length) return

      const value = this.getFieldValue(name)
      const rule = rules[0]

      if (rule && rule.required && (value === undefined || value === "")) {
        err.push({ [name]: rule.message, value })
      }
    })

    return err
  }

  submit = () => {
    const { onFinish, onFinishFailed } = this.callbacks
    const validateRes = this.validate()
    if (!validateRes.length) {
      onFinish(this.getFieldsValue())
    } else {
      onFinishFailed(validateRes)
    }
  }

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldsValue: this.setFieldsValue,
      registerEntity: this.registerEntity,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
    }
  }
}

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
