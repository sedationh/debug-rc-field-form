import React, { Component } from "react"

class Field extends Component {
  constructor(props) {
    super(props)
  }

  getController = () => {
    const { name } = this.props

    return {
      value: "test",
      onChange: (e) => {
        const newValue = e.target.value
        console.log("sedationh name", name, newValue)
      },
    }
  }

  render() {
    const { children } = this.props

    return React.cloneElement(children, this.getController())
  }
}

export default Field
