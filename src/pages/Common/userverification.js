import React from "react";
import $ from "jquery";
import { enquireScreen } from "enquire-js";
import DocumentTitle from "react-document-title";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import { Component } from "react";
import AccountHeader from "../Common/AccountHeader";
import { Link, Redirect } from "react-router-dom";
import Logo from "../../assets/images/home/logo.png";
import { getUser, logOutUser } from "../../utils/auth";

import Avatar from "../../assets/images/avatar.png";

import logo from "../../assets/images/17.png";
import dashSvg from "../../assets/images/dash-svg.svg";
import notificatiionSvg from "../../assets/images/Notification.svg";
import searchSvg from "../../assets/images/search.svg";
import collectionsSvg from "../../assets/images/coll.svg";
import trans_white from "../../assets/images/transac_white.svg";
import logOutSvg from "../../assets/images/dashprofile-icon.svg";
import settingsTop from "../../assets/images/settings_applications.svg";
import cont from "../../assets/images/person_pin_acc.svg";
import sett from "../../assets/images/settings_applications_acc.svg";
import bell from "../../assets/images/notifications_acc.svg";
import userp from "../../assets/images/User.png";
import { AttentionSeeker, Fade as AttFade } from "react-awesome-reveal";
import { SYSTEM_URL } from "../../utils/config";
import * as Unicons from "@iconscout/react-unicons";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Fade, Col } from "reactstrap";
import Endpoint from "../../utils/endpoint";
class UserVerification extends Component {
    state = {
        editProfile: true,
        accountSettings: false,
        notificatiionSettings: false,
    };

