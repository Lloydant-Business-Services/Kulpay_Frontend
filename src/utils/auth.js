import React from 'react';
import {stateKeys} from "../redux/actions";
import {setReduxState} from "./helpers";
import {boardingStatus, userType} from "./Identifiers";
import { Redirect, Route, withRouter, useHistory } from "react-router-dom";
import UserContext from "../Context/UserContext"
import { login } from "../Redux_Slices/userSlice";
import { init__institution } from "../Redux_Slices/InstitutionSlice";
import store from "../redux/store"
//import { Redirect } from "react-router";
//import {browserHistory, hi} from "react-router";

export function __RouteProps(route) {
    useHistory.push(route);
}
const TOKEN_KEY = 'token';
export const USER_KEY = '_IDENTITY_';

export function userLoggedIn() {
    return !!getUserToken();
}

export function getActiveStore() {
    return sessionStorage.getItem(USER_KEY) ? sessionStorage : localStorage;
}
// export function getActiveStore() {
//     return sessionStorage.getItem(TOKEN_KEY) ? sessionStorage : localStorage;
// }

export function getUserToken() {
    return getActiveStore().getItem(TOKEN_KEY)
}

export function loadUserInfo() {
  
    const data = getActiveStore().getItem(stateKeys.USER)
    const user = data ? JSON.parse(data) : null;
    setReduxState(user, stateKeys.USER)
    return user;
}

export function getUser(key, defaultValue = null) {
    
    const userData = getActiveStore().getItem(stateKeys.USER);
    let data = userData ? JSON.parse(userData) : null;

    if (!data || (key && typeof data[key] === 'undefined')) {
        return defaultValue
    }

    return key ? data[key] : data;
}

export function updateUserInfo(data) {
    const userData = getUser();
    let update = Object.assign({}, userData, data);

    getActiveStore().setItem(stateKeys.USER, JSON.stringify(update));
    setReduxState(update, stateKeys.USER)
}

export function loginUser(token, user, redirect) {
    // store.dispatch(
    //     login({
    //         user:"jhkl"
    //     }),
    //     init__institution({
    //         init__institution:"Delta State University"
    //     })
    // )

    const storage = localStorage;
    const _storage = sessionStorage;
    storage.setItem(TOKEN_KEY, token);
    _storage.setItem(TOKEN_KEY, token);
    if (user) {

    //storage.setItem("_IDENTITY_", JSON.stringify(user));
    storage.setItem("_IDENTITY_", JSON.stringify(user));

    if (redirect) {
        const intended = rememberRoute();
        if (intended) {
            window.location = intended;
        } 
        
        else if(user.role == "bursar"){

            // store.dispatch(
            //     login({
            //         user:"jhkl"
            //     })
                
            // )


            //comm
           
            if(!user.hasDoneInstitutionVerification || !user.hasDonePersonalVerification){
                //UserContext.r
                window.location = "/admin/verification";
            }
            else{
                store.dispatch(
                    login({
                        user:user
                    })
                )
    setReduxState(user, stateKeys.USER)
    //return <Redirect to={{pathname:"/admin/index"}}/>
// return <Redirect from={"/signin"} to={`/admin/index`}/>
//__RouteProps("/admin/index")
               window.location = "/admin/index";
            }
            

            return true;
        }
        else if(user.role == "superadmin"){
                //UserContext.r
                window.location = "/superadmin/index";
            
            return true;
        }
        else if(user.role == "superteller"){
            //UserContext.r
            window.location = "/superteller/index";
        
        return true;
    }
        else if(user.role == "teller"){
            //UserContext.r
            window.location = "/teller/index";
        
        return true;
    }
        else{
            return false
        }
       
        }
    }

}
export const AuthRoute = withRouter(({component: Component, path, authorized, ...rest}) => {

    return <Redirect from={`/signin`} to={path}/>

});

export function rememberRoute() {
    const key = '__intended';
    const old = sessionStorage.getItem(key);
    // sessionStorage.setItem(key, window.location.pathname);

    return old;
}

export function logOutUser(redirect) {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
    // localStorage.removeItem(stateKeys.USER);
    // sessionStorage.removeItem(stateKeys.USER);

    window.location = redirect ? redirect : '/signin';
}
export function clearStore() {
    // getActiveStore().removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY);
    // localStorage.removeItem(stateKeys.USER);
    // sessionStorage.removeItem(stateKeys.USER);
}

export function updateStorage(institution, boardingStatus, instType){
    const storage = JSON.parse(localStorage.getItem('_IDENTITY_'))
    // console.log(storage)
    if(institution != null && boardingStatus > 0){
        storage.institutionId = institution;
        storage.onboardingStatus = boardingStatus
        storage.institutionTypeId = parseInt(instType)

        localStorage.removeItem('_IDENTITY_')
        setTimeout(() => {
            localStorage.setItem('_IDENTITY_',  JSON.stringify(storage))
        }, 2000);
    }
    else if(institution != null){
        storage.institutionId = institution;
        localStorage.removeItem('_IDENTITY_')
        setTimeout(() => {
            localStorage.setItem('_IDENTITY_',  JSON.stringify(storage))
        }, 2000);
        // console.log(storage, "inst")
    }
    else if(boardingStatus > 0){
        alert("3")
        storage.onboardingStatus = boardingStatus
        console.log(storage, "brd")
        localStorage.removeItem('_IDENTITY_')
        setTimeout(() => {
           localStorage.setItem('_IDENTITY_',  JSON.stringify(storage))
        }, 2000);
    }
}

export function updateBordingLocal(status){
    const storage = JSON.parse(localStorage.getItem('_IDENTITY_'))
    console.log(storage)

    if(status > 0){
        storage.onboardingStatus = status
        console.log(storage, "brd")
        localStorage.removeItem('_IDENTITY_')
        setTimeout(() => {
           localStorage.setItem('_IDENTITY_',  JSON.stringify(storage))
           if(storage.onboardingStatus < boardingStatus.Collection){
            window.location.reload(true)
        }
        }, 2000);
      
    }
}