import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import {BoardStateProvider} from "./contexts/BoardStateProvider";
require('./global.less');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BoardStateProvider>
            <App />
        </BoardStateProvider>
    </React.StrictMode>
);