    initiateHandshake = () => {
        // const payload = {
        //     "invoiceNumber": this.state.invoicenumber,
        //     "lastName": this.state.surname,
        //     "firstName": this.state.first_name,
        //     "otherName": this.state.othername,
        //     "email": this.state.email,
        //     "phoneNo": this.state.phone,
        //     "registrationNumber": this.state.regnumber
        //   }
            
          const queryString = window.location.search;
          const urlParams = new URLSearchParams(queryString);
          const trfx = urlParams.get('portalidentifier')
          console.log(trfx, "trxf")

          let stateObj = { id: "100" };
          window.history.replaceState(stateObj, "x 2", "/merchantvalidation");
          Endpoint.pullPaymentSkinByPortalIdentifier(trfx)
          .then((res) => {
            console.log(res.data)
            this.setState({
                verificationRedirect: true,
                responseData: res.data
            })
            //window.location.href = SYSTEM_URL + `userverification?`
          })
          .catch((err) => {
            console.log(err)
          })
    }
    componentDidMount() {

        this.initiateHandshake()
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        // $(document).ready(function () {
        //     var readURL = function (input) {
        //         if (input.files && input.files[0]) {
        //             var reader = new FileReader();

        //             reader.onload = function (e) {
        //                 $(".profile-pic").attr("src", e.target.result);
        //             };

        //             reader.readAsDataURL(input.files[0]);
        //         }
        //     };

        //     $(".file-upload").on("change", function () {
        //         readURL(this);
        //     });

        //     $(".upload-button").on("click", function () {
        //         $(".file-upload").click();
        //     });
        // });
    }
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    toggleAccount = (id) => {
        window.scrollTo(0, 0);
        if (id === "edit_profile_tab") {
            $("#acc_settings").fadeOut(300);
            $("#not_settings").fadeOut(300);
            $("#edit_profile").delay(300).fadeIn(400);
        } else if (id === "acc_settings_tab") {
            $("#edit_profile").fadeOut(300);
            $("#not_settings").fadeOut(300);
            $("#acc_settings").delay(300).fadeIn(400);
        } else if (id === "not_settings_tab") {
            $("#edit_profile").fadeOut(300);
            $("#acc_settings").fadeOut(300);
            $("#not_settings").delay(300).fadeIn(400);
        }
        var element = document.getElementsByClassName("acc_menus");
        if (element.length > 0) {
            for (var i = 0; i < element.length; i++) {
                element[i].className = "acc_menus manrope-text drk-text";
            }

            var currentNode = document.getElementById(`${id}`);
            currentNode.className = "acc_menus manrope-text drk-text account-side-active";
        }
    };
    render() {
        if (this.state.verificationRedirect) {
            return <Redirect 
            // to={"/userverification"} data replace={true} 
            to={{
                pathname: "/userverification",
                state: { referrer: this.state.responseData }
              }}
            />;
            
          }
        const { isMobile } = this.state;
        // $('.menu-item a').click(function(){
        //     $(this).addClass('active').siblings().removeClass('active');
        //     });
        require("antd/dist/reset.css");
        return (
            <>
              <div id="preloader2">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                <Fade>
                    {/* <AccountHeader /> */}

                    <div className="container py-5">
                        <div className="py-5" style={{ marginTop: "30px" }}>
                            <div className="row">
                                <div className="col-xl-3 col-sm-12">
                                    {/* <p style={{ fontSize: "36px", color: "#2E2C34" }} className="manrope-text">
                                        Settings
                                    </p>
                                    <p style={{ fontSize: "14px", color: "#84818A", marginTop: "-10px" }} className="manrope-text-light">
                                        Update and manage your account
                                    </p>
                                    <br />

                                    <div className="account-side">
                                        <p className="acc_menus manrope-text drk-text account-side-active" id="edit_profile_tab" onClick={() => this.toggleAccount("edit_profile_tab")}>
                                            <img src={cont} style={{ marginRight: "10px" }} />
                                            <a>Edit Profile</a>
                                        </p>
                                        <p className="acc_menus manrope-text drk-text" id="acc_settings_tab" onClick={() => this.toggleAccount("acc_settings_tab")}>
                                            <img src={sett} style={{ marginRight: "10px" }} />
                                            <a>Account Settings</a>
                                        </p>
                                        <p className="acc_menus manrope-text drk-text" id="not_settings_tab" onClick={() => this.toggleAccount("not_settings_tab")}>
                                            <img src={bell} style={{ marginRight: "10px" }} />
                                            <a>Notifications</a>
                                        </p>
                                    </div> */}
                                </div>

                                {/* <AttFade> */}

                                <div id="acc_settings" className="col-xl-8 col-sm-12" style={{ background: "#fafafa" }}>
                                  
                                    <div
                                        className="custom-form col-xl-12 col-sm-12"
                                        style={!isMobile ? { background: "#FFF", marginTop: "20px", marginLeft: "20px", padding: "28px" } : { background: "#FFF", marginTop: "20px", marginLeft: "0px", padding: "28px" }}
                                    >
                                        <div class="row">
                                            <div class="col-xl-12 col-sm-12">
                                                <div class="row">
                                                    <div className="col-sm-10">
                                                        <p style={{ fontSize: "16px" }} className="manrope-text">
                                                           School Portal Mock <span style={{color:"red"}}>(Test Environment)</span>
                                                        </p>
                                                        <p style={{ fontSize: "14px", color: "#8898aa", lineHeight: "1.4" }} className="manrope-text-light">
                                                            This is a test interface that models the school portal. This test environment would initiate a supposed hand-shake with the Kulpay server to initialize a payment based on the collection key provided
                                                        </p>
                                                    </div>
                                                
                                                    <div className={!isMobile ? "col-xl-12 col-sm-12" : "col-xl-4 col-sm-12 mt-3"}>
                                    <br />
                                    <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="collectionKey" id="collectionKey" style={{ fontSize: "13px" }} />
                                            <label for="collectionKey" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Enter collection key
                                            </label>
                                        </div>
                                       
                                    </div>
                                    <div className={!isMobile ? "col-xl-12 col-sm-12" : "col-xl-4 col-sm-12 mt-3"}>
                                    <br />
                                    <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="apiKey" id="apiKey" style={{ fontSize: "13px" }} />
                                            <label for="apiKey" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Enter API access key
                                            </label>
                                        </div>
                                       
                                    </div>
                                    {/* <div class="row mt-5"> */}
                                    
                                    <div className={!isMobile ? "col-xl-4 col-sm-12" : "col-xl-4 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="surname" id="surname" style={{ fontSize: "13px" }} />
                                            <label for="surname" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Surname
                                            </label>
                                        </div>
                                    </div>

                                    <div className={!isMobile ? "col-xl-4 col-sm-12" : "col-xl-4 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="first_name" id="first_name" style={{ fontSize: "13px" }} />
                                            <label for="first_name" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                First name
                                            </label>
                                        </div>
                                    </div>
                                    <div className={!isMobile ? "col-xl-4 col-sm-12" : "col-xl-4 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="othername" id="othername" style={{ fontSize: "13px" }} />
                                            <label for="othername" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Othername
                                            </label>
                                        </div>
                                    </div>
                                    <div className={!isMobile ? "col-xl-6 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="email" id="email" style={{ fontSize: "13px" }} />
                                            <label for="email" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Email
                                            </label>
                                        </div>
                                    </div>

                                    <div className={!isMobile ? "col-xl-6 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="phone" id="phone" style={{ fontSize: "13px" }} />
                                            <label for="phone" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Phone Number
                                            </label>
                                        </div>
                                    </div>
                                    <div className={!isMobile ? "col-xl-6 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="regnumber" id="regnumber" style={{ fontSize: "13px" }} />
                                            <label for="regnumber" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Registration/Matriculation Number
                                            </label>
                                        </div>
                                    </div>
                                    <div className={!isMobile ? "col-xl-6 col-sm-12" : "col-xl-6 col-sm-12 mt-3"}>
                                    <br />

                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} class="form-control manrope-text drk-text" name="invoicenumber" id="invoicenumber" style={{ fontSize: "13px" }} />
                                            <label for="invoicenumber" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Invoice Number
                                            </label>
                                        </div>
                                    </div>
                                   
                                {/* </div> */}
                                                </div>
                                                {/* <hr /> */}
                                                <div className="row mt-5">
                                                    <button className="btn btn-default drk-text amnrope-text" style={{ fontSize: "14px" }}>
                                                        Back to home
                                                    </button>

                                                    <button className="btn btn-danger amnrope-text" onClick={this.initiateHandshake} style={{ fontSize: "14px" }}>
                                                        Save Changes and proceed
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                              
                                {/* </AttFade> */}
                            </div>
                        </div>
                    </div>
                    <DocumentTitle title="Account Settings" key="title" />
                </Fade>
            </>
        );
    }
}
export default UserVerification;
