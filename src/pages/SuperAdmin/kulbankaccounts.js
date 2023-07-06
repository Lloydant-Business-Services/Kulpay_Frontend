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
import { Tabs, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { stateKeys, BASE_URL } from "../../redux/actions";
const { TabPane } = Tabs;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    //{ title: "School", dataIndex: "school", key: "school" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Logo", dataIndex: "logo", key: "logo" },
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
fetchKulAccounts = () => {
    Endpoint.getKulpayBankAccount()
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}
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
        this.setState({ visible: false, pageIgnite: false, addFaulty: false });
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

    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        this.setState({ dataSet: columns, activeKey: stateKeys.DEPT });
        Endpoint.getPaymentGateways()
            .then((res) => {
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        name: x.name.toUpperCase(),
                        logo:
                            x.logoLink != null ? (
                                <div>
                                    <img src={BASE_URL + x.logoLink} style={{ width: "50px" }} />
                                </div>
                            ) : (
                                "-"
                            ),
                        action: (
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
                                    </div>
                                </div>
                            </>
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
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add a bank account
                                    </button>
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        New Payment Gateway
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Add a payment gateway
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Name
                                                </label>
                                                <br />
                                                <input type="text" name="gateway_name" className="form-control" placeholder="Enter payment gateway name" onChange={this.handleInput} />
                                            </div>
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Logo
                                                </label>
                                                <br />
                                                <Upload
                                                    name="avatar"
                                                    listType="picture-card"
                                                    className="avatar-uploader"
                                                    showUploadList={false}
                                                    //{...props}
                                                    //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                    beforeUpload={beforeUpload}
                                                    onChange={this.handleChange}
                                                    customRequest={this.dummyRequest}
                                                >
                                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "100%" }} /> : uploadButton}
                                                </Upload>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-6">
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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.newPaymentGateway}>
                                                    Save Payment Gateway
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
