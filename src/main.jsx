import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'

import App from './App';
import store from './store/store'
import './main.css';
import { CropInfoProvider } from "./context/CropInfoContext";
import { WalletAccountsProvider } from './context/WalletAccountsContext';
import { ControllerProvider } from './context/ControllerContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WalletAccountsProvider>
    <ControllerProvider>
      <CropInfoProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </CropInfoProvider>
    </ControllerProvider>
  </WalletAccountsProvider>

);

