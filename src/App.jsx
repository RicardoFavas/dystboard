import React from 'react';
import 'antd/dist/antd.css';
import {Menu, Dropdown, Icon, Button, DatePicker, Input, Select, Form, Row, Col} from 'antd';
import TSChart from './components/TSChart';
import MethodSelect from './components/MethodSelect';
import * as Constants from './Constants';
import * as moment from 'moment';
import * as _ from 'lodash';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      method: Constants.GET_CLOSE_PRICE,
      ticker: 'AAPL',
      start_date: moment('2019-01-01'),
      end_date: moment('2019-12-31'),
      chartData: [],
    };
    this.queueRefresh();
  }

  onMethodChange(value) {
    this.setState({method: value.target.value});
    this.queueRefresh();
  }

  onTickerChange(event) {
    this.setState({ticker: event.target.value.toUpperCase()});
    this.queueRefresh();
  }
  onTickerOnPressEnter(event) {
    this.queueRefresh();
  }
  onStartDateChange(moment, dateString) {
    this.setState({start_date: moment});
    this.queueRefresh();
  }
  onEndDateChange(moment, dateString) {
    this.setState({end_date: moment});
    this.queueRefresh();
  }
  queueRefresh() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.refresh(), 1000);
  }

  async refresh() {
    let {method, ticker, start_date, end_date} = this.state;
    if (ticker && start_date && end_date) {
      start_date = start_date.format('YYYY-MM-DD');
      end_date = end_date.format('YYYY-MM-DD');
      const response = await fetch(`/${method}/${ticker}?start-date=${start_date}&end-date=${end_date}`);
      const result = await response.json();

      const chartData = _.map(result, (value, label) => ({label: label.split('T')[0], value})).sort((a, b)=> a.label > b.label);
      console.log(chartData);
      this.setState({chartData});
    }
  }

  render() {
    return (
      <div className="App">
        <Row type="flex" justify="center">
          <MethodSelect value={this.state.method} onChange={this.onMethodChange.bind(this)}/>
        </Row>
        <Row type="flex" justify="center">
          <Form>
            <Col span={8}>
              <Form.Item label="Ticker">
                <Input value={this.state.ticker} placeholder={'Ticker'} onChange={this.onTickerChange.bind(this)} onPressEnter={this.onTickerOnPressEnter.bind(this)}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Start">
                <DatePicker defaultValue={this.state.start_date} allowClear={false} placeholder={'Start date'} onChange={this.onStartDateChange.bind(this)}/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="End">
                <DatePicker defaultValue={this.state.end_date} allowClear={false} placeholder={'End date'} onChange={this.onEndDateChange.bind(this)}/>
              </Form.Item>
            </Col>
          </Form>
        </Row>
        <Row type="flex" justify="center">
          <TSChart value="value" label="label" data={this.state.chartData}/>
        </Row>
      </div>
    );
  }
}

export default App;
