import { useRef } from "react"

// Form 状态
class FormStore {
  constructor() {
    this.store = {}
    this.entities = []
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
  setFieldValue = (newStore) => {
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

  getForm = () => {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      registerEntity: this.registerEntity,
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
