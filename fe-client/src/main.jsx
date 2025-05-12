import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App.jsx';
import { Toaster } from "./components/ui/toaster.jsx";
import './index.css';
import { store } from "./redux/store.js";
import './styles.scss';
import customThemeSystem from "./theme.js";


createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider value={customThemeSystem}>
                <Toaster />
                <App />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
)
