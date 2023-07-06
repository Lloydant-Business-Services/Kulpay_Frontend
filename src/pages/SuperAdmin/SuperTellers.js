import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/activeBadge.svg";
import inactiveBadge from "../../assets/images/inactiveBadge.svg";
import pendingBadge from "../../assets/images/pending.svg";
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
import { role } from "../../utils/Identifiers";
const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Status", dataIndex: "status", key: "status" },
];

const data = [
    {
        key: 1,
        id: "ADM221-10",
        collection: "School of health fees",
        department: "Admin",
        pending: "0.00",
        total: "₦ 2,250.000",
        status: (
            <div>
                <img src={badge} />
            </div>
        ),
        description: (
            <div className="container">
                <div className="row" style={{ paddingTop: "10px" }}>
                    <div className="col-sm-6">
                        <p className="manrope-text" style={{ fontSize: "20px" }}>
                            School of health fees
                        </p>
                        <p className="manrope-text-light" style={{ fontSize: "14px", color: "#84818A", marginTop: "-20px" }}>
                            Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span>
                        </p>
                    </div>

                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            NO OF STUDENTS
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            5632
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            TOTAL INFLOW
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            ₦120,630
                        </p>
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            EXPECTED INFLOW
                        </p>
                        <p className="manrope-text drk-text" style={{ fontSize: "20px", color: "#84818A", marginTop: "-10px" }}>
                            ₦560,630
                        </p>
                    </div>
                </div>
            </div>
        ),
    },
];

