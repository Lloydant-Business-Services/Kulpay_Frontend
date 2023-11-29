import React, { Component, useEffect } from "react";
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
import { Tabs, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { stateKeys, BASE_URL } from "../../redux/actions";
import { Select } from "antd";
const { TabPane } = Tabs;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Acount Number", dataIndex: "number", key: "number" },
    { title: "Action", dataIndex: "action", key: "action" },
];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //const isJpgOrPng = file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload PNG files!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}
class KulBankAccounts extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        allbanks: []
    };
    handleChange = (info) => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === "done") {
            console.log(info.file);
            getBase64(info.file.originFileObj, (imageUrl) =>
                this.setState({
                    imageUrl,
                    logoImg: info.file.originFileObj,
                    loading: false,
                })
            );
        }
    };
    // fetchKulAccounts = () => {
    //     Endpoint.getKulpayBankAccount()
    //     .then((res) => {
    //         console.log(res, '')
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }
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



    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false, addFaulty: false, onSuccess: false });
    };

    newPaymentGateway = () => {
        if (this.state.gateway_name == null || this.state.logoImg == null) {
            this.loadDataError("Gateway name and logo are required fields");
            return;
        }
        this.setState({
            isLoading: true,
        });
        let formData = new FormData();
        formData.append("Name", this.state.gateway_name);
        formData.append("Id", this.state.allGateways != null ? this.state.allGateways.length + 1 : 1);
        formData.append("File", this.state.logoImg);

        Endpoint.addPaymentGateway(formData)
            .then((res) => {
                console.log(res.data);
                if (res.data.id > 0) {
                    this.setState({ isLoading: false, pageIgnite: false });
                    this.loadDataFromServer();
                }
            })
            .catch((error) => {
                console.log(error);
                this.loadDataError(error.statusText);
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

    handleBankSelect = (event) => {
        this.setState({ bank_id: event });
    };


    addAccountNumber = () => {
        var payload = {
            accountName: this.state.accountName,
            accountNumber: this.state.accountNumber,
            bankId: this.state.bank_id
        }
        Endpoint.addAccountDetails(payload)
            .then((response) => {
                this.setState({
                    pageIgnite: false,
                    onSuccess: true

                })
                this.componentDidMount()
                console.log(response)
            })
            .catch((err) => {
                alert('Failed to save')
            })
    }

    getAllBanks = () => {
        Endpoint.getBank()
            .then((res) => {
                console.log(res.data, "banks")
                this.setState({
                    allbanks: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        this.setState({ dataSet: columns, activeKey: stateKeys.DEPT });
        Endpoint.getKulpayBankAccount()
            .then((res) => {
                console.log(res, 'RESPONSEEEE')
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        name: x.accountName.toUpperCase(),
                        number: x.accountNumber,
                        action: (
                            <p style={{ fontSize: "13px" }}>
                                {" "}
                                <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                            </p>
                        ),

                    };
                });
                this.setState({
                    allGateways: mappedData,
                });
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };
    componentDidMount() {
        this.loadDataFromServer();
        this.getAllBanks();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }



    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited, commitName, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );


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
                    <div className="container py-5">
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "27px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Kul Bank Accounts
                                    </h1>
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    {/* <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button> */}
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add a bank account
                                    </button>
                                </div>
                            </div>
                            <Modal open={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        New Account Details
                                    </p>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Account Name
                                                </label>
                                                <br />
                                                <input type="text" name="accountName" className="form-control" placeholder="Enter account name" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Account Number
                                                </label>
                                                <br />
                                                <input type="number" name="accountNumber" className="form-control" placeholder="Enter account Number" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Name
                                                </label>
                                                <br />
                                                <Select
                                                    showSearch
                                                    onChange={(e) => this.handleBankSelect(e)}
                                                    style={{
                                                        width: '100%',
                                                        height: '38px',
                                                        borderRadius: '0px',
                                                        // padding:'10px'
                                                    }}
                                                    placeholder="Search to Select"
                                                    optionFilterProp="children"
                                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                    filterSort={(optionA, optionB) =>
                                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    }
                                                    options={this.state.allbanks.map((item) => ({
                                                        value: item.id,
                                                        label: item.name,
                                                    }))}
                                                />
                                            </div>
                                        </div>


                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>

                                        <div className="col-sm-3">
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}
                                                    onClick={() => this.addAccountNumber()}>
                                                    Save Account Details
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal open={this.state.onSuccess} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "25px" }}>
                                        {commitName} added successfully!
                                    </p>


                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.handleCancel}>
                                                Continue &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                        <br />

                        <br />

                        <Table
                            columns={this.state.dataSet}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.allGateways}
                            className="manrope-text table-responsive mt-3"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default KulBankAccounts;