import React, {Suspense} from 'react';
import Header from "./TellerHeader";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";

import TellerDashboard from "../pages/Teller/Dashboard";
import AccountSettings from "../pages/Common/AccountSettings";
import HODInstructors from "../pages/Teller/Instructors";
import HODCourses from "../pages/Teller/Courses";
import Collections from "../pages/Teller/Collections";
import Transactions from "../pages/Teller/Transactions";
import {Fade} from 'reactstrap'

const HODBody = (props) => {
	return (
		<>
			<div className={props[stateKeys.PAGE_CLASS]}>
				<section className="sidenav-enabled pb-3 pb-md-4">
					<Header/>
					<ErrorBoundary>
						<Suspense fallback={<p>Loading...</p>}>
							<div className="main-content pt-md-5" style={{background:'#e5e5e51f'}}>
                              

								<Switch>
                                   
									<Route path={'/teller/index'} component={TellerDashboard} exact={true}/>
									<Route path={'/teller/accountsettings'} component={AccountSettings}/>
                                    
									<Route path={'/teller/instructors'} component={HODInstructors} exact={true}/>
									<Route path={'/teller/courses'} component={HODCourses} exact={true}/>
									<Route path={'/teller/collections'} component={Collections} exact={true}/>
									<Route path={'/teller/transactions'} component={Transactions} exact={true}/>
								</Switch>
                         

							</div>
						</Suspense>
					</ErrorBoundary>
				</section>
			</div>
		</>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(HODBody);