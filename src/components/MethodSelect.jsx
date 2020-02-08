import React from 'react';
import {Radio} from 'antd';
import * as Constants from './../Constants';


class MethodSelect extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Radio.Group value={this.props.value} onChange={this.props.onChange}>
        <Radio.Button value={Constants.GET_DIVIDENDS}>Dividends</Radio.Button>
        <Radio.Button value={Constants.GET_CLOSE_PRICE}>Close Prices</Radio.Button>
        <Radio.Button value={Constants.GET_RECOMENDATIONS}>Recomendations</Radio.Button>
      </Radio.Group>
    );
  }
}

export default MethodSelect;
