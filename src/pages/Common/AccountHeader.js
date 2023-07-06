import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Logo from "../../assets/images/home/logo.png";
import {getUser, logOutUser} from "../../utils/auth";

import Avatar from "../../assets/images/avatar.png";

import logo from "../../assets/images/alldarkLogo.png"
import dashSvg from "../../assets/images/dash-svg.svg"
import notificatiionSvg from "../../assets/images/Notification.svg"
import searchSvg from "../../assets/images/search.svg"
import collectionsSvg from "../../assets/images/coll.svg"
import trans_white from "../../assets/images/transac_white.svg"
import logOutSvg from "../../assets/images/dashprofile-icon.svg"
import settingsTop from "../../assets/images/settings_applications.svg"
import dashTopSvg from "../../assets/images/dash-svg.svg"
import $ from 'jquery'
import * as Unicons from '@iconscout/react-unicons';

// reactstrap components
import {
	Collapse,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown,
	DropdownToggle,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Media,
	NavbarBrand,
	Navbar,
	NavItem,
	NavLink,
	Nav,
	Container,
	Row,
	Col
} from "reactstrap";
import {useMergeState} from "../../utils/helpers";

const AccountHeader = (props) => {
	
	const [navValues, setNavValues] = useMergeState({
		collapseOpen: false,
		redirect: false,
		payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')),
		drop1: false,
		activeClasses: [false, false, false, false],
		user: getUser(),
        pageTitle : window.location.href
        // pageTitle : $(document).find("title").text()
        
	});
	
	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setNavValues({
			collapseOpen: !navValues.collapseOpen
		});
	};
	
	const toggleDrop1 = () => {
		setNavValues({
			drop1: !navValues.drop1
		})
	};
	
	const logout = () => {
		localStorage.clear();
		setNavValues({
			redirect:true
		})
	};
	
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('_IDENTITY_'));
		let extURL = document.URL;
        var url = new URL(extURL);
        var arraySplit = extURL.split("/");
        var fuseIndex = arraySplit[arraySplit.length - 2]
        setTimeout(() => {
            if(user.role == "teller"){
                setNavValues({
                    _dashboard_redirect: "/teller/index",
                    _roleName: "Teller"
                });
            }
            else if(user.role == "superteller@kulpay"){
                setNavValues({
                    _dashboard_redirect: "/superteller/index",
                    _roleName: "Super Teller"
                });
            }
            else if(user.role == "bursar"){
                setNavValues({
                    _dashboard_redirect: "/admin/index",
                    _roleName: "School Admin"
                });
            }
        }, 1500);
        
	
	}, []);
	
	return (
		<>
		
			<div className="main-content" style={{background:'#E5E5E5'}}>
				<Navbar className="navbar-top navbar-light d-none d-md-block" expand="md" id="navbar-main">
					<div className="container-fluid">
						<Link className="h4 mb-0 d-none d-lg-inline-block" to="/" >
                            <NavbarBrand className="py-0" style={{textAlign:'left'}}>
						<img alt={'logo'} style={{width:'95px'}} className="navbar-brand-img mr-2" src={logo} />
						
					
					</NavbarBrand>
						</Link>
						
						<Nav className="align-items-center d-none d-md-flex" navbar>
                            <span>
                                <img src={searchSvg} style={{width:'24px', height:'24px', marginRight:'40px'}}/>
                                <img src={notificatiionSvg} style={{width:'24px', height:'24px', marginRight:'40px'}}/>
                            </span>
							<UncontrolledDropdown nav>
								<DropdownToggle className="pr-0" nav>
									<Media className="align-items-center">
                                    <div className="row profile-drop">
                                        <div className="col-sm-2">
                                        <span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={Avatar} />
									</span>
                                        </div>

                                    <div className="col-sm-7" style={{marginTop:'5px',marginLeft:'9px'}}>
                                       <p className="manrope drk-text" style={{fontSize:'9px', lineHeight:'4px'}}>
                                       {navValues.payLoad?.fullName?.length > 17 ? navValues.payLoad?.fullName.substring(0,17) + ".." : navValues.payLoad?.fullName }
                                          
                                           </p>
                                       <p className="manrope-text" style={{fontSize:'10px', lineHeight:'4px'}}>
                                       {navValues._roleName}
                                       </p>
                                    </div>

                                    <div className="col-sm-1" style={{marginTop:'5px',marginLeft:'10px'}}>
                                       <i className="fa fa-caret-down"/>
                                    </div>
                                    </div>
									{/* <span className="avatar avatar-sm rounded-circle">
										<img alt="..." src={Avatar} />
									</span> */}
										{/* <Media className="ml-2 d-none d-lg-block">
										<span className="mb-0 text-sm font-weight-bold">
                                            Scott Obi
											{navValues.payLoad.fullName}
										</span>
										</Media> */}
									</Media>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-arrow" right>
									{/* <DropdownItem className="noti-title" header tag="div">
										<h6 className="text-overflow m-0">Welcome!</h6>
									</DropdownItem> */}
									
									<DropdownItem to={navValues._dashboard_redirect} tag={Link}>
                                    <img src={dashTopSvg} style={{width:'18px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text">Dashboard</span>
									</DropdownItem>

                                    <DropdownItem to="/accountsettings" tag={Link}>
                                    <img src={settingsTop} style={{width:'20px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text">Account Settings</span>
									</DropdownItem>
									
                                    <DropdownItem onClick={() => logOutUser(false)}>
                                    <img src={logOutSvg} style={{width:'18px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text">Logout</span>
									</DropdownItem>
									{/* <DropdownItem divider />
									
									<DropdownItem onClick={() => logOutUser(false)}>
										<i className="ni ni-user-run" />
										<span>Logout.</span>
									</DropdownItem> */}
								</DropdownMenu>
							</UncontrolledDropdown>
						</Nav>
					</div>
				
				</Navbar>
			</div>
		
		</>
	);
};

export default AccountHeader;