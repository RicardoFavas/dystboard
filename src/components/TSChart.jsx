import React from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

class TSChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <LineChart width={800} height={350} data={this.props.data}>
        <Line type="monotone" dataKey={this.props.value} stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <XAxis dataKey={this.props.label} />
        <YAxis />
        <Tooltip/>
      </LineChart>
    );
  }
}

export default TSChart;
