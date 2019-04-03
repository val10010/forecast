export function itemsHasErrored(state = false, action) {
  switch (action.type) {
      case 'ITEMS_HAS_ERRORED':
          return action.hasErrored;

      default:
          return state;
  }
}

export function itemsIsLoading(state = false, action) {
  switch (action.type) {
      case 'ITEMS_IS_LOADING':
          return action.isLoading;

      default:
          return state;
  }
}

export function isHasData(state = false, action) {
  switch (action.type) {
    case 'IS_HAS_DATA': 
      return action.isHasData
    default: 
      return state;
  }
}

export function current(state = [], action) {
  switch (action.type) {
      case 'ITEMS_FETCH_DATA_CURRENT':
          return  action.current;

      default:
          return state;
  }
}

export function location(state = [], action) {
  
  switch (action.type) {
      case 'ITEMS_FETCH_DATA_LOCATION':
          return action.location;

      default:
          return state;
  }
}

export function forecast(state = [], action) {
  switch (action.type) {
      case 'ITEMS_FETCH_DATA_FORECAST':
          return  action.forecast;

      default:
          return state;
  }
}

export  function condition(state = [], action) {
  switch (action.type) {
      case 'ITEMS_FETCH_DATA_CONDITION':
          return action.condition;

      default:
          return state;
  }
}

export function temp(state=[], action) {
  switch(action.type) {
    case 'ITEMS_TEMP_LAST_CITY': 
    let newState = state.filter((item,index) => {
        if(item.location.name === state[index].location.name){
            return ;
        }
        return item;
     });
      let currentTemp = [...state, action.temp ];
     return  currentTemp.length === 6 ? currentTemp.slice(1) : currentTemp;
    default: 
      return state;
  }
}