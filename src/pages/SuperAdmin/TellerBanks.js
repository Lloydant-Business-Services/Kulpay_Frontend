import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/activeBadge.svg";
import pendingBadge from "../../assets/images/pending.svg";
//import NewVendor from "./NewVendor";
import { Fade } from "reactstrap";
import printer from "../../assets/images/print.svg";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import Endpoint from "../../utils/endpoint";
import filterIcon from "../../assets/images/filterIcon.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import logo from "../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";
import { Table } from "antd";
import { Modal, Button } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";
import { Tabs } from 'antd';
import { stateKeys } from "../../redux/actions";
const { TabPane } = Tabs;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    //{ title: "School", dataIndex: "school", key: "school" },
    { title: "Teller Bank Name", dataIndex: "name", key: "name" },
    { title: "Action", dataIndex: "action", key: "action" },
   
];

class TellerBanks extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
    };
    showModal = () => {
        this.setState({
            //visible: true,
            ignite: true,
        });
    };
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
        toast.error(error, {
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

    showModal = () => {
        this.setState({
            pageIgnite: true,
        });
    };
    showFacultyModal = () => {
        this.setState({
            addFaulty: true,
            faculty_name:""
        });
    };
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false, addFaulty:false });
    };

    newTellerBank = () => {
        if(this.state.teller_bank_name == null || this.state.teller_bank_address == null){
            this.loadDataError("Teller bank name and address are required fields")
            return;
        }
        this.setState({
            isLoading:true
        });
const payLoad ={
        "tellerBankName": this.state.teller_bank_name,
        "address": this.state.teller_bank_address,
        "loggedInUserId": this.state.payLoad.userId
}
        Endpoint.addTellerBank(payLoad)
        .then((res) => {
            console.log(res.data)
            if(res.data.id > 0){
                this.setState({isLoading:false, pageIgnite:false})
                this.loadDataFromServer();
            }
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError(error.statusText);
            this.setState({isLoading:false})
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
            pageIgnite: false,
        });
    };
    handleCommit = () => {
        this.setState({
            isLoading: true,
        });
        setTimeout(() => {
            this.onClear();
            this.setState({
                isLoading: false,
                commitingInvoice: false,
                pageIgnite: false,
                invoiceCommited: true,
            });
        }, 2000);
    };
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ [name]: value });
    };
  

    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        this.setState({dataSet:columns, activeKey:stateKeys.DEPT})
        Endpoint.getTellerBanks()
            .then((res) => {
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        name: x.tellerBankName.toUpperCase(),
                        school: "-",
                        action:  (
                        <p style={{ fontSize: "13px" }}>
                        {" "}
                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                        </p>
                    ),
                    description: (
                          <>  
                        <div className="container-fluid">
                         
                           
                            <div className="row" style={{ paddingTop: "1px" }}>
                                <div className="col-sm-4">
                                    <div class="form-group">
                                        <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                            Address:
                                        </label>
                                        <p style={{ fontSize: "13px" }}>{x.address}</p>
                                    </div>
                                </div>
                                {/* <div className="col-sm-3">
                                    <div class="form-group">
                                        <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                            No. of institutions
                                        </label>
                                        <p style={{ fontSize: "13px" }}>12</p>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div class="form-group">
                                        <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                            &nbsp;
                                        </label>
                                        <p style={{ fontSize: "13px" }}>
                                            {" "}
                                            <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                        </p>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                       
                        </>
                    ),
                       
                    };
                });
                this.setState({
                    allDepartments: mappedData,
                });
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    componentDidMount() {
        this.loadDataFromServer();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited, commitName } = this.state;

        return (
            <>
            <Toaster position="top-center" reverseOrder={false} />

                <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                <Fade>
                    <div className="container py-5" >
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "27px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                    Teller Banks
                                    </h1>                                  
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                  <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add a Teller Bank
                                    </button> 
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        New System Teller Bank
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Add a teller bank
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Teller Bank Name
                                                </label>
                                                <br />
                                                <input type="text" name="teller_bank_name" className="form-control" placeholder="Enter teller bank name" onChange={this.handleInput} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Address
                                                </label>
                                                <br />
                                                <input type="text" name="teller_bank_address" className="form-control" placeholder="Enter teller bank address" onChange={this.handleInput} />
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
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.newTellerBank}>
                                                    Save Teller Bank
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                       

                            <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "25px" }}>
                                        {commitName} added successfully!
                                    </p>

                                    {/* <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                            {commitName} was successfully added!
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.closeCommitted}>
                                                Continue &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                        <br/>
                        
                        <br/>
                        {/* <div className="row">
                        <div className="col-sm-12">
&nbsp;
                        </div>
                        <div className="col-sm-12">
&nbsp;
                        </div>
                        </div> */}
                        <Table
                            columns={this.state.dataSet}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.allDepartments}
                            className="manrope-text table-responsive mt-3"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default TellerBanks;
