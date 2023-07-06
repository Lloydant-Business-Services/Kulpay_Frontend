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


class CallInvoice extends Component {
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
            pageIgnite:true
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
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
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
            commitingInvoice: true,
            pageIgnite:false,

        });
    };

    closeCommit = () => {
        this.setState({
            
            commitingInvoice: false,
        });
    };
    closeCommitted = () => {
        this.setState({
            
            invoiceCommited: false,
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
                                Good {resolveDateTime("timeOfDay")}, Max
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p>
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px" }} onClick={this.showModal}>
                                Call Invoice
                            </button>
                        </div>
                </div>
               
                <Modal visible={visible} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Call Invoice
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-8">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Carefully imput invoice number to validate and confirm invoice
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        Invoice number
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "2px", background: "rgba(24, 78, 174, 0.03)", height: "186px", padding: "30px" }}>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Student Name
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    Okoro Kingsley
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Department
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    Science Laboratory Technology
                                </p>
                            </div>

                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Collection
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    School Fees
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Year
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    2021 - 2022
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "46px" }}>
                            <div className="col-sm-12 col-xl-8">
                                <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                    Commit Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal visible={commitingInvoice} title={false} onOk={this.closeCommit} onCancel={this.closeCommit} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Commit Tranaction
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-10">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <PinInput
                                    length={4}
                                    focus
                                    // disabled

                                    ref={(p) => (this.pin = p)}
                                    type="numeric"
                                    onChange={this.onChange}
                                    inputMode="number"
                                    style={{padding: '10px', width:'500px', fontSize:'20px'}}  
                                    inputStyle={{borderColor: '#6b666652'}}
                                    // inputFocusStyle={{borderColor: 'blue'}}
                                    // onComplete={(value, index) => {}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    className="manrope"
                                />
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "46px" }}>
                        <div className="col-sm-3">
                                <button className="btn btn-primary manrope-text-light" disabled={isLoading ? true : false} style={{ fontSize: "14px" }} onClick={this.handleCommit}>
                                    Continue
                                </button>
                            </div>
                            <div className="col-sm-12 col-xl-2">
                                <p onClick={this.closeCommit} style={{ fontSize: "12px", marginTop:"10px", cursor:'pointer' }} className="drk-text manrope-text">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                {isLoading ? <ClickLoader/> : null}
                            </div>
                            
                        </div>
                    </div>
                </Modal>
                <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Transaction Completed
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-10">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                Your new user can start using the account within 24 hours. 
In most cases, it should just take few minutes
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "2px", border:'1px dashed #1B52C4', height: "186px", padding: "30px" }}>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Student Name
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    Okoro Kingsley
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Department
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    Science Laboratory Technology
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Status
                                </label>
                               <img src={badge}/>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Collection
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    School Fees
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Year
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    2021 - 2022
                                </p>
                            </div>
                        </div>


                        <div className="row" style={{ marginTop: "46px" }}>
                        <div className="col-sm-4">
                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}>
                                    <img src={printer}/>&nbsp; Print Receipt &nbsp;
                                </button>
                            </div>
                            <div className="col-sm-12 col-xl-2">
                                <p onClick={this.closeCommitted} style={{ fontSize: "12px", marginTop:"10px", cursor:'pointer' }} className="drk-text manrope-text">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                {isLoading ? <ClickLoader/> : null}
                            </div>
                            
                        </div>
                    </div>
                </Modal>

                
               

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CallInvoice);
