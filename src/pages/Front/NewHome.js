import React, { Component } from "react";
import { Parallax, OverPack } from "rc-scroll-anim";
import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
// import * as pageData from "./data";
import ListImg from "../../assets/images/List.jpg";
import pie from "../../assets/images/pie.png";
import dots from "../../assets/images/dots.png";
import check from "../../assets/images/check.png";
import squares from "../../assets/images/Icon2.png";
import bitmap1 from "../../assets/images/man1.jpg";
import syncIcon from "../../assets/images/sync.png";
import womImg from "../../assets/images/man2.jpg";
import iconCheck from "../../assets/images/iconCheck.png";
import bottomBanner from "../../assets/images/Group1582.png";
import blueBottom from "../../assets/images/downBann.png";
import LogoKul from "../../assets/images/LogoKul.png";
import twitter from "../../assets/images/tw.png";
import instagram from "../../assets/images/inst.png";
import linkden from "../../assets/images/linkden.png";
import googleIcon from "../../assets/images/gg.png";
import { enquireScreen } from "enquire-js";
import oval from "../../assets/images/Oval.png";
import oval2 from "../../assets/images/Oval2.png";
import Banner from "../Front/Banner";
import Header from "../Front/Header";
import Page1 from "./Page1";
import logo from "../../assets/images/17.png";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import dashSvg from "../../assets/images/dash-svg.svg";
import notificatiionSvg from "../../assets/images/Notification.svg";
import trans_white from "../../assets/images/transac_white.svg";
import logOutSvg from "../../assets/images/dashprofile-icon.svg";
import settingsTop from "../../assets/images/settings_applications.svg";
import dashTopSvg from "../../assets/images/dash-svg.svg";
import $ from "jquery";
// import '../../assets/static/style';

