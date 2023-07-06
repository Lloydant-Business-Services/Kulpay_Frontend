import {createStore} from "redux";
import {reducer} from "./reducers";

//const store = createStore(reducer);
//export default store;


import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux_Slices/userSlice";
import institutionReducer from "../Redux_Slices/InstitutionSlice";


export default configureStore({
    reducer:{
        user:reducer,
        //institution: institutionReducer
    },
    
});
