import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import filterIcon from "../../assets/images/filterIcon.svg";

import printer from "../../assets/images/print.svg";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import * as Unicons from "@iconscout/react-unicons";
import Endpoint from "../../utils/endpoint";
import toast, { Toaster } from "react-hot-toast";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";
import { resolveDateTime } from "../../utils/helpers";
import { Modal, Button } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";




class NewVendor extends Component {
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
    handleInput = (event) => {
       
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({[name]: value})
       
    }
    componentDidMount() {
        
       
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        this.loadDataFromServer();
    }
    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited} = this.state;
        return (
            <>
               <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                Vendors
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
                                <i className="fa fa-plus"/> &nbsp; Vendor
                            </button>
                        </div>
                    </div>
                <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                           Add Vendor
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-12">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        Vendor Name
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput}/>
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
                               {this.state.isLoading ? <div style={{float:'right', paddingRight:'30px'}} className="manrope-text">
                               <ClickLoader/> Processing...
                            </div> :  <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                    Add Vendor
                                </button>}
                               
                                
                            </div>
                        </div>
                    </div>
                </Modal>

                
                <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                    <div className="modal-top text-center">
                        <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                        Vendor added successfully
                        </p>

                        <div className="row">
                            <div className="col-sm-12">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                Vendor was successfully added. Complete the vendor profile by adding bank account details.
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
                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.closeCommitted}>
                                    View Vendors &nbsp;
                                </button>
                                
                            </div>
                            
                            
                        </div>
                        
                    </div>
                </Modal>

                
               

            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewVendor);
