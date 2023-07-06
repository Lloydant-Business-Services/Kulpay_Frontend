import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../../assets/images/NewTeller1.jpg";
import BitmapSuperTeller from "../../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../../assets/images/NewSuperAdmin.jpg";
import logo from "../../../assets/images/17.png";
import mail_icon from "../../../assets/images/mail.png";
import forum_icon from "../../../assets/images/forum.png";
import roundIcon from "../../../assets/images/Round-icon.png";

import KulLoader from "../../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { loginUser } from "../../../utils/auth";
import { Modal, Button, Space, Alert } from "antd";
import { Link } from "react-router-dom";
import { AttentionSeeker, Fade as AttFade } from "react-awesome-reveal";
import VerifyAccount from "./VerifyAccount";
import Endpoint from "../../../utils/endpoint";
import {handleFormSubmissionError} from "../../../utils/helpers";


var Teller = {
    height: "100vh",
    backgroundImage: `url(${Bitmap})`,
    backgroundSize: "cover",
};
var SuperTeller = {
    height: "100vh",
    backgroundImage: `url(${BitmapSuperTeller})`,
    backgroundSize: "cover",
};
var SuperAdmin = {
    height: "100vh",
    backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
};

var SuperAdminMobile = {
    height: "38vh",
    backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
    marginTop: "0px",
};
function error() {
    Modal.error({
        title: "This is an error message",
        content: "some messages...some messages...",
    });
}
class VerifyIdentity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resolveRole: this.props.location?.state?.identifier,
            verify_identity:true,
            verify_account:false,
            propData: props?.propData,
            phoneVerification:false,
            emailVerification:false,
            valType: false
    
        };
      }
    
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    onChangeEmail = (e) => {
        if(!e.target.value.includes("@")){
            this.setState({isEmailInvalid:true, isEmailValid:false})
        }
        if(e.target.value.includes("@")){
            this.setState({isEmailInvalid:false, isEmailValid:true, email: e.target.value})
        }
    }

    passwordCompare = (e) => {
        if(e.target.value != this.state.password){
            this.setState({passwordMismatch:true})
        }
        if(e.target.value === this.state.password){
            this.setState({passwordMismatch:false, passwordMatch: true, confirm_password:e.target.value})
        }        
    }
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
            }, 1000);
        }
    };
   
    textValidation = () => {
        $("#preloader").fadeIn("slow");
        setTimeout(() => {
        this.setState({verify_identity:false, verify_account:true})
        $("#preloader").fadeOut("slow");
        }, 1000);
    }
    handleVerifyAccountText = () => {
       
            $("#preloader").fadeIn("slow");
            const payload = {
                "id": this.props.propData?.id,
                "emailAddress": this.props.propData?.emailAddress,
                "phoneNo": this.props.propData?.phoneNo,
                "isPhoneNo": true,
                "isEmail": false
            }

            Endpoint.verifyAccount(payload)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setTimeout(() => {
                    this.setState({                       
                        responseData:res.data,
                        //create_account:false,
                        verify_identity:false,
                        verify_account:true
                    })
                        $("#preloader").fadeOut("slow");
                    
                }, 1000);
            })
            .catch((error) => {
                console.log(error, "Error")
                handleFormSubmissionError(error, this);
            })
            
        
      
    };
    handleVerifyAccountEmail = () => {

        $("#preloader").fadeIn("slow");
        const payload = {
            "id": this.props.propData?.id,
            "emailAddress": this.props.propData?.emailAddress,
            "phoneNo": this.props.propData?.phoneNo,
            "isPhoneNo": false,
            "isEmail": true
        }
        console.log(payload)
        // return;
this.setState({
    valType: payload
})
        Endpoint.verifyAccount(payload)
            .then((res) => {
                console.log(res)
                console.log(res.data)
                setTimeout(() => {
                    this.setState({
                        responseData: res.data,
                        //create_account:false,
                        // validationType: payload,
                        verify_identity: false,
                        verify_account: true
                    })

                }, 1000);
                setTimeout(() => {
                    $("#preloader").fadeOut("slow");
                }, 2000);
            })
            .catch((error) => {
                console.log(error, "Error")
                handleFormSubmissionError(error, this);
            })



    };
    // handleVerifyAccountEmail = () => {
    //     const isValidated = this.handleValidation();
    //     if(isValidated){
    //         $("#preloader").fadeIn("slow");
    //         const payload = {
    //             "id": this.props.propData?.id,
    //             "emailAddress": this.props.propData?.emailAddress,
    //             "phoneNo": this.props.propData?.phoneNo,
    //             "isPhoneNo": false,
    //             "isEmail": true
    //         }

    //         Endpoint.schoolSignUp(payload)
    //         .then((res) => {
    //             console.log(res)
    //             console.log(res.data)
    //             setTimeout(() => {
    //                 this.setState({                       
    //                     responseData:res.data,
    //                     create_account:false,
    //                     verify_identity:true,
    //                 })
    //                     $("#preloader").fadeOut("slow");
                    
    //             }, 1000);
    //         })
    //         .catch((error) => {
    //             handleFormSubmissionError(error, this);
    //         })
            
    //     }
      
    // };
    componentDidMount() {
        window.scrollTo(0,0)
        console.log(this.state.propData, "Props Data")
        setTimeout(() => {
            this.isLoadedFunc();
        }, 1500);

        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/reset.css");
        // window.addEventListener("load", (event) => {
        //     var image = document.querySelector("img");
        //     var isLoaded = image.complete && image.naturalHeight !== 0;
        //     if (isLoaded) {
        //         setTimeout(() => {
        //             $("#preloader").delay(450).fadeOut("slow");
        //         }, 2000);
        //     }
        // });
        let screen_height = $(window).height();
        const { isMobile } = this.state;

        return (
            <div style={{background:"#FFF"}}>
                <div id="preloader" style={{display:'none'}}>
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

            
                {!this.state.verify_account ? <div className={isMobile ? "mobile-container-fluid" : "cust-container4"}>
                            <div className={!isMobile ? "custom-form col-sm-10" : "custom-form col-sm-10 mt-4"}>
                        <div className="col-sm-12" style={{ marginTop: "10px" }}>
                            <img src={roundIcon} style={{ width: '67px' }} />
                        </div>
                                <h2 style={!isMobile ? { fontSize: "36px" } : { fontSize: "31px" }} className="manrope-text mt-3">
                                    Verify your identity
                                </h2>
                                <p className="manrope-text" style={{ fontSize: "14px", marginTop: "-10px" }}>
                                Select a way to receive the verification code
                                   
                                </p>
                                <br />
                                {/* {this.state.invalidLogin ? (
                                    <Alert closable={true} onClose={() => this.setState({invalidLogin:false})} message="Invalid login credentials!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>Your email and password could not be validated. Kindly double check and try again</p>} type="error" showIcon className="manrope" />
                                ) : null} */}
                                {this.state.validationError ? (
                                    <Alert closable={true} onClose={() => this.setState({validationError:false})} message="Validation error!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>One or more validation error occured! Kindly double check details provided and try again.</p>} type="error" showIcon className="manrope" />
                                ) : null}
                                <br />

                        <div class="row" style={{ cursor: 'pointer' }} onClick={this.handleVerifyAccountEmail}>
                                    <div class="col-xl-2 col-sm-2">
                                        <img src={mail_icon} style={{width:'32px'}}/>
                                    </div>
                                    <br />
                                    <div className={!isMobile ? "col-xl-8 col-sm-8" : "col-xl-6 col-sm-8 mt-3"}>
                                       <p >
                                       <span style={!isMobile ? {fontSize:'16px'} : {fontSize:'14px'}} className="manrope-text-light">Email code to</span> <br/>
                                       <span style={!isMobile ? {fontSize:'16px'} : {fontSize:'14px'}} className="manrope-text">
                                           {/* maxbert22@email.com */}
                                           {this.props.propData?.emailAddress}
                                           </span><br/>
                                       <span style={!isMobile ? {fontSize:'12px'} : {fontSize:'10px'}} className="manrope-text">
                                        a confirmation link and an OTP would be send to your email address provided.
                                      
                                       </span>
                                       
                                      
                                       </p>
                                    </div>
                                    <div class="col-xl-2 col-sm-2">
                                        <i className="fa fa-angle-right"/>
                                    </div>
                                </div>
                                <hr/>
                                <div class="row" style={{cursor:'pointer'}} onClick={this.handleVerifyAccountText}>
                                    <div class="col-xl-2 col-sm-2">
                                        <img src={forum_icon} style={{width:'32px'}}/>
                                    </div>
                                    <br />
                                    <div className={!isMobile ? "col-xl-8 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                       <p >
                                       <span style={!isMobile ? {fontSize:'16px'} : {fontSize:'14px'}} className="manrope-text-light">Text code to number 
                                        {/* 0703***3456 */}
                                        <b>&nbsp; {this.props.propData?.phoneNo}</b>
                                       </span> <br/>
                                       <span style={!isMobile ? {fontSize:'12px'} : {fontSize:'10px'}} className="manrope-text">
                                       Our text are free, but some service providers may apply usage charges in certain cases.
                                           </span><br/>
                                       
                                      
                                       </p>
                                    </div>
                                    <div class="col-xl-2 col-sm-2">
                                        <i className="fa fa-angle-right"/>
                                    </div>
                                </div>

                                <div className="row mt-6">
                                    <div className="col-sm-12">
                                    <hr/>

                                        <div className="form-inline">
                                           
                                                <p className="manrope-text" style={{ color: "#84818A", fontSize: "14px" }}>
                                                   <span style={{ color: "#1B52C4" }}>Sign in to a different account</span>
                                                </p>
                                           
                                        </div>
                                    </div>
                                </div>

                               
                            </div>
                        </div> : null}
                {this.state.verify_account ? <VerifyAccount propData={this.props.propData} validationType={this.state.valType}/> : null}
            
            </div>
        );
    }
}

export default VerifyIdentity;
