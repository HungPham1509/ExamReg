import React, { Component } from 'react';
import { Line } from 'rc-progress';

class ProgressBar extends Component {
  constructor() {
    super();
    this.state = {
      percent: 30,
      color: '#3FC7FA',
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    const value = parseInt(Math.random() * 100, 10);
    this.setState({
      percent: value,
      color: colorMap[parseInt(Math.random() * 3, 10)],
    });
  }

  render() {
    const { percent, color } = this.state;
    const containerStyle = {
      width: '250px',
    };
    return (
      <div>
        <h3>Line Progress {percent}%</h3>
        <div style={containerStyle}>
          <Line percent={percent} strokeWidth="4" strokeColor={color} />
        </div>
          <button type="button" onClick={this.changeState}>
            Change State
          </button>

      </div>
    );
  }
}

export default ProgressBar;