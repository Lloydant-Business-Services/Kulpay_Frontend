import React, {useEffect, useState, useContext} from 'react'
import {Link} from "react-router-dom";
import Logo from "../assets/images/home/logo.png";
import {getUser, logOutUser} from "../utils/auth";
import {resetStore} from "../utils/helpers";
import { connect, useDispatch } from "react-redux";
import { login } from "../Redux_Slices/userSlice";
import { init__institution } from "../Redux_Slices/InstitutionSlice";
import Avatar from "../assets/images/avatar.png";

import logo from "../assets/images/logoSuper.png"
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
import { Drawer, Button, Space, Radio, List, Typography, Divider } from 'antd';
import { DrawerProps } from 'antd/es/drawer';
import { LoginOutlined } from '@ant-design/icons';
import { UsergroupAddOutlined } from '@ant-design/icons';

//import { UserContext } from '../Context/UserContext';
import { useSelector } from 'react-redux';
import { selectUser } from '../Redux_Slices/userSlice';

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
import {useMergeState, setReduxState, reduxState} from "../utils/helpers";
import { stateKeys } from '../redux/actions';
const listStyle = {
        color: '#ffffffcf',
        cursor:'pointer',
        fontWeight:'700'
}
//require("../assets/css/antDrawerSA.css")

