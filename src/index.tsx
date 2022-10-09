import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {store} from './app/model'
import {Buffer} from 'buffer';
window.Buffer = Buffer

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <Provider store={store}>
      <App />
   </Provider>
);

reportWebVitals();
