import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import App from './App';
import store from './store/store'
import './main.css';
import { CropInfoProvider } from "./context/CropInfoContext.jsx";
import { WalletAccountsProvider } from './context/WalletAccountsContext.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletAccountsProvider>
    <CropInfoProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CropInfoProvider>
  </WalletAccountsProvider>

);

