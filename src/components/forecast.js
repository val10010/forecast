import React, { Component } from "react";
import { connect } from "react-redux";
import { itemsFetchData } from "../actions/items";
import { NavLink } from "react-router-dom";

class Forecast extends Component {
  render() {
    const { forecast } = this.props;
    return (
      <>
        <NavLink exact to="/">
          <button>back</button>
        </NavLink>
        { forecast.map(data => (
        <div className="weather-data" key={data.date}>
          <div className="wrap-data">
            <div className="date-block">
              {data.date}
            </div>
            <div className="temperature">
              <span>{data.day.maxtemp_c}</span>
              <span>&#176;</span>
            </div>
          </div>
          <div className="condition">
            <img src={data.day.condition.icon} alt={data.day.condition.text} />
          </div>
          <table className="table-time">
            <thead>
              <tr>
                <td>Средняя вложность</td>
                <td>Скорость ветра</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.day.avghumidity} %</td>
                <td>{data.day.maxwind_kph} км/ч</td>
              </tr>
            </tbody>
          </table>
        </div>
         ))}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    current: state.current,
    location: state.location,
    condition: state.condition,
    forecast: state.forecast,
    hasErrored: state.itemsHasErrored,
    isLoading: state.itemsIsLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: city => dispatch(itemsFetchData(city))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Forecast);
