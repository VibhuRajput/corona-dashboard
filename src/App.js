import React from 'react';
import Axios from 'axios';
import './style.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.getCountryData = this.getCountryData.bind(this);
  }
  state = {
    confirmed: 0,
    recovered: 0,
    deaths: 0,
    countries: [],
  };
  componentDidMount() {
    this.getData();
  }
  async getData() {
    const restApi = await Axios.get('https://covid19.mathdro.id/api');
    const restCountries = await Axios.get(
      'https://covid19.mathdro.id/api/countries'
    );
    const countries = [];
    for (var i = 0; i < restCountries.data.countries.length; i++) {
      countries.push(restCountries.data.countries[i].name);
    }
    this.setState({
      confirmed: restApi.data.confirmed.value,
      recovered: restApi.data.recovered.value,
      deaths: restApi.data.deaths.value,
      countries,
    });
  }
  //error handling
  async getCountryData(event) {
    try {
      const res = await Axios.get(
        `https://covid19.mathdro.id/api/countries/${event.target.value}`
      );
      this.setState({
        confirmed: restApi.data.confirmed.value,
        recovered: restApi.data.recovered.value,
        deaths: restApi.data.deaths.value,
      });
    } catch (err) {
      if (err.response.status === 404) {
        this.setState({
          confirmed: 'No Data Available',
          recovered: 'No Data Available',
          deaths: 'No Data Available',
        });
      }
    }
    //function to choose country from the list
    renderCountryOptions = () => {
      return this.state.countries.map((name, i) => {
        return <option key={name}>{name}</option>;
      });
    };
  }
  render() {
    return (
      <div className="container">
        <h1>Covid-19 Update</h1>
        <select className="dropDown" onChaneg={this.getCountryData}>
          {this.renderCountryOptions()}
        </select>
        <div className="flex">
          <div className="box confirmed">
            <h3 className="heading">Confirmed cases:</h3>
            <h4 className="num">{this.state.confirmed}</h4>
          </div>
          <div className="box recovered">
            <h3 className="heading">Recovered cases:</h3>
            <h4 className="num">{this.state.recovered}</h4>
          </div>
          <div className="box deaths">
            <h3 className="heading">Out of this world cases:</h3>
            <h4 className="num">{this.state.deaths}</h4>
          </div>
        </div>
      </div>
    );
  }
}
