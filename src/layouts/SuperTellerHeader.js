import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import Logo from "../assets/images/home/logo.png";
import {getUser, logOutUser} from "../utils/auth";

import Avatar from "../assets/images/avatar.png";

import logo from "../assets/images/superTellerLogo.png"
import dashSvg from "../assets/images/dashboardSuper.svg"
import notificatiionSvg from "../assets/images/Notification.svg"
import searchSvg from "../assets/images/search.svg"
import collectionsSvg from "../assets/images/coll.svg"
import trans_white from "../assets/images/transac_white.svg"
import logOutSvg from "../assets/images/dashprofile-icon.svg"
import settingsTop from "../assets/images/settings_applications.svg"
import dashTopSvg from "../assets/images/dash-svg.svg"
import TellersSide from "../assets/images/TellersSide.svg"
import DocMoney from "../assets/images/Doc_Money.svg"
import superTellerDashboardWhite from "../assets/images/superTellerDashboardWhite.svg"
import superTellersBlue from "../assets/images/superTellersBlue.svg"
import superTellerCollectionsBlue from "../assets/images/superTellerCollectionsBlue.svg"
import superTellerReportsBlue from "../assets/images/superTellerReportsBlue.svg"



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
import {useMergeState} from "../utils/helpers";

const SuperTellerHeader = (props) => {
	
	const [navValues, setNavValues] = useMergeState({
		collapseOpen: false,
		redirect: false,
		payLoad: JSON.parse(localStorage.getItem('user')),
		drop1: false,
		activeClasses: [false, false, false, false],
		user: getUser(),
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
	const MenuToggle = (id) => {
        var element = document.getElementsByClassName("super-teller-side-active");
        if(element.length > 0){
            for(var i = 0; i < element.length; i++){
                    element[i].className = 'super-teller-side';
                }

                var currentNode = document.getElementById(`${id}`);
                currentNode.className = "super-teller-side-active"
                setNavValues({
                    isIcon:id
                })
        }
        
        
        
       // currentNode.addClass('.teller-side-active')
    }
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
        setNavValues({payLoad: user});
		let extURL = document.URL;
        var url = new URL(extURL);
        var arraySplit = extURL.split("/");
        var fuseIndex = arraySplit[arraySplit.length - 2] + arraySplit[arraySplit.length - 1]
        console.log(fuseIndex, "fused")
        var element = document.getElementsByClassName("super-teller-side-active");
        if(element.length > 0){
            for(var i = 0; i < element.length; i++){
                    element[i].className = 'super-teller-side';
                }

                var currentNode = document.getElementById(`${fuseIndex}`);
                currentNode.className = "super-teller-side-active"
                setNavValues({
                    isIcon:fuseIndex
                })
        }
	
	}, []);
	
	
	
	return (
		<>
			<Navbar className="navbar-vertical fixed-left navbar-dark" style={{backgroundColor: "#1B52C4"}} expand="md" id="sidenav-main" >
				<Container fluid>
					{/* Toggler */}
					<button className="navbar-toggler" type="button" onClick={toggleCollapse} >
						<span className="navbar-toggler-icon" />
					</button>
					
					{/* Brand */}
					{/* {logo ? ( */}
					<NavbarBrand className="py-0" style={{textAlign:'left'}}>
						<img alt={'logo'} style={{width:'95px', height:'34px'}} className="navbar-brand-img mr-2" src={logo} />
						
						{/* <Link className="h4 mb-0 text-white d-none d-md-inline-block" to="/" >
							e-Learn NG
						</Link> */}
					</NavbarBrand>
					{/* ) : null} */}
					
					{/* User */}
					<Nav className="align-items-center d-md-none">
						
						<UncontrolledDropdown nav>
							<DropdownToggle nav>
								<Media className="align-items-center">
                                   
									<span className="avatar avatar-sm rounded-circle">
										<img alt="avatar" src={Avatar}/>
									</span>
								</Media>
							</DropdownToggle>
							
							<DropdownMenu className="dropdown-menu-arrow" right>
								<DropdownItem className="noti-title" header tag="div">
									<h6 className="text-overflow m-0">Welcome!</h6>
								</DropdownItem>
								
								<DropdownItem to="/student/profile" tag={Link}>
									<Unicons.UilUserCircle size="20"/>
									<span>My profile</span>
								</DropdownItem>
								
								<DropdownItem divider />
								
								<DropdownItem onClick={() => logOutUser(false)}>
									<Unicons.UilSignout size="20"/>
									<span>Logout</span>
								</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					{/* Collapse */}
					<Collapse navbar isOpen={navValues.collapseOpen} style={{overflow:'hidden'}}>
						{/* Collapse header */}
						<div className="navbar-collapse-header d-md-none">
							<Row>
								<Col className="" xs="9">
									<img alt={'logo'} className="navbar-brand-img mr-2" src={logo} />
									{/* <span className="font-weight-bold"> ABSU KulPay </span> */}
								</Col>
								
								<Col className="collapse-close" xs="3">
									<button
										className="navbar-toggler"
										type="button"
										onClick={toggleCollapse}
									>
										<span />
										<span />
									</button>
								</Col>
							</Row>
						</div>
						
						{/* Navigation */}
						{/* Divider */}
						
						{/* Navigation */}
						<Nav className="mt-md-4 mb-md-3" navbar style={{marginTop:'2.5rem'}}>
							<NavItem className="super-teller-side super-teller-side-active"  to="/superteller/index" tag={Link} id="supertellerindex" onClick={() => MenuToggle("supertellerindex")}>
								<NavLink>
									{/* <Unicons.UilApps size="20"/> &nbsp; */}
                                    {/* <img src={dashSvg} style={{width:'18px'}}/> &nbsp; &nbsp; */}
                                    {navValues.isIcon === "supertellerindex" ? <img src={dashSvg} style={{width:'18px'}}/> : <img src={superTellerDashboardWhite} style={{width:'18px'}}/>}
                                     &nbsp; &nbsp;
									Dashboard
								</NavLink>
							</NavItem>
							
							<NavItem className="super-teller-side" to="/superteller/tellers" tag={Link} id="supertellertellers" onClick={() => MenuToggle("supertellertellers")}>
								<NavLink >
                                {navValues.isIcon === "supertellertellers" ? <img src={superTellersBlue} style={{width:'18px'}}/> : <img src={TellersSide} style={{width:'18px'}}/>} &nbsp; &nbsp;
									Tellers
								</NavLink>
							</NavItem>
								
							<NavItem className="super-teller-side" to="/superteller/collections" tag={Link} id="supertellercollections" onClick={() => MenuToggle("supertellercollections")}>
								<NavLink>
                                {/* <img src={DocMoney} style={{width:'18px'}}/> &nbsp; &nbsp; */}
                                {navValues.isIcon === "supertellercollections" ? <img src={superTellerCollectionsBlue} style={{width:'18px'}}/> : <img src={DocMoney} style={{width:'18px'}}/>} &nbsp; &nbsp;
									Collections
								</NavLink>
							</NavItem>
							<NavItem className="super-teller-side" to="/superteller/reports" tag={Link} id="supertellerreports" onClick={() => MenuToggle("supertellerreports")}>
								<NavLink to="/superteller/reports">

                                {navValues.isIcon === "supertellerreports" ? <img src={superTellerReportsBlue} style={{width:'18px'}}/> : <img src={collectionsSvg} style={{width:'18px'}}/>} &nbsp; &nbsp;

									Report
								</NavLink>
							</NavItem>
{/* 							
							<NavItem>
								<NavLink href="/hod/courses">
									<Unicons.UilUserCircle size="20"/> &nbsp;
									Profile
								</NavLink>
							</NavItem>
							
							<NavItem>
								<NavLink href="#" onClick={() => logOutUser(false)}>
									<Unicons.UilSignout size="20"/> &nbsp;
									Logout
								</NavLink>
							</NavItem> */}
                            <div className="sub_div container">
                                <p><a className="manrope-text">Technical help</a></p>
                                <p><a className="manrope-text">Contact us</a></p>
                            </div>
						</Nav>
					
					</Collapse>
				</Container>
			</Navbar>
			
			<div className="main-content">
				<Navbar className="navbar-top navbar-light d-none d-md-block" expand="md" id="navbar-main">
					<div className="container-fluid">
						<Link className="h4 mb-0 d-none d-lg-inline-block" to="/" >
							{/* ABSU e-Learn NG */}
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
                                       <p className="manrope drk-text" style={{fontSize:'12px', lineHeight:'4px'}}>Maxbert Okoro</p>
                                       <p className="manrope-text" style={{fontSize:'10px', lineHeight:'4px'}}>Super Teller</p>
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
									
									<DropdownItem to="/admin/user-profile" tag={Link}>
                                    <img src={dashTopSvg} style={{width:'24px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text">Dashboard</span>
									</DropdownItem>

                                    <DropdownItem to="/accountsettings" tag={Link}>
                                    <img src={settingsTop} style={{width:'24px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text">Account Settings</span>
									</DropdownItem>
									
                                    <DropdownItem onClick={() => logOutUser(false)}>
                                    <img src={logOutSvg} style={{width:'24px', height:'24px', marginRight:'20px'}}/>
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

export default SuperTellerHeader;