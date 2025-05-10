import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider} from "@chakra-ui/react";
import {Toaster} from "./components/ui/toaster.jsx";
import customThemeSystem from "./theme.js"
import {Provider} from "react-redux";
import {store} from "./redux/store.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <ChakraProvider value={customThemeSystem}>
              <Toaster/>
              <App />
          </ChakraProvider>
      </Provider>
  </StrictMode>,
)