const SuperTellerHeader = (props) => {
	//const vv = useContext(UserContext);
const dispatch = useDispatch();
const user = reduxState(stateKeys.USER, "").user[stateKeys.USER];
//const user = useSelector(selectUser);

let setRedux;
let getRedux;
//const __store = {};

	const [navValues, setNavValues] = useMergeState({
		collapseOpen: false,
		redirect: false,
		payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')),
		drop1: false,
		activeClasses: [false, false, false, false],
		user: getUser(),
        visible:false
	});
    
  const showDrawer = (e) => {
    setNavValues({visible:true});
    e.preventDefault();
        //getRedux = reduxState(stateKeys.USER, user);
        //getRedux.fullName = "Miracle";
			var ff = {
				yes:"Mum",
				No:"klk"
			}
        //dispatch(
        //     init__institution({
        //     institution:"Delta"
        // }),
        // login({
        //     user:ff
            
        // })
        
        //)
        getRedux = reduxState(stateKeys.USER, user);

        // user.fullName = "Miracle Oghene"
        //setReduxState(getRedux, stateKeys.USER);
        //getRedux = reduxState(stateKeys.USER, user);
        // var tt = JSON.stringify(getRedux);
        // console.log(tt, "string")
        // var dd = JSON.parse(tt);
        console.log(user, "usee")

        //console.log(getRedux, "get")

        // setTimeout(() => {
        console.log(getRedux.user[stateKeys.USER], "get")
        //getRedux.fullName = "Miracle";
        //var gg = getRedux;
        //resetStore();
        //setReduxState(gg, stateKeys.USER);
        //console.log(gg, "modd")
        //    dispatch(     
        // login({
        //     user:{
        //         fullName:"hjbkn",
        //         kk:"yuhijk"
        //     }          
        // })
        
        // ) 
        // }, 2000);
  };
 
  const onClose = () => {
    setNavValues({visible:false});
  };
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
		require("../assets/css/antDrawerSA.css")
		//const user = JSON.parse(localStorage.getItem('user'));
        //setNavValues({payLoad: user});
        //console.log(vv, "edcx")
        // dispatch(
        //     login({
        //     user:navValues?.payLoad
        // }))
        //__store = user?.user;
        //setRedux = setReduxState(navValues?.payLoad, stateKeys.USER);
        getRedux = reduxState(stateKeys.USER, null);
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
                if(currentNode != null && currentNode != 'undefined'){
                    currentNode.className = "super-teller-side-active"
                    setNavValues({
                        isIcon:fuseIndex
                    })
                }
                
        }
        setTimeout(() => {
        console.log(user,"User state")
            
        }, 4000);
	
	}, []);
	
	
	
	return (
		
		<>
       
       <Drawer
        title={<img alt={'logo'} style={{width:'95px', height:'34px'}} className="navbar-brand-img mr-2" src={logo} />}
        placement={'left'}
        width={500}
        onClose={onClose}
        visible={navValues.visible}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
      >
          <div className="manrope-text">
         
    <List
   
    >
        <List.Item >
            <Link style={listStyle} to="/superadmin/schooldepartments" onClick={onClose}>
        <LoginOutlined /> &nbsp; Department/School Settings
        </Link>
        </List.Item>
        {/* <List.Item>
        <Link style={listStyle} to="/superadmin/tellerbanks" onClick={onClose}>
        <LoginOutlined /> &nbsp; Teller Banks
        </Link>
        </List.Item> */}
        <List.Item>
        <Link style={listStyle} to="/superadmin/paymentgateways" onClick={onClose}>
        <LoginOutlined /> &nbsp; Payment Gateways
        </Link>
        </List.Item>
						<List.Item>
							<Link style={listStyle} to="/superadmin/kulCharges" onClick={onClose}>
								<LoginOutlined /> &nbsp; KulCharges
							</Link>
						</List.Item>
						<List.Item>
							<Link style={listStyle} to="/superadmin/kulaccounts" onClick={onClose}>
								<LoginOutlined /> &nbsp; Kul Bank Accounts
							</Link>
						</List.Item>
						
        </List>
        
              </div>
       
      </Drawer>
			<Navbar className="navbar-vertical fixed-left navbar-dark" style={{backgroundColor: "#1c2d8d"}} expand="md" id="sidenav-main" >
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
							<NavItem className="super-teller-side super-teller-side-active"  to="/superadmin/index" tag={Link} id="superadminindex" onClick={() => MenuToggle("superadminindex")}>
								<NavLink>
									{/* <Unicons.UilApps size="20"/> &nbsp; */}
                                    {/* <img src={dashSvg} style={{width:'18px'}}/> &nbsp; &nbsp; */}
                                    {navValues.isIcon === "superadminindex" ? <img src={dashSvg} style={{width:'18px'}}/> : <img src={superTellerDashboardWhite} style={{width:'18px'}}/>}
                                     &nbsp; &nbsp;
									Dashboard
								</NavLink>
							</NavItem>
							<NavItem className="super-teller-side" to="/superadmin/systemusers" tag={Link} id="superadminsystemusers" onClick={() => MenuToggle("superadminsystemusers")}>
								<NavLink >
                                {navValues.isIcon === "superadminsystemusers" ? <img src={superTellersBlue} style={{width:'18px'}}/> : <img src={TellersSide} style={{width:'18px'}}/>} &nbsp; &nbsp;
									Manage users
								</NavLink>
							</NavItem>
							<NavItem className="super-teller-side" to="/superadmin/verificationRequests" tag={Link} id="superadminverificationRequests" onClick={() => MenuToggle("superadminverificationRequests")}>
								
								<NavLink>
									
									{navValues.isIcon === "superadminverificationRequests" ? 
										<UsergroupAddOutlined style={{ fontSize: '18px', color:'#1c2d8d'}}/>

									: 
										<UsergroupAddOutlined style={{ fontSize: '18px'}}/>
									} &nbsp; &nbsp;
									
									<span style={{fontSize:'12px'}}>Verification Requests</span>
									<div style={{width: '9px', height: "9px", backgroundColor: "red", borderRadius: '100%', marginTop: '-11px', marginLeft: '4px' }}>

									</div>
								</NavLink>
							
							</NavItem>

							{/* <NavItem className="super-teller-side" to="/superadmin/kulCharges" tag={Link} id="superadminkulCharges" onClick={() => MenuToggle("superadminkulCharges")}>
								<NavLink >
									{navValues.isIcon === "superadminkulCharges" ? <Unicons.UilMoneyWithdrawal style={{ color:"#1c2d8d"}}/> : <Unicons.UilMoneyWithdrawal />} &nbsp; &nbsp;
									Kul Charges
								</NavLink>
							</NavItem> */}
							{/* <NavItem className="super-teller-side" to="/superadmin/supertellers" tag={Link} id="superadminsupertellers" onClick={() => MenuToggle("superadminsupertellers")}>
								<NavLink >
                                {navValues.isIcon === "superadminsupertellers" ? <img src={superTellersBlue} style={{width:'18px'}}/> : <img src={TellersSide} style={{width:'18px'}}/>} &nbsp; &nbsp;
									Super Tellers
								</NavLink>
							</NavItem> */}
								
							{/* <NavItem className="super-teller-side" to="/superteller/collections" tag={Link} id="supertellercollections" onClick={() => MenuToggle("supertellercollections")}>
								<NavLink>
                                {navValues.isIcon === "supertellercollections" ? <img src={superTellerCollectionsBlue} style={{width:'18px'}}/> : <img src={DocMoney} style={{width:'18px'}}/>} &nbsp; &nbsp;
									Collections
								</NavLink>
							</NavItem> */}
                           
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
                                <p><a className="manrope-text" onClick={showDrawer}>System settings</a></p>
                                <p><a className="manrope-text">Message center</a></p>
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
                                       <p className="manrope drk-text" style={{fontSize:'9px', lineHeight:'4px'}}>
                                       {/* {navValues.payLoad?.fullName?.length > 17 ? navValues.payLoad?.fullName.substring(0,17) + ".." : navValues.payLoad?.fullName } */}
                                       {/* {__store.username} */}
													{navValues.payLoad?.fullName?.length > 17 ? navValues.payLoad?.fullName.substring(0, 17) + ".." : navValues.payLoad?.fullName}
                                       {/* {getRedux?.fullName} */}
                                           </p>
                                       <p className="manrope-text" style={{fontSize:'10px', lineHeight:'4px'}}>Kul Admin</p>
                                    </div>

                                    <div className="col-sm-1" style={{marginTop:'5px',marginLeft:'10px'}}>
                                       <i className="fa fa-caret-down"/>
                                    </div>
                                    </div>
									
									</Media>
								</DropdownToggle>
								<DropdownMenu className="dropdown-menu-arrow" right>
									
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