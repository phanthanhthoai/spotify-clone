import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ChakraProvider, defaultSystem} from "@chakra-ui/react";
import './styles.scss'
import {Provider} from "react-redux";
import {store} from "./redux/store.js";


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store={store}>
          <ChakraProvider value={defaultSystem}>
              <App/>
          </ChakraProvider>
      </Provider>
  </StrictMode>,
)
