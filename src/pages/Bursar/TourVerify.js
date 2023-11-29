import React, {useEffect, useState, useContext,  useRef } from 'react'
import { EllipsisOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
// import Logo from "../assets/images/home/logo.png";
import {getUser, logOutUser} from "../../utils/auth";
// import Avatar from "../assets/images/avatar.png";
import { Drawer, Button, Space, Radio, List, Typography, Divider, Tour, Timeline } from 'antd';
import { enquireScreen } from "enquire-js";
import super_sky from "../../assets/images/super_sky.png";
import doneOval from "../../assets/images/doneOval.png";
import done_all from "../../assets/images/done_all.png";
import kelly from "../../assets/images/82002-support.gif";





let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
const TourVerify = (props) => {
	//const context = useContext(UserContext)


	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const [open, setOpen] = useState(false);
	const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem('_IDENTITY_')));
	const [phaseTwoOpen, setPhaseTwo] = useState(false);


  const steps = [
    {
      title: (<h2>Hello {userDetails?.fullName}!</h2>),
      description: (<><p className=''>To enjoy the exciting feature of KulPay, you are to go through three stages for personal and institution profile completion. Click next to proceed</p></>),
      cover: (
		<>
		<h2 style={{fontSize:"30px", fontWeight:"400"}} className="">Welcome to KulPay</h2>
        <img
          alt="tour.png"
          style={{width:"25em"}}
          src={kelly}
        />
		</>
      ),
	  placement:"top",
		onClose:false,

    //   target: () => ref1.current,
		// nextButtonProps:({
		// 	children:(
		// 		<span className=''>Next</span>
		// 	) 
		// })
    },
    {
      title: (<h3>Click Next to continue</h3>),
      //description: <p className='manrope-text'> Click Next to continue</p>,
        placement: isMobile ? "top" : "right",
      target: () => ref1.current,
		// nextButtonProps:({
		// 	children:(
		// 		<span className=''>Setup Department</span>
		// 	),

		// }),
		onClose:false,

    },
    {
        // title: (<h2>Personal Verification</h2>),
        description: (<><p className='manrope-text'> Click Next to continue</p></>),
        // placement:"right",
        placement: isMobile ? "top" : "right",

        target: () => ref2.current,
          // nextButtonProps:({
          // 	children:(
          // 		<span className=''>Setup Department</span>
          // 	),
  
          // }),
          onClose:false,
  
      },
      {
        // title: (<h3>Click Finish</h3>),
        // description: (<><p className='manrope-text'>Click Next to continue</p></>),
        // placement:"right",
          placement: isMobile ? "top" : "right",

        target: () => ref3.current,
          // nextButtonProps:({
          // 	children:(
          // 		<span className=''>Setup Department</span>
          // 	),
  
          // }),
          onClose:false,
  
      },
   
     
  ];
  const stepsTwo = [
	{
		title: 'Save',
		description: 'Save your changes.',
		placement:"right",
		target: () => ref2.current,
		  nextButtonProps:({
			  children:(
				  <span className=''>Setup Department</span>
			  ),
			//   onClick:() => showDrawerAlt()
  
		  }),
		  onClose:false,
  
	  }
    
  ];


	useEffect(() => {
        require("antd/dist/reset.css");



		setTimeout(() => {
			setOpen(true)
		}, 3000);
	}, []);
	
	return (
	<>
            <Tour style={isMobile ? { background: '#2f2fab', width:'85vw' } : { background:'#2f2fab'}} open={open} onClose={() => setOpen(false)} steps={steps} />

     <div className="row" style={!isMobile ? { marginTop: "3vh" } : null}>
                        <div className="col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <Timeline>
                                <Link to="/admin/account_verification">
                                <Timeline.Item dot={<img src={doneOval}/>} style={{cursor:'pointer'}} tag={Link} >
                                <div ref={ref1} className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={{ background: "#1B52C4", color: "#FFF", height: "102px" }}>

                                            <div className="card-body p-3" style={{borderLeft:'3px solid #05EEC0'}}>
                                        {/* <img src={leftActive} style={{width:'3px', height:'94px'}}/> */}
 
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Personal Information
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", color: "#F1F4FB", fontWeight: "0", marginTop: "-13px" }}>
                                                           The personal information phase requires completion of your already existing profile
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px', marginTop:'30px'}}/>
                                    </div> */}
                                </div>
                            </div>
                                    </Timeline.Item>
                                    </Link>
                                    <Link to="/admin/account_verification">
                                <Timeline.Item 
                                // dot={this.state.payLoad?.hasDonePersonalVerification ? <img src={doneOval}/> : null}
                                >
                                <div ref={ref2} className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={{ color: "black", height: "102px" }}>
                                            <div className="card-body p-3">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Personal Verification
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", fontWeight: "0", marginTop: "-13px" }}>
                                                           The personal verification phase/KYC requires you to upload valid means of identification for verification
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {this.state.payLoad?.hasDonePersonalVerification ? <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px'}}/>
                                    </div> : null} */}
                                </div>
                            </div>
                                </Timeline.Item>
                                </Link>
                                <Link to="/admin/account_verification" >
                                <Timeline.Item 
                                // dot={this.state.payLoad?.hasDoneInstitutionVerification ? <img src={doneOval}/> : null}
                                >
                                <div ref={ref3} className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={{ color: "black", height: "102px" }}>
                                            <div className="card-body p-3">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Institution Verification
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", fontWeight: "0", marginTop: "-13px" }}>
                                                            This section requires you to provide some key details about your institution to validate authenticity by KulPay
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* {this.state.payLoad?.hasDoneInstitutionVerification ? <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px'}}/>
                                    </div> : null} */}
                                </div>
                            </div>
                                </Timeline.Item>
                                </Link>
                               
                            </Timeline>
                            

                           

                            
                        </div>
                    
                    <div className="col-sm-12 col-xl-6 mt-2 mt-xl-0">
                    <img src={super_sky} style={isMobile ? { maxWidth: '50vw' } : {maxWidth:'50vh'}}/>
                    </div>
                    </div>
    </>
	);
};
// BursarHeader.contextType = UserContext;
export default TourVerify;