import React from 'react'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './state/index'
import axios from 'axios'
import { createRoot } from 'react-dom/client'
;(async () => {
  try {
    const resp = await axios.get('http://127.0.0.1:5000/api/v1/test')
    console.log(resp)

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
