import './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'
import ErrorBoundary from './ErrorBoundary'

ReactDOM.render(
  // <ErrorBoundary>
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  // </ErrorBoundary>,
  document.getElementById('root')
)
