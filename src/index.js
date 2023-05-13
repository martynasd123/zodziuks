import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {BoardStateProvider} from "./contexts/BoardStateProvider";
import {ToastContextProvider} from "./contexts/ToastContext";
import { initPlausible } from "./Analytics";
require('./global.less');

const root = ReactDOM.createRoot(document.getElementById("root"));
// initPlausible();

root.render(
    <React.StrictMode>
        <BoardStateProvider>
            <ToastContextProvider>
                <App />
            </ToastContextProvider>
        </BoardStateProvider>
    </React.StrictMode>
);