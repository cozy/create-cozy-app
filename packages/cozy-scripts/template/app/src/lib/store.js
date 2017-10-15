import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

// import myFeatureReducers from '../ducks/myFeature'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const middlewares = [thunkMiddleware, loggerMiddleware]

export default createStore(
  // myFeatureReducers,
  composeEnhancers(applyMiddleware.apply(null, middlewares))
)
