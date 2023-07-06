import React, {Suspense} from 'react';
import Header from "./BursarHeader";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";

import SuperAdminDashboard from "../pages/Bursar/Dashboard";
import DashboardActive from "../pages/Bursar/DashboardActive";
import Verification from "../pages/Bursar/Verification";
import AccountVerification from "../pages/Bursar/AccountVerification";
import Collections from "../pages/Bursar/Collections";
import Vendors from "../pages/Bursar/Vendors";
import SchoolDepartments from "../pages/Bursar/SchoolDepartments";
import Programmes from "../pages/Bursar/Programmes";
import SettlementReport from "../pages/Bursar/Report/SettlementReport";
import CollectionReport from "../pages/Bursar/Report/CollectionReport";
import DailyCollectionReport from "../pages/Bursar/Report/dailyReport";
import MonthlyCollectionReport from "../pages/Bursar/Report/monthlyReport";
import ComparisonReport from "../pages/Bursar/Report/comparisonReport";
import inflows from "../pages/Bursar/Report/inflows";
import Outflows from "../pages/Bursar/Report/outflows";
import AjaxTable from "../pages/Bursar/Report/ajaxTable";
import Inflows from '../pages/Bursar/Report/inflows';
import AnalyticsMain from "../pages/Bursar/Report/analyticsMain";
import InvoiceReport from "../pages/Bursar/Report/invoiceReport";
import Awaiting from "../pages/Bursar/awaitingapproval";

// import NewCollection from "../pages/SuperAdmin/NewCollection";

const BursarBody = (props) => {
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
									<Route path={'/admin/index'} component={SuperAdminDashboard} exact={true}/>
									<Route path={'/admin/index2'} component={DashboardActive} exact={true}/>
									<Route path={'/admin/verification'} component={Verification} exact={true}/>
									<Route path={'/admin/collections'} component={Collections} exact={true}/>
									<Route path={'/admin/vendors'} component={Vendors} exact={true}/>
									<Route path={'/admin/schooldepartments'} component={SchoolDepartments} exact={true}/>
									<Route path={'/admin/institutionprogramme'} component={Programmes} exact={true}/>
									<Route path={'/admin/settlementreport'} component={SettlementReport} exact={true}/>
									<Route path={'/admin/collectionreport'} component={CollectionReport} exact={true}/>
									<Route path={'/admin/dailycollectionreport'} component={DailyCollectionReport} exact={true}/>
									<Route path={'/admin/monthlycollectionreport'} component={MonthlyCollectionReport} exact={true}/>
									<Route path={'/admin/comparisonreport'} component={ComparisonReport} exact={true}/>
									<Route path={'/admin/inflowreport'} component={Inflows} exact={true}/>
									<Route path={'/admin/outflowreport'} component={Outflows} exact={true}/>
										<Route path={'/admin/analytics'} component={AnalyticsMain} exact={true}/>
									<Route path={'/admin/ajaxtable'} component={AjaxTable} exact={true}/>
										<Route path={'/admin/invoicereport'} component={InvoiceReport} exact={true} />
										<Route path={'/admin/awaitingapproval'} component={Awaiting} exact={true} />

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

export default connect(mapStateToProps, mapDispatchToProps)(BursarBody);