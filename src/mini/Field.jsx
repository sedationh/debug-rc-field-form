import React, { Component } from "react"
import { FieldContext } from "./FieldContext"

class Field extends Component {
  static contextType = FieldContext

  constructor(props) {
    super(props)
  }

  getController = () => {
    const { name } = this.props
    const { getFieldValue, setFieldValue } = this.context

    return {
      value: getFieldValue(name),
      onChange: (e) => {
        const newValue = e.target.value
        console.log("sedationh name", name, newValue)
        setFieldValue({ [name]: newValue })
      },
    }
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, this.getController())
  }
}

export default Field
