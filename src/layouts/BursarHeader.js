import React, {useEffect, useState, useContext,  useRef } from 'react'
import { EllipsisOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import Logo from "../assets/images/home/logo.png";
import {getUser, logOutUser} from "../utils/auth";
import {boardingStatus} from "../utils/Identifiers";
import Avatar from "../assets/images/avatar.png";
import { Drawer, Button, Space, Radio, List, Typography, Divider, Tour } from 'antd';
import logo from "../assets/images/alldarkLogo.png"
import dashSvg from "../assets/images/dashboardSuper.svg"
import notificatiionSvg from "../assets/images/Notification.svg"
import searchSvg from "../assets/images/search.svg"
import collectionsSvg from "../assets/images/AdminColl.svg"
import SchoolDept from "../assets/images/SchoolDept.svg"
import AdminVendors from "../assets/images/AdminVendors.svg"
import AdminSuperTel from "../assets/images/AdminSuperTel.svg"
import AdminReports from "../assets/images/AdminReports.svg"
import sch_dept_active from "../assets/images/sch_dept_active.png"
import dash_inactive from "../assets/images/dash_inactive.png"
import bursarActiveCol from "../assets/images/bursarActiveCol.png"
import vendorActive from "../assets/images/vendorActive.png"
import {LoginOutlined} from '@ant-design/icons';
import trans_white from "../assets/images/transac_white.svg"
import logOutSvg from "../assets/images/dashprofile-icon.svg"
import settingsTop from "../assets/images/settings_applications.svg"
import dashTopSvg from "../assets/images/dash-svg.svg"
import TellersSide from "../assets/images/TellersSide.svg"
import sett from "../assets/images/settings_applications_acc.svg";
import DocMoney from "../assets/images/Doc_Money.svg"
import {UserContext} from "../Context/UserContext"
import * as Unicons from '@iconscout/react-unicons';
import kelly from "../assets/images/82002-support.gif";
import hamb from "../assets/images/hamb.png";

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
import { enquireScreen } from "enquire-js";
import {useMergeState} from "../utils/helpers";






const listStyle = {
	color: '#ffffffcf',
	cursor:'pointer',
	fontWeight:'700'
}
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const BursarHeader = (props) => {
	//const context = useContext(UserContext)

	const [navValues, setNavValues] = useMergeState({
		collapseOpen: false,
		redirect: false,
		payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')),
		drop1: false,
		activeClasses: [false, false, false, false],
		user: getUser(),
	});
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	const [open, setOpen] = useState(false);
	const [departmentBoard, setDepartmentBoard] = useState(false);
	const [phaseTwoOpen, setPhaseTwo] = useState(false);
	const [deptFocus, setDeptFocus] = useState(false);

	const showDrawer = () => {
		// e.preventDefault();
		setNavValues({visible:true});
			
	  };
	  const showDrawerAlt = () => {
		// e.preventDefault();
		setNavValues({visible:true});
		setTimeout(() => {
			setPhaseTwo(true)
		}, 1000);
			
	  };
	  const showDrawerAlt2 = () => {
		// e.preventDefault();
		setNavValues({visible:true});
		setTimeout(() => {
			setDeptFocus(true)
		}, 1000);
			
	  };
  const steps = [
	{
		title: (<h2>You're doing great! <i style={{fontSize:"30px", color:""}} className='fa fa-thumbs-up'/></h2>),
		description: (<><p className='manrope-text'>The next steps would now be seting up your Instistution Faculties, Departments and Programmes... Click Next to continue</p></>),
		cover: (
		  <>
		  <h2 style={{fontSize:"22px", fontWeight:"700"}} className="manrope">Well done!</h2>
		  <img
			alt="tour.png"
			style={{width:"25em"}}
			src={kelly}
		  />
		  </>
		),
		placement:"top",
		  onClose:false,
  
	  },
	 

    
    {
      title: (<><h2>Explore Instistution Settings</h2></>),
      description: (<><p>Click Next to continue to Programme Setup...</p></>),
	  placement:"right",
      target: () => ref1.current,
		nextButtonProps:({
			children:(
				<span className=''>Next</span>
			),
			onClick:() => showDrawerAlt()

		}),
		onClose:false,

    }
  ];
  
 
 
  const stepsTwo = [
	{
		title: (<h2>Programme Setup</h2>),
		description: (<p>Click on Programmes Settings to proceed</p>),
		placement:"right",
		target: () => ref2.current,
		  onClose:false,
  
	  }
    
  ];


  const stepsDepartment = [
	{
		title: (<h2>Instistution Setup</h2>),
		description: (<><p className='manrope-text'>Click on next to continue to Instistution setup</p></>),
		cover: (
		  <>
		  <h2 style={{fontSize:"22px", fontWeight:"700"}} className="manrope">Almost done!</h2>
		  <img
			alt="tour.png"
			style={{width:"25em"}}
			src={kelly}
		  />
		  </>
		),
		placement:"right",
		target: () => ref1.current,
		  onClose:false,
		  nextButtonProps:({
			children:(
				<span className=''>Next</span>
			),
			onClick:() => showDrawerAlt2()

		}),

  
	  }
  ]

  const deptPointer = [
	{
		title: (<h2>Department Setup</h2>),
		description: (<p>Click on Department Settings to proceed</p>),
		placement:"right",
		target: () => ref3.current,
		  onClose:false,
  
	  }
    
  ];

	// toggles collapse between opened and closed (true/false)
	const toggleCollapse = () => {
		setNavValues({
			collapseOpen: !navValues.collapseOpen
		});
	};
	const onClose = () => {
		setNavValues({visible:false});
	  };
	const toggleDrop1 = () => {
		setNavValues({
			drop1: !navValues.drop1
		})
	};
	
	  const showDrawerPhaseOne = (e) => {
		e.preventDefault();
		setNavValues({visible:true});
			
	  };
	const logout = () => {
		localStorage.clear();
		setNavValues({
			redirect:true
		})
	};
    const MenuToggle = (id) => {
		if (navValues.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval) {
			return
		}
        var element = document.getElementsByClassName("admin-side-active");
        if(element.length > 0){
            for(var i = 0; i < element.length; i++){
                    element[i].className = 'admin-side';
                }

                var currentNode = document.getElementById(`${id}`);
                currentNode.className = "admin-side-active"
                setNavValues({
                    isIcon:id
                })
        }
   
    }
	const toggleDrop2 = () => {
		setNavValues({
		  drop2: !navValues.drop2,
		});
	  };

	const initOnboarding = () => {
		if(navValues.payLoad?.onboardingStatus == boardingStatus.Programme){
			setOpen(true)
		}
		else if(navValues.payLoad?.onboardingStatus == boardingStatus.Department){
			setDepartmentBoard(true)
		}
	}

	useEffect(() => {
		require("../assets/css/antDrawerSA.css")

		const user = JSON.parse(localStorage.getItem('_IDENTITY_'));
        //context.loadDataFromServer()
        setNavValues({payLoad: user});
		let extURL = document.URL;
        var url = new URL(extURL); 
        var arraySplit = extURL.split("/");
        var fuseIndex = arraySplit[arraySplit.length - 2] + arraySplit[arraySplit.length - 1]
        console.log(fuseIndex, "fused")
        var element = document.getElementsByClassName("admin-side-active");
        if(element.length > 0){
            for(var i = 0; i < element.length; i++){
                    element[i].className = 'admin-side';
                }

                var currentNode = document.getElementById(`${fuseIndex}`);
                if(currentNode == null || currentNode == undefined){
                    for(var i = 0; i < element.length; i++){
                        element[i].className = 'admin-side';
                    }
                    setNavValues({
                        isIcon:"null"
                    })
                }
                else{
                    currentNode.className = "admin-side-active"
                        setNavValues({
                            isIcon:fuseIndex
                        })
                }
                
        }

		setTimeout(() => {
			initOnboarding()
		}, 3000);
	}, []);
	
	return (
		<>
		<Tour open={open} onClose={() => setOpen(false)} steps={steps} />
		<Tour open={phaseTwoOpen} onClose={() => setPhaseTwo(false)} steps={stepsTwo} />
		<Tour open={departmentBoard} onClose={() => setDepartmentBoard(false)} steps={stepsDepartment} />
		<Tour open={deptFocus} onClose={() => setDeptFocus(false)} steps={deptPointer} />
		 
		 
		 
		  <Drawer
        title={<img alt={'logo'} style={{width:'95px', height:'34px'}} className="navbar-brand-img mr-2" src={logo} />}
        placement={'left'}
        width={630}
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
			<div ref={ref3}>
            <Link  style={listStyle} to="/admin/schooldepartments" onClick={onClose}>
        <LoginOutlined /> &nbsp; Department & Faculty/School Settngs
        </Link>
		</div>
        </List.Item>
        <List.Item>
			<div ref={ref2}>
        <Link style={listStyle} to="/admin/institutionprogramme" onClick={onClose}>
        <LoginOutlined /> &nbsp; Programmes
        </Link>
		</div>
        </List.Item>
       
        </List>
        
              </div>
       
      </Drawer>
			<Navbar className="navbar-vertical fixed-left navbar-dark" style={{backgroundColor: "#FFF"}} expand="md" id="sidenav-main" >
				<Container fluid>
					{/* Toggler */}
					<button className="navbar-toggler" type="button" onClick={toggleCollapse} >
						{/* <i className="fa fa-bars" /> */}
						<img src={hamb} style={{width:'35px'}}/>
					</button>
					
					{/* Brand */}
					{/* {logo ? ( */}
					<NavbarBrand className="py-0" style={{textAlign:'left'}}>
						<img alt={'logo'} style={{width:'95px', height:'28px'}} className="navbar-brand-img mr-2" src={logo} />
						
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
							<NavItem className="admin-side-active admin-side" to="/admin/index" tag={Link} id="adminindex" onClick={() => MenuToggle("adminindex")}>
								<NavLink >
									{/* <Unicons.UilApps size="20"/> &nbsp; */}
                                    {navValues.isIcon === "adminindex" ? <img src={dashSvg} style={{width:'18px'}}/> : <img src={dash_inactive} style={{width:'18px'}}/>}
                                     &nbsp; &nbsp;
                                    {/* <img src={dashSvg} style={{width:'18px'}}/> &nbsp; &nbsp; */}
									Dashboard
								</NavLink>
							</NavItem>
							
							{/* <NavItem className="admin-side" to="/admin/schooldepartments" tag={Link} id="adminschooldepartments" onClick={() => MenuToggle("adminschooldepartments")}>
								<NavLink>
                                {navValues.isIcon === "adminschooldepartments" ? <img src={sch_dept_active} style={{width:'18px'}}/> : <img src={SchoolDept} style={{width:'18px'}}/>}
                                     &nbsp; &nbsp;

									Programmes
								</NavLink>
							</NavItem> */}
							{/* <NavItem className="admin-side" to="/admin/schooldepartments" tag={Link} id="adminschooldepartments" onClick={() => MenuToggle("adminschooldepartments")}>
								<NavLink>
                                {navValues.isIcon === "adminschooldepartments" ? <img src={sch_dept_active} style={{width:'18px'}}/> : <img src={SchoolDept} style={{width:'18px'}}/>}
                                     &nbsp; &nbsp;

									School/Departments
								</NavLink>
							</NavItem> */}
							<NavItem className="admin-side" tag={Link} to="/admin/collections"  id="admincollections" onClick={() => MenuToggle("admincollections")}>
								<NavLink disabled={navValues.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval ? true : false}>
                                {navValues.isIcon === "admincollections" ? <img src={bursarActiveCol} style={{width:'18px'}}/> : <img src={collectionsSvg} style={{width:'18px'}}/>}
                                {/* <img src={collectionsSvg} style={{width:'18px'}}/> &nbsp; &nbsp; */}
                                &nbsp; &nbsp;
									Collections
								</NavLink>
							</NavItem>
							<NavItem  className="admin-side" to="/admin/vendors" tag={Link} id="adminvendors" onClick={() => MenuToggle("adminvendors")}>
								<NavLink disabled={navValues.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval ? true : false}>
                                {navValues.isIcon === "adminvendors" ? <img src={vendorActive} style={{width:'18px'}}/> : <img src={AdminVendors} style={{width:'18px'}}/>}
                                &nbsp; &nbsp;

									Beneficiaries
								</NavLink>
							</NavItem>
                            {/* <NavItem className="admin-side">
								<NavLink to="/teller/instructors">
                                <img src={AdminSuperTel} style={{width:'18px'}}/> &nbsp; &nbsp;

									Super tellers
								</NavLink>
							</NavItem> */}
                            <NavItem className="admin-side" style={{cursor:"pointer"}}>
								<NavLink disabled={navValues.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval ? true : false} to="#" onClick={() => toggleDrop2()}>
                                <img src={AdminReports} style={{width:'18px'}}/> &nbsp; &nbsp;

									Report
								</NavLink>
							</NavItem>

							<li className="nav-item">
                {/* <a
                  href="#"
                  data-toggle="collapse"
                  aria-expanded="false"
                  className="nav-link"
                  onClick={() => toggleDrop2()}
                >
                  <Unicons.UilFileAlt size="20" /> &nbsp;
                  <span className="nav-link-text">Reports</span>
                </a> */}

                <div
                  className={navValues.drop2 ? "show" : "collapse"}
                  style={{}}
                >
                  <ul className="nav-sm flex-column nav rep_nav">
				  
				  <NavLink className='nav-link' to="/admin/inflowreport" tag={Link}>
                       Inflows
                    </NavLink>
					<NavLink className='nav-link' to="/admin/outflowreport" tag={Link}>
                       Outflows
                    </NavLink>
					<NavLink className='nav-link' to="/admin/analytics" tag={Link}>
                       Analytics
                    </NavLink>
					<NavLink className='nav-link' to="/admin/invoicereport" tag={Link}>
                       Invoice
                    </NavLink>
				  {/* <NavLink className='nav-link' to="/admin/dailycollectionreport" tag={Link}>
                      Collection Report (Daily)
                    </NavLink> */}
					{/* <NavLink className='nav-link' to="/admin/monthlycollectionreport" tag={Link}>
                      Collection Report (Monthly)
                    </NavLink>
					
					<NavLink className='nav-link' to="/admin/comparisonreport" tag={Link}>
                      Comparison Report (Collections)
                    </NavLink>
					
					
                    <NavLink className='nav-link' to="/admin/collectionreport" tag={Link}>
                      Collection Report (Bulk)
                    </NavLink>
					 */}
					{/* <NavLink to="/admin/settlementreport" tag={Link}>
                      Settlement Report
                    </NavLink> */}
                  

					
                  </ul>
                </div>
              </li>
			  {/* <button ref={ref1}>dddd</button> */}
							{navValues.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval 
							
							? null 
							
							: 
								<NavItem className="admin-side" onClick={showDrawer}>
									<div ref={ref1}>
										<NavLink style={{ marginLeft: "-4px" }}>
											{navValues.isIcon === "adminvencdors" ? <img src={sett} style={{ width: '27px' }} /> : <img src={sett} style={{ width: '27px' }} />}
											&nbsp; &nbsp;

											Institution Settings
										</NavLink>
									</div>
								</NavItem>
							
							}
							
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
                            {!isMobile ? <div className="sub_div2 container">
                            <hr/>
                                <p onClick={showDrawer}><a className="manrope-text" >Settings</a></p>
                                <p><a className="manrope-text">Contact us</a></p>
                            </div> : null}
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
													{navValues.payLoad?.fullName?.length > 12 ? navValues.payLoad?.fullName.substring(0, 12) + ".." : navValues.payLoad?.fullName}
                                           {/* {context?.testName} */}
                                       </p>
                                       <p className="manrope-text" style={{fontSize:'10px', lineHeight:'4px'}}>School Admin</p>
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
										<span className="manrope-text" style={{fontSize:'12px'}}>Dashboard</span>
									</DropdownItem>

                                    <DropdownItem to="/accountsettings" tag={Link}>
                                    <img src={settingsTop} style={{width:'24px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text" style={{fontSize:'12px'}}>Account Settings</span>
									</DropdownItem>
									
                                    <DropdownItem onClick={() => logOutUser(false)}>
                                    <img src={logOutSvg} style={{width:'24px', height:'24px', marginRight:'20px'}}/>
										<span className="manrope-text" style={{fontSize:'12px'}}>Logout</span>
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
// BursarHeader.contextType = UserContext;
export default BursarHeader;