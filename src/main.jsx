import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import App from './App.jsx';
import store from './store/store.jsx'
import './index.css';
import { CropInfoProvider } from "./context/CropInfoContext.jsx";
import { TransactionsProvider } from "./context/TransactionContext.jsx";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CropInfoProvider>
    <TransactionsProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </TransactionsProvider>
  </CropInfoProvider>
);

