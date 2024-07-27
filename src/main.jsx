import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store/aioutputstore.js';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { MapProvider } from './mapbox/mapcontexts/MapContext.jsx';
import { SidebarProvider } from './Component/Context/SidebarContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Provider store={store}>
        <SidebarProvider>
          <PersistGate persistor={persistor}>
            <MapProvider>
              <App />
            </MapProvider>
          </PersistGate>
        </SidebarProvider>
        <Toaster />
      </Provider>
    </BrowserRouter>
);
