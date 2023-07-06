import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../../assets/images/NewTeller1.jpg";
import BitmapSuperTeller from "../../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../../assets/images/NewSuperAdmin.jpg";
import logo from "../../../assets/images/17.png";
import mail_icon from "../../../assets/images/mail.png";
import forum_icon from "../../../assets/images/forum.png";
import verify_top_img from "../../../assets/images/Round-icon.png";

import remove_red_eye from "../../../assets/images/remove_red_eye.svg";
import roundIcon from "../../../assets/images/Round-icon.png";

import KulLoader from "../../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { loginUser } from "../../../utils/auth";
import { Modal, Button, Space, Alert } from "antd";
import { Link } from "react-router-dom";
import { AttentionSeeker, Fade as AttFade } from "react-awesome-reveal";
import PinInput from "react-pin-input";
import { Redirect } from "react-router-dom";
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
class VerifyAccount extends Component {
    constructor(props) {
        super(props);
    this.state = {
        resolveRole: this.props.location?.state?.identifier,
        valDateType: this.props?.validationType
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
    onChangePin = (value) => {
        this.setState({ value });
        console.log(value)
        if(value.length == 4){
            $("#preloader").fadeIn();
            const payload = {
                "phoneNumber": this.props.propData?.phoneNo,
                "otp": value,
                "id": this.props.propData?.id
              }
              Endpoint.accountActivationByPhone(payload)
              .then((res) => {
                  console.log(res)
                  console.log(res.data)
                  if(res.data != null && res.data.authToken != null){
                    setTimeout(() => {
                        this.setState({isRedirect:true})
                            $("#preloader").fadeOut("slow");
                        
                    }, 1000);
                  }
                 
              })
              .catch((error) => {
                  handleFormSubmissionError(error, this);
                  this.setState({validationError:true})
                  $("#preloader").fadeOut("slow");
              })
            // setTimeout(() => {
            //     this.setState({isRedirect:true})
            // }, 1000);
        }
    };

    onChangePinEmail = (value) => {
        this.setState({ value });
        console.log(value)
        if (value.length == 4) {
            $("#preloader").fadeIn();
            const payload = {
                "email": this.props.propData?.emailAddress,
                "otp": value,
                "id": this.props.propData?.id
            }
            Endpoint.accountActivationByEmail(payload)
                .then((res) => {
                    console.log(res)
                    console.log(res.data)
                    if (res.data != null && res.data.authToken != null) {
                        setTimeout(() => {
                            this.setState({ isRedirect: true })
                            $("#preloader").fadeOut("slow");

                        }, 1000);
                    }

                })
                .catch((error) => {
                    handleFormSubmissionError(error, this);
                    this.setState({ validationError: true })
                    $("#preloader").fadeOut("slow");
                })
            // setTimeout(() => {
            //     this.setState({isRedirect:true})
            // }, 1000);
        }
    };
    onChangeEmail = (e) => {
        if (!e.target.value.includes("@")) {
            this.setState({ isEmailInvalid: true, isEmailValid: false });
        }
        if (e.target.value.includes("@")) {
            this.setState({ isEmailInvalid: false, isEmailValid: true, email: e.target.value });
        }
    };

    passwordCompare = (e) => {
        if (e.target.value != this.state.password) {
            this.setState({ passwordMismatch: true });
        }
        if (e.target.value === this.state.password) {
            this.setState({ passwordMismatch: false, passwordMatch: true, confirm_password: e.target.value });
        }
    };
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
            }, 1000);
        }
    };
    // handleCreateAccount = () => {
    //     if (this.state.email == null || this.state.password == null) {
    //         this.setState({ validationError: true });
    //         return;
    //     }
    //     if (!this.state.email.includes("@")) {
    //         this.setState({ validationError: true });
    //         return;
    //     }
    //     if (this.state.confirm_password != this.state.password) {
    //         this.setState({ validationError: true });
    //         return;
    //     }
    //     $("#preloader").fadeIn("slow");
    //     setTimeout(() => {
    //         var status = loginUser("token", this.state.email, true);
    //         if (!status) {
    //             this.setState({
    //                 invalidLogin: true,
    //             });
    //             $("#preloader").fadeOut("slow");
    //         }
    //     }, 1000);
    // };
    componentDidMount() {

        console.log(this.props.validationType, "valDateType")
        window.scrollTo(0,0)
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
        if(this.state.isRedirect){
            return(
              <Redirect
              to={{
                pathname: "/signin",
                state: { redirectProps: "verified", email:this.props.propData?.emailAddress }
              }}
              />
            )
            
          }
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
            <div style={{ background: "#FFF" }}>
                <div id="preloader" style={{ display: "none" }}>
                    <div id="status">
                        {/* <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} /> */}
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

                <div className={isMobile ? "mobile-container-fluid" : "cust-container4"} >
                    <div className="col-sm-12" style={{ marginTop: "20px" }}>
                        <img src={roundIcon} style={{width:'70px'}} />
                    </div>
                    <div className={!isMobile ? "custom-form col-sm-10" : "custom-form col-sm-10 mt-4"}>
                        {/* <img src={verify_top_img} style={{width:'72px'}}/> */}

                        <h2 style={!isMobile ? { fontSize: "36px" } : { fontSize: "31px" }} className="manrope-text mt-3">
                            Verify your account
                        </h2>
                        <p className="manrope-text" style={{ fontSize: "14px", marginTop: "-10px" }}>
                            {this.state.valDateType ? "A cofirmation code has been sent to the email address provided"  : 
                            
                            "Enter the code we sent to the phone number ending in -27"
                            }
                        </p>
                        <br />
                        {this.state.validationError ? (
                            <Alert
                                closable={true}
                                onClose={() => this.setState({ validationError: false })}
                                message="Validation error!"
                                description={<p style={!isMobile ? { fontSize: "12px" } : null}>Validation failed! Try again.</p>}
                                type="error"
                                showIcon
                                className="manrope"
                            />
                        ) : null}
                        <div className="row" style={{ marginTop: "20px" }}>
                          
                            <div className="col-sm-12">
                                <PinInput
                                    length={4}
                                    focus
                                    // disabled

                                    ref={(p) => (this.pin = p)}
                                    type="numeric"
                                    onChange={this.state.valDateType ? this.onChangePinEmail : this.onChangePin}
                                    inputMode="number"
                                    style={{ width: "500px", fontSize: "20px" }}
                                    inputStyle={{ borderColor: "#bfbfbf" }}
                                    // inputFocusStyle={{borderColor: 'blue'}}
                                    // onComplete={(value, index) => {}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    className="manrope"
                                />
                            </div>
                        </div>

                        <div className="row mt-5">
                            <div className="col-sm-6">
                                <p className="manrope-text" style={{ color: "#84818A", fontSize: "14px" }}>
                                    <span style={{ color: "#84818A" }}>Back</span>
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <p className="manrope-text" style={{ color: "#84818A", fontSize: "14px" }}>
                                    <span style={{ color: "#1B52C4" }}>Didn’t receive your code?</span>
                                </p>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-sm-12">
                                <hr />

                                <div className="form-inline">
                                    <p className="manrope-text" style={{ color: "#84818A", fontSize: "14px" }}>
                                        <span style={{ color: "#1B52C4" }}>Get your code with  another way</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifyAccount;
