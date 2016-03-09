import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Toggle from 'material-ui/lib/toggle';


const styles = {
  block: {
    maxWidth: 250,
  },
  toggle: {
    marginBottom: 16,
  },
};

class DropDownView extends Component {
  render() {
      return (
        <div style={styles.block}>
          <Toggle
            label="Simple"
            style={styles.toggle}
          />
          <Toggle
            label="Toggled by default"
            defaultToggled={true}
            style={styles.toggle}
          />
          <Toggle
            label="Disabled"
            disabled={true}
            style={styles.toggle}
          />
          <Toggle
            label="Label on the right"
            labelPosition="right"
            style={styles.toggle}
          />
        </div>
      )
  }
}
const container = document.getElementById('app')

ReactDOM.render(<DropDownView /> ,container)
