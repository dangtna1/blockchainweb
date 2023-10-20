import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './store/store'
import './main.css'
import { CropInfoProvider } from './context/CropInfoContext'
import { WalletAccountsProvider } from './context/WalletAccountsContext'
import { ControllerProvider } from './context/ControllerContext'
import { SensorDataProvider } from './context/SensorDataContext'
import { AdafruitProvider } from './context/AdafruitContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <WalletAccountsProvider>
        <SensorDataProvider>
            <ControllerProvider>
                <CropInfoProvider>
                    <AdafruitProvider>
                        <Provider store={store}>
                            <App />
                        </Provider>
                    </AdafruitProvider>
                </CropInfoProvider>
            </ControllerProvider>
        </SensorDataProvider>
    </WalletAccountsProvider>
)
