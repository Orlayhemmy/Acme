import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import allReducers from './reducers/reducersIndex';
import { asyncLocalStorage } from 'redux-persist/storages';


function reduxStore() {
  return createStore(
    allReducers,
    compose(
      applyMiddleware(thunk, logger),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
      // autoRehydrate(),
    ),
  );
}
const store = reduxStore();

export default store;
