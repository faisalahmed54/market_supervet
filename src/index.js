import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Web3Provider from './store/Web3Provider';
import CollectionProvider from './store/CollectionProvider';
import MarketplaceProvider from './store/MarketplaceProvider';
import TokenProvider from './store/TokenProvider';
import { Provider } from 'react-redux';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.MIDDLE,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover toastStyle={{ backgroundColor: "#144FA2",color:"white",fontSize:"18px"}} />
      <AlertProvider template={AlertTemplate} {...options}>
        <Web3Provider>
          <TokenProvider>
            <CollectionProvider>
              <MarketplaceProvider>
                <App />
              </MarketplaceProvider>
            </CollectionProvider>
          </TokenProvider>
        </Web3Provider>
      </AlertProvider>
    </Provider>Î
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
