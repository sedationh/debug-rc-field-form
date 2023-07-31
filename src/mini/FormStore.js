// Form 状态
export class FormStore {
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
