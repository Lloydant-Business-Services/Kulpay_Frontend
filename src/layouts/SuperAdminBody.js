import React, {Suspense} from 'react';
import Header from "./SuperAdminHeader";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";

import SuperAdminDashboard from "../pages/SuperAdmin/Dashboard";
import DashboardActive from "../pages/Bursar/DashboardActive";
import Verification from "../pages/Bursar/Verification";
import AccountVerification from "../pages/Bursar/AccountVerification";
import Collections from "../pages/Bursar/Collections";
import Vendors from "../pages/Bursar/Vendors";
import SuperTellers from "../pages/SuperAdmin/SuperTellers";
import SystemUsers from "../pages/SuperAdmin/SystemUsers";
import TellerBanks from "../pages/SuperAdmin/TellerBanks";
import ManageFacultyDepartments from "../pages/SuperAdmin/ManageFacultyDepartments";
import PaymentGateways from "../pages/SuperAdmin/PaymentGateways";
import KulCharges from "../pages/SuperAdmin/kulpaycharges";
import VerificationRequests from "../pages/SuperAdmin/verificationrequests";
import KulBankAccounts from "../pages/SuperAdmin/kulbankaccounts";
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux_Slices/userSlice';
// import NewCollection from "../pages/SuperAdmin/NewCollection";

const SuperAdminBody = (props) => {
    const user = useSelector(selectUser);
	return (
		<>
			<div className={props[stateKeys.PAGE_CLASS] + ' container-fluid'}>
				<section className="sidenav-enabled row pb-3 pb-md-4">
					<div className="col-xl-12">
						<Header/>
						<ErrorBoundary>
							<Suspense fallback={<p>Loading...</p>}>
                            <div className="main-content pt-md-5">
								<Switch>
									<Route path={'/superadmin/index'} component={SuperAdminDashboard} exact={true}/>
									<Route path={'/superadmin/index2'} component={DashboardActive} exact={true}/>
									<Route path={'/superadmin/verification'} component={Verification} exact={true}/>
									<Route path={'/superadmin/collections'} component={Collections} exact={true}/>
									<Route path={'/superadmin/vendors'} component={Vendors} exact={true}/>
									<Route path={'/superadmin/supertellers'} component={SuperTellers} exact={true}/>
									<Route path={'/superadmin/systemusers'} component={SystemUsers} exact={true}/>
									<Route path={'/superadmin/tellerbanks'} component={TellerBanks} exact={true}/>
									<Route path={'/superadmin/paymentgateways'} component={PaymentGateways} exact={true}/>
									<Route path={'/superadmin/schooldepartments'} component={ManageFacultyDepartments} exact={true} />
										<Route path={'/superadmin/kulCharges'} component={KulCharges} exact={true} />
										<Route path={'/superadmin/verificationRequests'} component={VerificationRequests} exact={true} />
										<Route path={'/superadmin/kulaccounts'} component={KulBankAccounts} exact={true} />
									{/* <Route path={'/admin/newCollection'} component={NewCollection} exact={true}/> */}
									<Route path={'/admin/account_verification'} component={AccountVerification} exact={true}/>
								</Switch>
                                </div>
							</Suspense>
						</ErrorBoundary>
					</div>
				</section>
			</div>
		</>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminBody);