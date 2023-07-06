import React, {Component} from 'react';
import Footer from "./Footer";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {Route, Switch} from "react-router-dom";

import "../assets/css/Front.css";

import Home from "../pages/Front/Home";
import Register from "../pages/Front/Auth/Register";
import Login from "../pages/Front/Auth/Login";
import SignIn from "../pages/Front/Auth/SignIn";
import CreateAccount from "../pages/Front/Auth/CreateAccount";
import PageNotFound from "../pages/PageNotFound";

import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";
import Dialog from "../components/Dialog/Dialog";
import FrontHeader from "./FrontHeader";
import {UnAuthRoute} from "../components/Authenticator/Authenticate";
import NewHome from "../pages/Front/NewHome"
import AccountSettings from "../pages/Common/AccountSettings";
import Invoice from "../pages/Common/Invoice";
import InvoiceAlt from "../pages/Common/InvoiceAlt";
import SchoolPortalMock from "../pages/Common/SchoolPortalMock";
import UserVerification from "../pages/Common/userverification";
import ProcessPayment from "../pages/Common/payment_processed";
import Receipt from "../pages/Common/Reciept";



export class FrontBody extends Component {
    render() {
        return (
            <>
                {/* <FrontHeader/> */}
                <main style={{background:'#e5e5e51f'}}>
                    <ErrorBoundary>
                        <Switch>
                            {/* <Route path={'/'} component={Home} exact={true}/> */}
                            {/* <Route path={'/home'} component={Home}/> */}
                            <Route path={'/'} component={NewHome} exact/>
                            {/* <Route path={'/si'} component={SignIn} exact/> */}

                            
                            <UnAuthRoute path={'/register'} component={Register}/>
                            <UnAuthRoute path={'/login'} component={Login}/>
                            <UnAuthRoute path={'/signin'} component={SignIn}/>
                            <UnAuthRoute path={'/create_account'} component={CreateAccount}/>
                            <Route path="/accountsettings" component={AccountSettings}/>
                        <Route path="/invoice" component={Invoice}/>
                        <Route path="/invoice2" component={InvoiceAlt}/>
                        <Route path="/userverification" component={SchoolPortalMock}/>
                        <Route path="/schoolportal" component={UserVerification}/>
                        <Route path="/payment_processed" component={ProcessPayment}/>
                        <Route path="/paymentreceipt" component={Receipt}/>

                        
                            <Route component={PageNotFound}/>
                        </Switch>
                    </ErrorBoundary>
                    <Dialog/>
                </main>
                {/* <Footer/> */}
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FrontBody);
