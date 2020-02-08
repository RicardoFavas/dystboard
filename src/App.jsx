import React from 'react';
import 'antd/dist/antd.css';
import { Menu, Dropdown, Icon, Button,DatePicker,Input, Select, Radio, Form, Row, Col } from 'antd';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import * as moment from 'moment';
import * as _ from 'lodash';

const GET_DIVIDENDS = 'get_dividends'
const GET_CLOSE_PRICE = 'get_close_price'
const GET_RECOMENDATIONS = 'get_recomendations'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = { 
      method: GET_DIVIDENDS,
      ticker: 'AAPL',
      start_date: moment("2019-01-01"), 
      end_date: moment("2019-01-31"),
      chartData: []
    }
  }

  onMethodChange(value){
    this.setState({method:value.target.value})
    this.queueRefresh()
  }

  onTickerChange(event){
    this.setState({ticker:event.target.value.toUpperCase()})
    this.queueRefresh()
  }
  onTickerOnPressEnter(event){
    this.queueRefresh()
  }
  onStartDateChange(moment, dateString){
    this.setState({start_date:moment})
    this.queueRefresh()
  }
  onEndDateChange(moment, dateString){
    this.setState({end_date:moment})
    this.queueRefresh()
  }

  queueRefresh(){
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.refresh(), 1000);
  }

  async refresh(){
    let { method,ticker,start_date,end_date } = this.state
    if (ticker && start_date && end_date) {
      start_date = start_date.format("YYYY-MM-DD")
      end_date = end_date.format("YYYY-MM-DD")
      const response = await fetch(`/${method}/${ticker}?start-date=${start_date}&end-date=${end_date}`)
      const result = await response.json()

      const chartData = _.map(result, (value,label) => ({label:label.split('T')[0],value}))
      console.log(chartData)
      this.setState({chartData})
    }
  }

  render() {
    const buttons = (
      <Radio.Group value={this.state.method} onChange={this.onMethodChange.bind(this)}>
        <Radio.Button value={GET_DIVIDENDS}>{GET_DIVIDENDS}</Radio.Button>
        <Radio.Button value={GET_CLOSE_PRICE}>{GET_CLOSE_PRICE}</Radio.Button>
        <Radio.Button value={GET_RECOMENDATIONS}>{GET_RECOMENDATIONS}</Radio.Button>
      </Radio.Group>
    )
    const renderLineChart = (
      <LineChart width={600} height={300} data={this.state.chartData}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="label" />
        <YAxis />
      </LineChart>
    )
    return (
      <div className="App">
        {buttons}
        <Form>
          <Form.Item label="Ticker">
            <Input value={this.state.ticker} placeholder={'Ticker'} onChange={this.onTickerChange.bind(this)} onPressEnter={this.onTickerOnPressEnter.bind(this)}/>
          </Form.Item>
          <Form.Item label="start_date">
              <DatePicker defaultValue={this.state.start_date} placeholder={"Start date"} onChange={this.onStartDateChange.bind(this)}/>
          </Form.Item>
          <Form.Item label="end_date">
              <DatePicker defaultValue={this.state.end_date} placeholder={"End date"} onChange={this.onEndDateChange.bind(this)}/>
          </Form.Item>
        </Form>
        {renderLineChart}
      </div>
    );
  }
}

export default App;