class SuperTellers extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
    };
    showModal = () => {
        this.setState({
            //visible: true,
            ignite: true,
        });
    };
    nChange = (value) => {
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

    loadDataSuccess = (succ) =>
        toast.success(succ, {
            style: {
                border: "1px solid #167c6a",
                padding: "16px",
                background: "#167c6a",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#167c6a",
            },
            duration: 5000,
        });

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
        this.setState({ visible: false, pageIgnite: false });
    };

    getTellerBank = () => {
        Endpoint.getTellerBanks()
            .then((res) => {
                console.log(res.data);
                this.setState({
                    tellerBankList: res.data,
                });
            })
            .catch((err) => {
                console.log(err);
                this.loadDataError("Error!" + err);
            });
    };
    promptCommitInvoice = () => {
        if (this.state.last_name == null || this.state.first_name == null || this.state.email_address == null || this.state.phone_number == null || this.state.bank_select == null) {
            this.loadDataError("Fill in required fields");
            console.log(this.state);
            return;
        }
        this.setState({
            isLoading: true,
        });
        const state = this.state;
        const payLoad = {
            person: {
                lastName: state.last_name,
                firstName: state.first_name,
                otherName: state.other_name,
                email: state.email_address,
                phoneNo: state.phone_number,
                address: state.address,
                active: true,
            },
            tellerBankId: parseInt(state.bank_select),
            roleId: role.superadmin,
            loggedInUserId: state.payLoad.userId,
        };
        Endpoint.addTellerUser(payLoad)
            .then((res) => {
                console.log(res.data);
                if (res.data) {
                    this.setState({ isLoading: false, pageIgnite: false });
                    this.loadDataSuccess("Super Teller added successfully!");
                    this.loadDataFromServer();
                }
            })
            .catch((error) => {
                console.log(error);
                this.loadDataError("Error saving vendor! Check that your connection is active");
                this.setState({ isLoading: false });
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
        var _all = "?AllUsers=true";
        $("#preloader").fadeIn();
        Endpoint.getAllUsers(_all)
            .then((res) => {
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        fullname: x.fullName.toUpperCase(),
                        email: x.email,
                        phone: x.phoneNo,
                        status: x.active ? <img src={badge} /> : <img src={inactiveBadge} />,
                        description:
                            x.institutionName != null ? (
                                <div className="container-fluid">
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-sm-6">
                                            <p className="manrope-text" style={{ fontSize: "17px" }}>
                                                {x.name}
                                            </p>
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "-20px" }}>
                                                Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span>
                                            </p>
                                        </div>

                                        <div className="col-sm-2">
                                            <p className="manrope-text" style={{ fontSize: "10px", color: "#84818A" }}>
                                                NO OF STUDENTS
                                            </p>
                                            <p className="manrope-text drk-text" style={{ fontSize: "16px", color: "#84818A", marginTop: "-10px" }}>
                                                0
                                            </p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="manrope-text" style={{ fontSize: "10px", color: "#84818A" }}>
                                                TOTAL INFLOW
                                            </p>
                                            <p className="manrope-text drk-text" style={{ fontSize: "16px", color: "#84818A", marginTop: "-10px" }}>
                                                ₦0.00
                                            </p>
                                        </div>
                                        <div className="col-sm-2">
                                            <p className="manrope-text" style={{ fontSize: "10px", color: "#84818A" }}>
                                                EXPECTED INFLOW
                                            </p>
                                            <p className="manrope-text drk-text" style={{ fontSize: "16px", color: "#84818A", marginTop: "-10px" }}>
                                                ₦0.00
                                            </p>
                                        </div>
                                    </div>
                                    <hr style={{ marginTop: "0rem", marginBottom: "13px" }} />
                                    <div className="row" style={{ paddingTop: "1px" }}>
                                        <div className="col-sm-2">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                    Account Name
                                                </label>
                                                <p style={{ fontSize: "13px" }}>{x.name} Business Services</p>
                                            </div>
                                        </div>
                                        <div className="col-sm-5">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                    Account Number
                                                </label>
                                                <p style={{ fontSize: "13px" }}>02363782</p>
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
                                        </div>
                                    </div>
                                </div>
                            ) : null,
                    };
                });
                this.setState({
                    allVendors: mappedData,
                });
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    componentDidMount() {
        this.loadDataFromServer();
        this.getTellerBank();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited } = this.state;

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
                    <div className="container-fluid py-5">
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Super Tellers
                                    </h1>
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Super Tellers
                                    </button>
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 800 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Super Teller
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Create/Activate Super Teller
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    First Name
                                                </label>
                                                <br />
                                                <input type="text" name="first_name" className="form-control" onChange={this.handleInput} />
                                                {/* <small style={{color:'red'}}>First name is a required field <i className="fa fa-warning"/></small> */}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Last Name
                                                </label>
                                                <br />
                                                <input type="text" name="last_name" className="form-control" onChange={this.handleInput} />
                                                {/* <small style={{color:'red'}}>last name is a required field <i className="fa fa-warning"/></small> */}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Other Name
                                                </label>
                                                <br />
                                                <input type="text" name="other_name" className="form-control" onChange={this.handleInput} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Email address
                                                </label>
                                                <br />
                                                <input type="text" name="email_address" className="form-control" onChange={this.handleInput} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Phone
                                                </label>
                                                <br />
                                                <input type="number" name="phone_number" className="form-control" onChange={this.handleInput} />
                                                {/* <small style={{color:'red'}}>Phone number is invalid <i className="fa fa-warning"/></small> */}
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Address
                                                </label>
                                                <br />
                                                <input type="text" name="address" className="form-control" onChange={this.handleInput} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Super Teller Bank
                                                </label>
                                                <br />
                                                <select className="form-control manrope-text-light" name="bank_select" onChange={this.handleInput}>
                                                    <option>Select Super Teller Bank</option>
                                                    {this.state.tellerBankList &&
                                                        this.state.tellerBankList.map((x, i) => {
                                                            return (
                                                                <option className="form-control" value={x.id}>
                                                                    {x.tellerBankName}
                                                                </option>
                                                            );
                                                        })}
                                                </select>
                                                {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                                {/* <input style={{height:'40px', fontSize:'13px'}} type="text" name="collection_name" className="form-control" placeholder="Enter collection name"/> */}
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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                                    Save Super Teller
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                                        Added successfully!
                                    </p>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Super Teller was successfully added.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.closeCommitted}>
                                                View Vendors &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                        <br />
                        <br />
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.allVendors}
                            className="manrope-text table-responsive"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default SuperTellers;
