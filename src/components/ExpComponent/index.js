import React, { Component } from 'react'













export class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [ 'One', 'Two', 'Three' ]
    }
  }

  addData = () => {
    const arr = [...this.state.data]
    arr.push('new Data')
    this.setState({data: arr})
  }

  render() {
    const { data } = this.state
    return (
      <div>
        <ul>
          {
            data.map((item, index) => (
              <li>
                {item}
              </li>
            ))
          }
        </ul>
        <button onClick={this.addData}>添加数据</button>
      </div>
    )
  }
}