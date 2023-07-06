import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import illustration from "../../assets/images/illus.png";
import ic_up from "../../assets/images/ic_up.png";
import ic_down from "../../assets/images/ic_down.png";
import shape from "../../assets/images/Shape.png";
import shape2 from "../../assets/images/Shape2.png";
import shape3 from "../../assets/images/Shape3.png";
import badge from "../../assets/images/Label.svg";
import filterIcon from "../../assets/images/filterIcon.svg";
import kulCheck from "../../assets/images/kulCheck.svg";

import printer from "../../assets/images/print.svg";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import * as Unicons from "@iconscout/react-unicons";
import Endpoint from "../../utils/endpoint";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";
import { resolveDateTime } from "../../utils/helpers";
import { Modal, Button } from "antd";
import PinInput from "react-pin-input";


class AddTeller extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            pageLoading: false,
            institutionDetails: [],
            loading: false,
            visible: false,
            commitingInvoice: false,
            invoiceCommited:false,
            //pageIgnite:this.props.ignite,
            // pageIgnite2: false,
            // pageIgnite: this.props.ignite
            };
      }
    // state = {
    //     pageLoading: false,
    //     institutionDetails: [],
    //     loading: false,
    //     visible: false,
    //     commitingInvoice: false,
    //     invoiceCommited:false
    // };
    onChange = (value) => {
        this.setState({ value });
    };

    onClear = () => {
        this.setState({
            value: "",
        });
        this.pin.clear();
    };
    loadDataError = (error) =>
        toast.error("Something went wrong, pls check your connection.", {
            style: {
                border: "1px solid #DC2626",
                padding: "16px",
                background: "#DC2626",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#DC2626",
            },
        });

    loadDataFromServer = () => {};
    showModal = () => {
        this.setState({
            pageIgnite: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite:false });
    };
    componentDidMount() {
        
       
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        this.loadDataFromServer();
    }
    promptCommitInvoice = () => {
        this.setState({
            visible: false,
            // commitingInvoice: true,
            invoiceCommited:true,
            pageIgnite:false,

        });
    };

    closeCommit = () => {
        this.setState({
            
            commitingInvoice: false,
        });
    };
    closeCommitted = () => {
        //this.props.ignite = !this.props.ignite
        this.setState({
            
            invoiceCommited: false,
            pageIgnite:false,
            
        });
    };
    handleCommit = () => {
        this.setState({
            isLoading:true
        })
        setTimeout(() => {
            this.onClear();
            this.setState({
                isLoading:false,
                commitingInvoice:false,
                pageIgnite:false,
                invoiceCommited:true

            })
        }, 2000)
    }
    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited} = this.state;
        return (
            <>
               <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                Tellers
                            </h1>
                            {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                <img src={filterIcon}/> &nbsp; Filter
                            </button>
                            <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize:'14px' }} onClick={this.showModal}>
                                <i className="fa fa-plus"/> &nbsp; Teller
                            </button>
                        </div>
                    </div>
                <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                           Add Teller
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-8">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        First Name
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" className="form-control" placeholder="Enter First Name"/>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        Last Name
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" className="form-control" placeholder="Enter Last Name"/>
                                </div>
                            </div>
                        </div>

                        
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                       Super Teller type
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <select className="form-control"> 
                                            <option>Select teller type</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        Email Address
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" className="form-control" placeholder="Enter Email Address"/>
                                </div>
                            </div>
                        </div>

                        
                        <div className="row" style={{ marginTop: "46px" }}>
                            <div className="col-sm-12 col-xl-8">
                                <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                    Add Teller
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                
                <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 582 : null}>
                    <div className="modal-top text-center">
                        <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                        Teller added successfully
                        </p>

                        <div className="row">
                            <div className="col-sm-12">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                Your new user can start using the account within 24 hours. 
In most cases, it should just take few minutes
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{marginTop:'20px'}}>
                            <div className="col-sm-12 col-xl-12">
                                <img src={kulCheck}/>
                            </div>
                            
                            
                        </div>

                        <div className="row" style={{marginTop:'20px'}}>
                            <div className="col-sm-12 col-xl-12">
                                <p className="manrope-text" style={{color:'#1B52C4', fontSize:'20px'}}>Sandra Okoro</p>
                                <p>Username: Sandramfb@gmail.com<br/>
Password: fjegakal62  </p>
                            </div>
                            
                            
                        </div>
                        


                        <div className="row" style={{marginTop:'10px'}}>
                            <div className="col-sm-12 col-xl-12">
                                <p className="manrope-text" style={{color:'#05EEC0', fontSize:'14px'}}>Copy Password</p>
                                
                            </div>
                            
                            
                        </div>


                        
                        <div className="row" style={{marginTop:'20px'}}>
                            <div className="col-sm-12 col-xl-12">
                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}>
                                    View Tellers &nbsp;
                                </button>
                                
                            </div>
                            
                            
                        </div>
                        
                    </div>
                </Modal>

                
               

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTeller);
