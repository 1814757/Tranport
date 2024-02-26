import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './state/index'
import { createRoot } from 'react-dom/client'
;(async () => {
  try {
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    )
  } catch (error) {
    console.error('Error:', error)
  }
})()
