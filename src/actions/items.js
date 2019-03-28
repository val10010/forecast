export function itemsHasErrored(bool) {
  return {
      type: 'ITEMS_HAS_ERRORED',
      hasErrored: bool
  };
}

export function itemsIsLoading(bool) {
  return {
      type: 'ITEMS_IS_LOADING',
      isLoading: bool
  };
}

export function itemsFetchDataCurrent(current) {
  return {
      type: 'ITEMS_FETCH_DATA_CURRENT',
      current
  };
}

export function itemsFetchDataLocation(location) {
  return {
      type: 'ITEMS_FETCH_DATA_LOCATION',
      location
  };
}

export function isHasData(bool) {
  return {
    type: 'IS_HAS_DATA',
    isHasData: bool
  }
}

export function itemsFetchDataForecast(forecast) {
  return {
      type: 'ITEMS_FETCH_DATA_FORECAST',
      forecast
  };
}

export function itemsFetchDataCondition(condition) {
  return {
      type: 'ITEMS_FETCH_DATA_CONDITION',
      condition
  };
}

export function itemsTempLastCity(temp){
    return {
      type: 'ITEMS_TEMP_LAST_CITY',
      temp,
    }
}

export function itemsFetchData(city='london') {
  return (dispatch) => {
      dispatch(itemsIsLoading(true));
      fetch(`https://api.apixu.com/v1/forecast.json?key=ce224de9bc074a68bea221550192103&q=${city}&days=7`)
          .then((response) => {
              if (!response.ok) {
                  throw Error(response.statusText);
              }

              dispatch(itemsIsLoading(false));

              return response;
          })
          .then((response) => response.json())
          .then((items) => {
            console.log(items);
            dispatch(isHasData(true))
            dispatch(itemsTempLastCity(items))
            dispatch(itemsFetchDataCurrent(items.current))
            dispatch(itemsFetchDataCondition(items.current.condition))
            dispatch(itemsFetchDataLocation(items.location))
            dispatch(itemsFetchDataForecast(items.forecast.forecastday))
          })
          .catch(() => dispatch(itemsHasErrored(true)));
  };
}
