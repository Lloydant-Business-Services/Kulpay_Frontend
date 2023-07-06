import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom";
import { userType, boardingStatus } from "../../utils/Identifiers";
import {getUser, loadUserInfo, userLoggedIn, logOutUser, clearStore} from "../../utils/auth";

export const AuthRoute = withRouter(({component: Component, path, authorized, ...rest}) => {
    if (userLoggedIn()) {
        const user = getUser();
        if (!user) {
            //Update full details from server
            loadUserInfo();
        }
        
        if (authorized.length > 0 && user.onboardingStatus == boardingStatus.AwaitingApproval) {
            return (
                <>
               
                    <Route path={path} component={Component} {...rest} />
                    <Redirect
                        from={path}
                        to={{
                            pathname: "/admin/index",
                        }}
                    />
                </>
            );
        }
        //Authorization
        if (authorized.length && user) {
            loadUserInfo();

            if (!authorized.includes(user.role)) {
                clearStore()
                return <Redirect from={path} to={`/signin`}/>
            }
        }
     

        
        return <Route path={path} component={Component} {...rest}/>
    } else
        return <Redirect from={path} to={`/signin`}/>
});

export const UnAuthRoute = withRouter(({component: Component, path, ...rest}) => {
    // const user = getUser();
        return <Route path={path} component={Component} {...rest}/>
});