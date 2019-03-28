import React, { Component } from "react";
import { connect } from "react-redux";
import { itemsFetchData, itemsFetchDataLocation, itemsFetchDataCurrent, itemsFetchDataForecast, itemsFetchDataCondition } from "../actions/items";
import {NavLink} from 'react-router-dom';

class Main extends Component {
  state = {
    inputValue: "",
    location: [],
  };

  componentDidMount() {
    // this.props.fetchData();
  }

  handleChange = value => {
    this.setState({
      inputValue: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.fetchData(this.state.inputValue);
    this.setState({ inputValue: "" });
  };

  handleChangeCity = (index) => {
    const {temp, dataLocation, dataCurrent, dataForecast, dataCondition} =this.props;
    let currentData = temp[index];
    dataLocation(currentData.location);
    dataCurrent(currentData.current);
    dataForecast(currentData.forecast.forecastday);
    dataCondition(currentData.current.condition);
  }


  getCurrentDay = () => {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let date = new Date(year, month, day); 
    let currentDay = date.toLocaleString('ru', {weekday: 'short'});
    return currentDay.toUpperCase() + ' '+ day +'.' + (month+1);
  }

  render() {
    const { current, location, hasErrored, isLoading, condition, temp, isHasData} = this.props;
    const { inputValue } = this.state;
    if (hasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }

    if (isLoading) {
      return <p>Loading…</p>;
    }

    if(!isHasData){
      return (
        <div>
           <form onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            value={inputValue}
            onChange={event => this.handleChange(event.target.value)}
            placeholder="Enter city:"
            className="main-input"
          />
          <button className="main-button">Search</button>
        </form>
          <h2>Enter your city:</h2>
        </div>
      )
    }
    return (
      <>
      <div>
        <form onSubmit={event => this.handleSubmit(event)}>
          <input
            type="text"
            value={inputValue}
            onChange={event => this.handleChange(event.target.value)}
            placeholder="Enter city:"
            className="main-input"
          />
          <button className="main-button">Search</button>
        </form>
      </div>
      <div className="last-city">
      <span>Last city: </span>
        {temp.map((item,index) => {
          return (
          <span onClick={() => this.handleChangeCity(index)} 
                key={item.location.name + index}>
                {item.location.name}<span> </span>
          </span>
        )})}
      </div>
      <div className="city">
       <NavLink to="forecast-for-5day">{location.name}</NavLink> 
      </div>
      <div className="weather-block">
        <div className="weather-data">
          <div className="wrap-data">
            <div className="date-block">
              <span>{this.getCurrentDay()}</span>
            </div>
          <div className="temperature">
              <span>{current.temp_c}</span>
              <span>&#176;</span>
          </div>
          </div>
          <div className="condition">
          <img src={condition.icon} alt={condition.text} />
          </div>
          <table className="table-time">
            <thead>
              <tr>
                <td>Последнее обновление</td> 
                <td>Местное время</td> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{current.last_updated}</td> 
                <td>{location.localtime}</td> 
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-data">
            <table>
              <thead>
                <tr>
                  <td>Скорость ветра</td>
                  <td>Атмосферное давление</td>
                  <td>Влажность</td>
                  <td>Кол-во осадков</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{current.gust_kph} км/ч</td>
                  <td>{current.pressure_mb} мм рт. ст.</td>
                  <td>{current.humidity} %</td>
                  <td>{current.precip_mm} мм</td>
                </tr>
              </tbody>
            </table>
        </div>
      </div>
     </>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.current,
    location: state.location,
    condition: state.condition,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading,
    temp: state.temp,
    isHasData: state.isHasData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: city => dispatch(itemsFetchData(city)),
    dataLocation: data => dispatch(itemsFetchDataLocation(data)),
    dataCurrent: data => dispatch(itemsFetchDataCurrent(data)),
    dataForecast: data => dispatch(itemsFetchDataForecast(data)),
    dataCondition: data => dispatch(itemsFetchDataCondition(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
