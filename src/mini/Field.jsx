import React, { Component } from "react"
import { FieldContext } from "./FieldContext"

class Field extends Component {
  static contextType = FieldContext

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { registerEntity } = this.context
    this.cancelRegister = registerEntity(this)
  }

  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister()
    }
  }

  onStoreChange = () => {
    this.forceUpdate()
  }

  getController = () => {
    const { name } = this.props
    const { getFieldValue, setFieldValue } = this.context

    return {
      value: getFieldValue(name) || "", // 注意这里首次是 undefined， 因此 当前 Input 组件变成非受控组件「会给人一种已经实现的幻觉」, 加了 "" 后变成受控组件
      onChange: (e) => {
        const newValue = e.target.value
        setFieldValue({ [name]: newValue })
      },
    }
  }

  render() {
    console.log("sedationh Field render", this.props.name)
    const { children } = this.props

    return React.cloneElement(children, this.getController())
  }
}

export default Field
