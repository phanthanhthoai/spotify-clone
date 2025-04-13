import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider} from "@chakra-ui/react";
import './styles.scss'
import {Provider} from "react-redux";
import {store} from "./redux/store.js";
import customThemeSystem from "./theme.js"
import {Toaster} from "./components/ui/toaster.jsx";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <ChakraProvider value={customThemeSystem}>
              <Toaster/>
              <App/>
          </ChakraProvider>
      </Provider>
  </StrictMode>,
)
