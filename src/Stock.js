import React from 'react';
import Plot from 'react-plotly.js';


class Stock extends React.Component {

 constructor(props) {
   super(props);
   this.state = {
     StockSymbolValue: '',
     DateStart:[],
     DateEnd:[],
     stockChartXValues:[],
     stockChartYValues:[]
   }
 }


 handleSymbolChange = event => {
   this.setState({StockSymbolValue: event.target.value});
 }
 handleStartDateChange = event => {
   this.setState({DateStart: event.target.value});
 }
 handleEndDateChange = event => {
   this.setState({DateEnd: event.target.value});
 }

handleSubmit = event => {
  event.preventDefault();

let symbol = event.target[0].value;
let start = event.target[1].value;
let end = event.target[2].value;

this.fetchStock(symbol, start, end);

}

 fetchStock(symbol, start, end) {
   const pointerToThis = this;
   const API_KEY = '5UO59KOVD8EWL7RR';
   let StockSymbol = symbol;
   let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=full&apikey=${API_KEY}`;
   let stockChartXValuesFunction = [];
   let stockChartYValuesFunction = [];


   fetch(API_Call)
   .then(
     function(response) {
       return response.json();
     }
   )
   .then(
     function(data) {
       console.log(data);

       for (var key in data['Time Series (Daily)']) {
       if (key >= start && key <= end) {
        stockChartXValuesFunction.push(key);
        stockChartYValuesFunction.push(data['Time Series (Daily)']
         [key]['1. open']);
       }
       }

       pointerToThis.setState({
         stockChartXValues: stockChartXValuesFunction,
         stockChartYValues: stockChartYValuesFunction,
       });
     }
   )
 }

 componentDidUpdate(prevProps) {
    if (prevProps.spendings !== this.props.spendings) {

     let {chartData} = this.state;
     chartData.datasets[0].data = this.props.spendings
     this.setState({chartData});

    }
  }

  render() {
    return (
      <div>
        <h1> Stock Market</h1>
        <div className="App">
    <div className="container">
    <form onSubmit={this.handleSubmit}>
  <div class="form-group">
    <label for="stockSymbol">Stock Symbol</label>
    <input type="text" class="form-control" id="stockSymbol" placeholder="Example input" value={this.state.StockSymbolValue} onChange={this.handleSymbolChange}/>
  </div>
  <div class="form-group">
    <label for="startDate">Start Date</label>
    <input type="date" class="form-control" id="endDate" placeholder="Another input" value={this.state.DateStart} onChange={this.handleStartDateChange} />
  </div>
  <div class="form-group">
    <label for="formGroupExampleInput2">End Date</label>
    <input type="date" class="form-control" id="formGroupExampleInput2" placeholder="Another input" value={this.state.DateEnd} onChange={this.handleEndDateChange} />
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        <Plot
        data={[
          {
            x: this.state.stockChartXValues,
            y: this.state.stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'blue'},
          },
        ]}
        layout={{width: 720, height: 440, title: `${this.state.StockSymbolValue} Stock Price`}}
      />

        </div>
        </div>
      </div>
    )
  }
}
export default Stock;