import { Input } from "antd";
import { Collapse, DropdownMenu, DropdownItem, UncontrolledDropdown, DropdownToggle, Form, InputGroupAddon, InputGroupText, InputGroup, Media, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const { Search } = Input;
// const { page2 } = pageData;
const scrollElements = document.querySelectorAll(".js-scroll");

// const elementInView = (el, dividend = 1) => {
//   const elementTop = el.getBoundingClientRect().top;

//   return (
//     elementTop <=
//     (window.innerHeight || document.documentElement.clientHeight) / dividend
//   );
// };

// const elementOutofView = (el) => {
//   const elementTop = el.getBoundingClientRect().top;

//   return (
//     elementTop > (window.innerHeight || document.documentElement.clientHeight)
//   );
// };

// const displayScrollElement = (element) => {
//   element.classList.add("scrolled");
// };

// const hideScrollElement = (element) => {
//   element.classList.remove("scrolled");
// };

// const handleScrollAnimation = () => {
//   scrollElements.forEach((el) => {
//     if (elementInView(el, 1.25)) {
//       displayScrollElement(el);
//     } else if (elementOutofView(el)) {
//       hideScrollElement(el)
//     }
//   })
// }

// window.addEventListener("scroll", () => {
//   handleScrollAnimation();
// });
export default class Page2 extends Component {
    state = {};
    componentDidMount() {
   
        window.scroll(0, 0);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    render() {
        window.addEventListener("load", (event) => {
            var image = document.querySelector("img");
            var isLoaded = image.complete && image.naturalHeight !== 0;
            if (isLoaded) {
                setTimeout(() => {
                    $("#preloader").delay(450).fadeOut("slow");
                }, 1000);
            }
        });
        //require('antd/dist/reset.css')
        const { isMobile } = this.state;
        let screen_height = $(window).height();

        return (
            // <OverPack playScale="0.2">
            <div style={{ background: "#FFF" }}>
                <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                {/* <KulLoader/> */}

                <div className={!isMobile ? "cust-container" : "container-fluid"}>
                    <nav className="home-nav" style={!isMobile ? { width: "80%" } : null}>
                        <ul>
                            <li>
                                <a className="navbar-brand" href="#">
                                    <img src={logo} style={{ left: "0rem", top: "0rem", width: "95px", height: "28.96px" }} />
                                </a>
                            </li>
                            <span className="hide-mobile">
                                <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Product
                                    </a>
                                </li>
                                <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Services
                                    </a>
                                </li>
                                <li>
                                    <a className="manrope-text-link-light" href="#">
                                        Contact us
                                    </a>
                                </li>
                                <span style={{ float: "right" }}>
                                    <li>
                                        {/* <a className="btn btn-outline-dove manrope" href="/signin" style={{fontSize:'14px', fontWeight:'700', marginRight:'10px'}}>Sign in</a> */}

                                        {/* <Nav className="align-items-center d-none d-md-flex" navbar>
                                            <UncontrolledDropdown nav> */}
                                                {/* <DropdownToggle className="pr-0" nav>
                                                    <Media className="align-items-center"> */}
                                                        <Link to={{ pathname: "/signin" }} className="btn btn-outline-dove manrope" style={{ fontSize: "14px", fontWeight: "700", marginRight: "10px" }}>
                                                            Sign in
                                                        </Link>
                                                    {/* </Media>
                                                </DropdownToggle> */}
                                                {/* <DropdownMenu className="dropdown-menu-arrow" right>
                                                  
                                                    <Link to={{ pathname: "/signin", state: { identifier: "Teller" } }}>
                                                        <DropdownItem>
                                                            <img src={dashTopSvg} style={{ width: "24px", height: "24px", marginRight: "20px" }} />
                                                            <span className="drk-text manrope-text" style={{ fontSize: "12px" }}>
                                                                Teller
                                                            </span>
                                                        </DropdownItem>
                                                    </Link>
                                                    <Link to={{ pathname: "/signin", state: { identifier: "SuperTeller" } }}>
                                                        <DropdownItem>
                                                            <img src={dashTopSvg} style={{ width: "24px", height: "24px", marginRight: "20px" }} />
                                                            <span className="drk-text manrope-text" style={{ fontSize: "12px" }}>
                                                                Super Teller
                                                            </span>
                                                        </DropdownItem>
                                                    </Link>

                                                    <Link to={{ pathname: "/signin" }}>
                                                        <DropdownItem>
                                                            <img src={dashTopSvg} style={{ width: "24px", height: "24px", marginRight: "20px" }} />
                                                            <span className="drk-text manrope-text" style={{ fontSize: "12px" }}>
                                                                Super Admin
                                                            </span>
                                                        </DropdownItem>
                                                    </Link>

                                                   
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </Nav> */}
                                    </li>
                                    <li>
                                        <Link to="/create_account">
                                            <button className="btn btn-dove manrope" style={{ fontSize: "14px", fontWeight: "700" }}>
                                                Create free account
                                            </button>
                                        </Link>
                                    </li>
                                </span>
                            </span>
                        </ul>
                    </nav>
                </div>

                <Banner />
                <Page1 />

                <div className="page-wrapper page2" id="screen02" style={!isMobile ? null : { height: "4050px", paddingBottom: "20px" }}>
                    <div className="container-fluid">
                        {isMobile ? (
                            <div>
                                <br />
                                <br />
                            </div>
                        ) : null}

                        <div className={!isMobile ? "cust-container" : null}>
                            <div className="col-sm-12">
                                <img src={ListImg} style={{ width: "100%" }} />
                            </div>
                        </div>
                        {/* <OverPack style={{ overflow: "hidden" }}>
                    <TweenOne key="0" animation={{ opacity: .5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} /> */}
                        <Parallax
                            animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }}
                            //   style={{ transform: 'translateX(-100px)', opacity: 0 }}
                            style={{ transform: "translateX(-100px)", filter: "blur(0px)", opacity: 0 }}
                            className="code-box-shape"
                        >
                            <QueueAnim key="queue">
                                <div className={!isMobile ? "cust-container2" : null} key="a">
                                    <div className="col-sm-12 col-lg-7" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                        <h1 className="manrope" style={isMobile ? { fontSize: "20px", color: "#1B52C4" } : { fontSize: "39px", color: "#1B52C4" }}>
                                            Our solution for your business
                                        </h1>
                                        <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                            We are self-service data analytics software that lets you create visually {!isMobile ? <br /> : null}
                                            appealing data visualizations and insightful dashboards in minutes.
                                        </p>
                                    </div>
                                </div>
                            </QueueAnim>
                        </Parallax>
                        {/* </OverPack> */}

                        {/* <OverPack style={{ overflow: "hidden" }}>
                    <TweenOne key="0" animation={{ opacity: .5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} /> */}
                        <Parallax
                            animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }}
                            //   style={{ transform: 'translateX(-100px)', opacity: 0 }}
                            style={{ transform: "translateX(-100px)", filter: "blur(0px)", opacity: 0 }}
                            className="code-box-shape"
                        >
                            <QueueAnim key="queue" leaveReverse>
                                <div className={!isMobile ? "cust-container2" : null} key="a">
                                    <div className={!isMobile ? "row" : null}>
                                        <div className="col-sm-12 col-lg-3" key="1" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={pie} style={{ width: "53.35px", marginBottom: "20px" }} />
                                            <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                Analyze your data
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                Create reports with an easy to {!isMobile ? <br /> : null}
                                                use drag-and-drop designer.
                                            </p>
                                        </div>
                                        <div className="col-sm-12 col-lg-3" key="2" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={check} style={{ width: "53.35px", marginBottom: "20px" }} />
                                            <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                Collaborate securely
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                Share/publish your reports
                                                {!isMobile ? <br /> : null}
                                                with your colleagues.
                                            </p>
                                        </div>
                                        <div className="col-sm-12 col-lg-3" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={dots} style={{ width: "53.35px", marginBottom: "20px" }} />
                                            <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                Embedded analytics
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                Get a powerful analytics tool
                                                {!isMobile ? <br /> : null}
                                                in your own brand name.
                                            </p>
                                        </div>
                                        <div className="col-sm-12 col-lg-3" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={squares} style={{ width: "53.35px", marginBottom: "20px" }} />
                                            <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                Easy and Intuitive
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                Easily converse with your data
                                                {!isMobile ? <br /> : null}
                                                using everyday language.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </QueueAnim>
                        </Parallax>
                        {/* </OverPack> */}

                        {/* <OverPack style={{ overflow: "hidden" }}>
                    <TweenOne key="0" animation={{ opacity: .5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} /> */}
                        <Parallax animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }} style={{ transform: "translateX(-100px)", opacity: 0 }} className="code-box-shape">
                            <QueueAnim key="queue">
                                <div className={!isMobile ? "cust-container2" : null} style={{ marginTop: "70px" }} key="a">
                                    <div className={!isMobile ? "row" : null}>
                                        <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={bitmap1} style={isMobile ? { width: "300.9px", height: "346px", marginBottom: "20px" } : { width: "491.9px", height: "516px", marginBottom: "20px" }} />
                                        </div>
                                        <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "190px" }}>
                                            <p className="manrope-text-light" style={{ color: "#05EEC0", fontSize: "16px" }}>
                                                ANALYTICS
                                            </p>
                                            <h1 className="manrope" style={isMobile ? { fontSize: "20px", color: "#1B52C4" } : { fontSize: "39px", color: "#1B52C4" }}>
                                                Analyze your data with our analyze tools.
                                                {/* <br /> */}
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                Self-service data analytics software that lets you create visually
                                                {/* {!isMobile ? <br /> : null} */}
                                                appealing data visualizations and insightful dashboards in minutes.
                                            </p>
                                            <div className="row">
                                                <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "20px" } : { textAlign: "left", marginTop: "60px" }}>
                                                    <img src={squares} style={{ width: "53.35px", marginBottom: "20px" }} />
                                                    <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                        Powerful dashboard
                                                    </h1>
                                                    <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                        Combine multiple reports into a single beautiful dashboard.
                                                    </p>
                                                </div>
                                                <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "20px" } : { textAlign: "left", marginTop: "60px" }}>
                                                    <img src={syncIcon} style={{ width: "53.35px", marginBottom: "20px" }} />
                                                    <h1 className="manrope" style={isMobile ? { fontSize: "18px", color: "#1B52C4" } : { fontSize: "18px", color: "#2E2C34" }}>
                                                        Always in Sync
                                                    </h1>
                                                    <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                        Don’t worry about the data, always be synchronized
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </QueueAnim>
                        </Parallax>
                        {/* </OverPack> */}

                        {/* <OverPack style={{ overflow: "hidden" }}> */}
                        <Parallax animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }} style={{ transform: "translateX(-100px)", opacity: 0 }} className="code-box-shape">
                            {/* <TweenOne key="0" animation={{ opacity: .5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} /> */}
                            <QueueAnim key="queue" leaveReverse>
                                <div className={!isMobile ? "cust-container2" : null} style={{ marginTop: "70px" }} key="a">
                                    <div className={!isMobile ? "row" : null}>
                                        <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "190px" }}>
                                            <h1 className="manrope" style={isMobile ? { fontSize: "20px", color: "#1B52C4" } : { fontSize: "39px", color: "#1B52C4" }}>
                                                Collaborate with your team anytime, anywhere.
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", lineHeight: "26px", color: "#84818A" } : { fontSize: "11px", lineHeight: "26px", color: "#84818A" }}>
                                                See which work apps your team is working in, and join them with a click. Shared cursors equals better than screen-sharing.See which work apps your team is working in, and join them with a
                                                click. Shared cursors equals better than screen-sharing.
                                            </p>

                                            {!isMobile ? (
                                                <div className="row">
                                                    <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "20px" } : { textAlign: "left", marginTop: "60px" }}>
                                                        <p className="manrope-text-light" style={{ fontSize: "15px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Organize your data
                                                        </p>
                                                        <p className="manrope-text-light" style={{ fontSize: "15px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Work with any team
                                                        </p>
                                                        <p className="manrope-text-light" style={{ fontSize: "15px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Business analytics
                                                        </p>
                                                    </div>
                                                    <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "0px" } : { textAlign: "left", marginTop: "60px" }}>
                                                        <p className="manrope-text-light" style={{ fontSize: "15px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Always in sync
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="row">
                                                    <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "20px" } : { textAlign: "left", marginTop: "60px" }}>
                                                        <p className="manrope-text-light" style={{ fontSize: "11px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Organize your data
                                                        </p>
                                                        <p className="manrope-text-light" style={{ fontSize: "11px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Work with any team
                                                        </p>
                                                        <p className="manrope-text-light" style={{ fontSize: "11px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Business analytics
                                                        </p>
                                                    </div>
                                                    <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "0px" } : { textAlign: "left", marginTop: "60px" }}>
                                                        <p className="manrope-text-light" style={{ fontSize: "11px", lineHeight: "26px", width: "100%", color: "#84818A" }}>
                                                            <img src={iconCheck} style={{ width: "24.7px", height: "24px", float: "left" }} /> &nbsp; &nbsp; Always in sync
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-sm-12 col-lg-6" style={isMobile ? { textAlign: "left", marginTop: "40px" } : { textAlign: "left", marginTop: "120px" }}>
                                            <img src={womImg} style={isMobile ? { width: "300.9px", height: "346px", marginBottom: "20px" } : { width: "491.9px", height: "516px", marginBottom: "20px" }} />
                                        </div>
                                    </div>
                                </div>
                            </QueueAnim>
                        </Parallax>
                        {/* </OverPack> */}
                        {/* <OverPack style={{ overflow: "hidden" }}> */}
                        <Parallax animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }} style={{ transform: "translateX(-100px)", opacity: 0 }} className="code-box-shape">
                            <TweenOne key="0" animation={{ opacity: 0.5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} />
                            <QueueAnim key="queue">
                                <div className={!isMobile ? "cust-container2" : null} style={{ marginTop: "70px" }} key="a">
                                    <div className="row">
                                        <img src={bottomBanner} style={isMobile ? { width: "100%", height: "200px" } : { width: "100%", marginLeft: "auto", marginRight: "auto" }} />
                                    </div>
                                </div>
                            </QueueAnim>
                        </Parallax>
                        {/* </OverPack> */}
                    </div>
                    {/* <div style={{height:'600px', width:'200px'}}>
&nbsp;
            </div> */}
                    {/* <OverPack style={{ overflow: "hidden" }}>
                <TweenOne key="0" animation={{ opacity: .5 }} className="code-box-shape" style={{ opacity: 0, marginBottom: 10 }} /> */}
                    <Parallax animation={{ x: 0, opacity: 1, playScale: [0.3, 0.6] }} style={{ transform: "translateX(-100px)", opacity: 0 }} className="code-box-shape">
                        <QueueAnim key="queue">
                            <div className="bg-bott" key="a">
                                <div className="container" style={!isMobile ? { paddingTop: "120px" } : { paddingTop: "10px" }}>
                                    <div className={!isMobile ? "row" : null}>
                                        <div className="col-sm-12 col-lg-6">
                                            <h1 className="manrope" style={!isMobile ? { fontSize: "39px", color: "#FFF" } : {fontSize:'29px', color: "#FFF"}}>
                                                Join Our Newsletter
                                            </h1>
                                            <p className="manrope-text-light" style={!isMobile ? { color: "#FFF", fontSize: "15px" } : { color: "#FFF", fontSize: "11px" }}>
                                                Just insert your email into the field below. And you will get
                                                {!isMobile ? <br /> : null}
                                                the updates about our updates
                                            </p>
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            {/* <Search placeholder="input search text" width={100} style={{padding:'20px'}} enterButton={<button style={{background:'#1B52C4', fontSize:'18px', fontStyle:'Open Sans', fontWeight:'700'}} className="btn btn-primary">Subscribe</button>} size="large"/> */}

                                            <div
                                                className={!isMobile ? "row" : null}
                                                style={!isMobile ? { background: "#FFF", width: "452px", borderRadius: "8px", padding: "3px" } : { background: "none", width: "100%", borderRadius: "8px" }}
                                            >
                                                <input style={{ border: "none" }} placeholder="Your Email" className="form-control col-lg-8 col-sm-12" type="text" />
                                                {isMobile ? <div></div> : null}
                                                <button
                                                    style={
                                                        !isMobile
                                                            ? { background: "#1B52C4", fontSize: "18px", fontStyle: "Open Sans", fontWeight: "700", marginLeft: "21px" }
                                                            : { background: "#1B52C4", fontSize: "18px", fontStyle: "Open Sans", fontWeight: "700" }
                                                    }
                                                    className={!isMobile ? "btn btn-primary btn-mobile" : "btn btn-primary btn-mobile mt-3"}
                                                >
                                                    Subscribe
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <img src={blueBottom} style={{ width: "100%" }} /> */}
                            </div>

                            <div className="">
                                <div className="container-fluid" style={!isMobile ? { paddingTop: "120px", paddingLeft: "200px" } : { paddingTop: "120px", paddingBottom: "20px" }}>
                                    <div className={!isMobile ? "row" : null}>
                                        <div className="col-sm-12 col-lg-5">
                                            <img src={LogoKul} style={{ width: "90px", height: "28px", marginBottom: "30px" }} />
                                            <p className="manrope-text-light" style={!isMobile ? { fontSize: "15px", color: "84818A", lineHeight: "26px" } : { fontSize: "11px", color: "84818A", lineHeight: "26px" }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing {!isMobile ? <br /> : null}
                                                elit, sed do eiusmod tempor incididunt ut labore et
                                                {!isMobile ? <br /> : null}
                                                dolore magna aliqua.
                                            </p>
                                            <p className={!isMobile ? "row" : null}>
                                                <img src={googleIcon} style={{ width: "42px", height: "40px", marginRight: "10px" }} />
                                                <img src={twitter} style={{ width: "42px", height: "40px", marginRight: "10px" }} />
                                                <img src={instagram} style={{ width: "42px", height: "40px", marginRight: "10px" }} />
                                                <img src={linkden} style={{ width: "42px", height: "40px", marginRight: "10px" }} />
                                            </p>
                                        </div>
                                        <div className="col-sm-1"></div>
                                        <div className="col-sm-12 col-lg-3">
                                            <b className="manrope-text" style={{ fontSize: "18px", color: "#2E2C34", lineHeight: "24px" }}>
                                                Services
                                            </b>
                                            <br />
                                            <br />
                                            {!isMobile ? (
                                                <div>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Cashier App
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Super Teller
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Teller
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Cashier App
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Super Teller
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Teller
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-sm-12 col-lg-3">
                                            <b className="manrope-text" style={{ fontSize: "18px", color: "#2E2C34", lineHeight: "24px" }}>
                                                Company
                                            </b>
                                            <br />
                                            <br />
                                            {!isMobile ? (
                                                <div>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Terms
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Privacy Policy
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "15px" }}>
                                                        Contact us
                                                    </p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Terms
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Privacy Policy
                                                    </p>
                                                    <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "11px" }}>
                                                        Contact us
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </QueueAnim>
                    </Parallax>
                    {/* </OverPack> */}
                </div>
            </div>
            // </OverPack>
        );
    }
}
