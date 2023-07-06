import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './assets/css/App.css';
import App from './App';
import {Provider} from 'react-redux';
import Endpoint from "./utils/endpoint";
import {createStore} from "redux";
import store from "./redux/store";
import {bugAdded, bugResolved} from "./redux/actionCreators";
import { PersistGate } from 'redux-persist/integration/react'
// import { TourProvider } from "@reactour/tour";
// import { TourProvider } from '@reactour/tour'
//import {handleAxiosError, setReduxState} from "./utils/helpers";

//Setup endpoint configurations
// const store = createStore(() => ({
//     birds: [
//       {
//         name: 'robin',
//         views: 1
//       }
//     ]
//   }));
Endpoint.init();
//const store = require('./Redux_Slices/userSlice')
//store.default.getState()
// store.subscribe(() => {
//     console.log("Store Changed", store.getState());
// })

//store.dispatch(bugAdded("trijan"));
//store.dispatch(bugResolved(1));

//console.log(store.getState())
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

