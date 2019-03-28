import { combineReducers } from 'redux';
import { current, location, forecast, condition, itemsHasErrored, itemsIsLoading, temp, isHasData } from './items';

export default combineReducers({
    isHasData,
    temp,
    current,
    forecast,
    location,
    condition,
    itemsHasErrored,
    itemsIsLoading,
});