import React, {Suspense} from 'react';
import SuperTellerHeader from "./SuperTellerHeader";
import {Route, Switch} from "react-router-dom";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import {connect} from "react-redux";
import {mapDispatchToProps, mapStateToProps, stateKeys} from "../redux/actions";

import SuperTellerDashboard from "../pages/SuperTeller/Dashboard";
import Tellers from "../pages/SuperTeller/Tellers";
import Collections from "../pages/SuperTeller/Collections";

const SuperTellerBody = (props) => {
	return (
		<>
			<div className={props[stateKeys.PAGE_CLASS]}>
				<section className="sidenav-enabled pb-3 pb-md-4">
					<SuperTellerHeader/>
					<ErrorBoundary>
						<Suspense fallback={<p>Loading...</p>}>
							<div className="main-content pt-md-5">
								<Switch>
									<Route path={'/superteller/index'} component={SuperTellerDashboard} exact={true}/>
									<Route path={'/superteller/tellers'} component={Tellers} exact={true}/>
									<Route path={'/superteller/collections'} component={Collections} exact={true}/>
								</Switch>
							</div>
						</Suspense>
					</ErrorBoundary>
				</section>
			</div>
		</>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(SuperTellerBody);