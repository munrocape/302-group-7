import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Toggle from 'material-ui/lib/toggle'


class FooterView extends Component {
  render() {
      return (
        <p>Hello world </p>
      )
  }
}
const container = document.getElementById('app')

ReactDOM.render(<FooterView />, container)
