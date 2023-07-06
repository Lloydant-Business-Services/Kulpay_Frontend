import React from "react";
import $ from "jquery";
import { enquireScreen } from "enquire-js";
import DocumentTitle from "react-document-title";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import { Component } from "react";
import AccountHeader from "../Common/AccountHeader";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/home/logo.png";
import { getUser, logOutUser } from "../../utils/auth";

import Avatar from "../../assets/images/avatar.png";

import logo from "../../assets/images/teller_logo.png";
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

import * as Unicons from "@iconscout/react-unicons";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Fade, Col } from "reactstrap";
class AccountSettings extends Component {
    state = {
        editProfile: true,
        accountSettings: false,
        notificatiionSettings: false,
    };
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        $(document).ready(function () {
            var readURL = function (input) {
                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $(".profile-pic").attr("src", e.target.result);
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            };

            $(".file-upload").on("change", function () {
                readURL(this);
            });

            $(".upload-button").on("click", function () {
                $(".file-upload").click();
            });
        });
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
        const { isMobile } = this.state;
        // $('.menu-item a').click(function(){
        //     $(this).addClass('active').siblings().removeClass('active');
        //     });
        require("antd/dist/reset.css");
        return (
            <>
                <Fade>
                    <AccountHeader />

                    <div className="container py-5">
                        <div className="py-5" style={{ marginTop: "30px" }}>
                            <div className="row">
                                <div className="col-xl-3 col-sm-12">
                                    <p style={{ fontSize: "36px", color: "#2E2C34" }} className="manrope-text">
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
                                    </div>
                                </div>

                                {/* <AttFade> */}

                                <div
                                    id="edit_profile"
                                    className="custom-form col-xl-8 col-sm-12"
                                    style={!isMobile ? { background: "#FFF", marginLeft: "20px", minHeight: "700px", padding: "28px" } : { background: "#FFF", marginLeft: "0px", minHeight: "700px", padding: "28px" }}
                                >
                                    <div class="row">
                                        <div class="col-xl-8 col-sm-12">
                                            <p className="manrope-text drk-text" style={{ fontSize: "18px" }}>
                                                Edit your profile
                                            </p>

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" value={"Maxbert Okoro"} style={{ fontSize: "13px" }} name="email" onChange={this.handleInput} id="user" />
                                                <label for="user" class="animated-label manrope-text" style={{ fontSize: "12px", top: "-1px" }}>
                                                    Full Name
                                                </label>
                                            </div>
                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="position" onChange={this.handleInput} id="pos" />
                                                <label for="pos" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Position
                                                </label>
                                            </div>

                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="location" onChange={this.handleInput} id="location" />
                                                <label for="location" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Location
                                                </label>
                                            </div>

                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="birthday" onChange={this.handleInput} id="birthday" />
                                                <label for="birthday" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Birthday
                                                </label>
                                            </div>

                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="zip_code" onChange={this.handleInput} id="zip_code" />
                                                <label for="zip_code" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Zip code
                                                </label>
                                            </div>
                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="bio" onChange={this.handleInput} id="bio" />
                                                <label for="bio" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Bio
                                                </label>
                                            </div>

                                            <br />

                                            <div class="form-group">
                                                <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="phone" onChange={this.handleInput} id="phone" />
                                                <label for="phone" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                    Phone Number
                                                </label>
                                            </div>
                                        </div>
                                        <br />
                                        <div class="col-xl-4 text-center">
                                            <div className="avatar-wrapper">
                                                <img className="profile-pic" src={userp} />
                                                <div className="upload-button">
                                                    <i className="fa fa-arrow-circle-up" />
                                                </div>
                                                <input className="file-upload" type="file" accept="image/*" />
                                            </div>
                                            <button className="btn btn-outline-primary manrope-text" style={{ marginTop: "-42px", fontSize: "12px" }}>
                                                Upload new image
                                            </button>
                                            <p className="manrope-text" style={{ fontSize: "14px", color: "#84818A", cursor: "pointer" }}>
                                                Remove picture
                                            </p>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="row">
                                        <button className="btn btn-default drk-text amnrope-text" style={{ fontSize: "14px" }}>
                                            Cancel
                                        </button>

                                        <button className="btn btn-primary amnrope-text" style={{ fontSize: "14px" }}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>

                                <div id="acc_settings" className="col-xl-8 col-sm-12" style={{ background: "#fafafa" }}>
                                    <div
                                        className="custom-form col-xl-12 col-sm-12"
                                        style={!isMobile ? { background: "#FFF", marginLeft: "20px", padding: "28px", height: "560px" } : { background: "#FFF", marginLeft: "0px", padding: "28px", height: "590px" }}
                                    >
                                        <div class="row">
                                            <div class="col-xl-12 col-sm-12">
                                                <p className="manrope-text drk-text" style={{ fontSize: "18px" }}>
                                                    Account Settings
                                                </p>

                                                <br />

                                                <div class="form-group">
                                                    <input type="password" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="password" onChange={this.handleInput} id="password" />
                                                    <label for="password" class="drk-text animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Password
                                                    </label>
                                                </div>

                                                <br />

                                                <div class="form-group">
                                                    <input type="text" class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="username" onChange={this.handleInput} id="username" />
                                                    <label for="username" class="drk-text animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Username
                                                    </label>
                                                </div>

                                                <br />

                                                <div class="form-group">
                                                    <input type="email" defaultValue={"max@kulpay.com"} class="form-control manrope-text-light" style={{ fontSize: "13px" }} name="email" onChange={this.handleInput} id="email" />
                                                    <label for="email" class="drk-text animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Email Address
                                                    </label>
                                                </div>

                                                <br />

                                                <div class="form-group">
                                                    <input
                                                        type="text"
                                                        defaultValue={"Choose the language you’d like to use with Substance. Your language is currently set to: English (US)"}
                                                        class="form-control manrope-text-light"
                                                        style={{ fontSize: "13px" }}
                                                        name="lang"
                                                        onChange={this.handleInput}
                                                        id="lang"
                                                    />
                                                    <label for="lang" class="drk-text animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Language
                                                    </label>
                                                </div>
                                                <br />

                                                <div class="row">
                                                    <div className="col-sm-10">
                                                        <p style={{ fontSize: "14px" }} className="manrope-text">
                                                            Sign out all other sessions
                                                        </p>
                                                        <p style={{ fontSize: "14px", color: "#8898aa", lineHeight: "1.4" }} className="manrope-text-light">
                                                            Lost your phone? Left yourself logged in on a public computer? Need a <br />
                                                            way to sign out everywhere except your current browser? This is for you.
                                                        </p>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <button className="btn btn-outline-danger btn-xsm manrope-text" style={{ fontSize: "12px" }}>
                                                            Sign out all
                                                        </button>
                                                    </div>
                                                </div>

                                                <br />
                                            </div>
                                            <br />
                                        </div>
                                        <div className="custom-form col-xl-8 col-sm-12" style={{ minHeight: "40px" }}></div>
                                    </div>

                                    <div
                                        className="custom-form col-xl-12 col-sm-12"
                                        style={!isMobile ? { background: "#FFF", marginTop: "20px", marginLeft: "20px", padding: "28px" } : { background: "#FFF", marginTop: "20px", marginLeft: "0px", padding: "28px" }}
                                    >
                                        <div class="row">
                                            <div class="col-xl-12 col-sm-12">
                                                <div class="row">
                                                    <div className="col-sm-10">
                                                        <p style={{ fontSize: "14px" }} className="manrope-text">
                                                            Delete your account
                                                        </p>
                                                        <p style={{ fontSize: "14px", color: "#8898aa", lineHeight: "1.4" }} className="manrope-text-light">
                                                            When you delete your account, you lose access to Front account services, and we <br /> permanently delete your personal data. You can cancel the deletion for 14 days.
                                                        </p>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <div className="form-inline">
                                                            <input type="checkbox" className="form-control" checked style={{ marginRight: "20px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Confirm that I want to delete my account.
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className="row">
                                                    <button className="btn btn-default drk-text amnrope-text" style={{ fontSize: "14px" }}>
                                                        Learn More
                                                    </button>

                                                    <button className="btn btn-danger amnrope-text" style={{ fontSize: "14px" }}>
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    id="not_settings"
                                    className="custom-form col-xl-8 col-sm-12"
                                    style={!isMobile ? { background: "#FFF", marginLeft: "20px", padding: "28px" } : { background: "#FFF", marginLeft: "0px", minHeight: "700px", padding: "28px" }}
                                >
                                    <div class="row">
                                        <div class="col-xl-12 col-sm-12">
                                            <p className="manrope-text drk-text" style={{ fontSize: "18px" }}>
                                                Notification Settings
                                            </p>

                                            <p className="manrope-text-light grey-text" style={{ fontSize: "14px" }}>
                                                Mobile Push Notifications
                                            </p>
                                            <br />

                                            <div class="row" style={{ marginTop: "-20px" }}>
                                                <div class="col-sm-12">
                                                    <select className="form-control col-sm-5 manrope-text-light" style={{ height: "41px", fontSize: "14px" }}>
                                                        <option className="manrope-text-light" style={{ fontSize: "14px" }}>
                                                            All new messages
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>

                                            <br />

                                            <div class="row" style={{ marginTop: "20px" }}>
                                                <div class="col-sm-12">
                                                    <p className="manrope-text drk-text" style={{ fontSize: "16px" }}>
                                                        Email Notifications
                                                    </p>
                                                    <p className="manrope-text-light grey-text" style={{ fontSize: "14px", marginTop: "-11px" }}>
                                                        When you’re busy or not online, Substance can send you email notifications
                                                        <br /> for any new direct messages or mentions of your name.
                                                    </p>
                                                </div>
                                            </div>

                                            <div class="row" style={{ marginTop: "5px" }}>
                                                <div class="col-sm-12">
                                                    <p className="manrope-text drk-text" style={{ fontSize: "14px" }}>
                                                        Send me email notifications:
                                                    </p>
                                                   
                                                        <div className="form-inline" style={{marginTop:'-15px'}}>
                                                            <input type="radio" name="send_notification" className="form-control" style={{ marginRight: "17px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Send me email notifications:
                                                            </label>
                                                        </div>
                                                        <div className="form-inline" style={{marginTop:'-15px'}}>
                                                            <input type="radio" name="send_notification" className="form-control" style={{ marginRight: "17px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Once an hour at most
                                                            </label>
                                                        </div>
                                                        <div className="form-inline" style={{marginTop:'-15px'}}>
                                                            <input type="radio" name="send_notification" className="form-control" checked style={{ marginRight: "17px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Never
                                                            </label>
                                                        </div>
                                                    
                                                </div>
                                            </div>

                                            <div class="row" style={{ marginTop: "20px" }}>
                                                <div class="col-sm-12">
                                                    <p className="manrope-text drk-text" style={{ fontSize: "16px" }}>
                                                    Email News & Updates
                                                    </p>
                                                    <p className="manrope-text-light grey-text" style={{ fontSize: "14px", marginTop: "-11px" }}>
                                                    From time to time, we’d like to send you emails with interesting news about Substance and your workspace. You can choose which of these updates you’d like to receive :
                                                    </p>


                                                    <div className="form-inline" style={{marginTop:'-10px'}}>
                                                            <input type="checkbox" name="send_notification" checked className="form-control" style={{ marginRight: "10px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Tips and Tricks
                                                            </label>
                                                    </div>
                                                    <div className="form-inline" style={{marginTop:'-10px'}}>
                                                            <input type="checkbox" name="send_notification" checked className="form-control" style={{ marginRight: "10px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Offers and Promotions
                                                            </label>
                                                    </div>
                                                    <div className="form-inline" style={{marginTop:'-10px'}}>
                                                            <input type="checkbox" name="send_notification" checked className="form-control" style={{ marginRight: "10px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Substance Developer Newsletter:Best practices for connecting your work to Substance via our platform
                                                            </label>
                                                    </div>
                                                    <div className="form-inline" style={{marginTop:'-10px'}}>
                                                            <input type="checkbox" name="send_notification" checked className="custom-checkbox" style={{ marginRight: "10px" }} />
                                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "14px" }}>
                                                                Substance Platform Changelog:Stay in the know when we make updates to our APIs
                                                            </label>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                            <div class="row" style={{ marginTop: "20px" }}>
                                                <div class="col-sm-12">
                                                    <p className="manrope-text drk-text" style={{ fontSize: "16px" }}>
                                                    Sign-in Notifications
                                                    </p>
                                                    <p className="manrope-text-light grey-text" style={{ fontSize: "14px", marginTop: "-11px" }}>
                                                    These emails help keep your Substance account secure. If you haven’t already, you should also enable two-factor authentication.
                                                    </p>


                                                   
                                                </div>
                                            </div>
                                        
                                        </div>
                                        <br />
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <button className="btn btn-default drk-text amnrope-text" style={{ fontSize: "14px" }}>
                                            Cancel
                                        </button>

                                        <button className="btn btn-primary amnrope-text" style={{ fontSize: "14px" }}>
                                            Save Changes
                                        </button>
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
export default AccountSettings;
