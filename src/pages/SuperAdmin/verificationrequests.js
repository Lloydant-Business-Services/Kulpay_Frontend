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
import { Modal, Button, Image } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";
import { Tabs } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { CloseCircleOutlined } from '@ant-design/icons';
import { MailOutlined } from '@ant-design/icons';
import { deCryptedData, encryptAes } from "../../utils/Aesencryption";
const { TabPane } = Tabs;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "fullname", key: "fullname" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Institution", dataIndex: "institution", key: "institution" },
    { title: "Phone", dataIndex: "phone", key: "phone" },

];



class VerificationRequests extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        defaultParam: "?AllUsers=true"
    };
    callback = (key) => {
        this.setState({ activeKey: key })
        this.loadDataFromServer(key)
        console.log(key);
    }
    ToggleUser = (userId, status) => {
        $("#preloader").fadeIn();
        let _status = status ? false : true;
        Endpoint.toggleUserStatus(userId, _status)
            .then((res) => {
                this.loadDataFromServer(this.state.activeKey ? this.state.activeKey : this.state.defaultParam);
            })
            .catch((error) => {
                console.log(error)
            });
    }



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

    showModal = (x) => {
        this.setState({
            pageIgnite: true,
            merchantData: x
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false, isRejected: false });
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
            isRejected: false
        });
    };
    showRejectModal = (data) => {
        this.setState({
            merchantData: data,
            isRejected: true
        })
    }
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
        //var _all = "?AllUsers=true"
        $("#preloader").fadeIn();
        Endpoint.getVerificationRequests()
            .then((res) => {
                const decryptPayload = deCryptedData(res.data)
                console.log(decryptPayload, "respo000000000")

                var mappedData = decryptPayload.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        fullname: x.FullName.toUpperCase(),
                        email: x.Email,
                        phone: x.PhoneNo,
                        institution: x.InstitutionName,
                        status: x.Active ? <img src={badge} style={{ cursor: 'pointer' }} onClick={() => this.ToggleUser(x.userId, x.active)} /> : <img src={inactiveBadge} style={{ cursor: 'pointer' }} onClick={() => this.ToggleUser(x.userId, x.active)} />,
                        description: 
                            <div className="container shadow" style={{ paddingBottom: '7vh', paddingTop: '3vh', paddingLeft: '5vh' }}>
                                <div className="row" style={{ paddingTop: "10px" }}>
                                    
                                    <div className="col-sm-3">
                                        <h3 className="quicksand_head">{x.InstitutionName.toUpperCase()}</h3>
                                    </div>
                                    <div className="col-sm-4">
                                        <p style={{ fontSize: '10px', fontWeight: '500' }}><span style={{ fontWeight: '700', color: '#c26b16' }}>School Adress:</span> {x.Address != null ? x.Address : "26b Chukwuka Utazi Street"}</p>
                                    </div>
                                    <div className="col-sm-5">
                                      
                                        <button type="button" onClick={() => this.showModal(x)} className="btn" style={{ backgroundColor: '#0c5736', borderColor:'#4eed4e', fontSize: '11px', color: '#fff' }}>Approve Request &nbsp; <CheckCircleOutlined style={{marginTop:'-5px', fontSize:'17px'}} /></button>
                                        <button onClick={() => this.showRejectModal(x)} className="btn btn" style={{ backgroundColor:'#882005', borderColor:'#FC3400', color:'#fff', fontSize:'11px'}}>Reject Request &nbsp;
                                            <CloseCircleOutlined style={{ marginTop: '-5px', fontSize: '17px' }} />
                                            </button>
                                        <button className="btn btn" style={{ backgroundColor: '#099a9c', borderColor: '#11d2ff', color: '#fff', fontSize: '11px' }}>Email user &nbsp;
                                            <MailOutlined style={{ marginTop: '-7px', fontSize: '17px' }} />
                                        </button>

                                        {/* </span> */}
                                        <br />
                                    </div>
                                </div>
                                <hr style={{ marginTop: "5px", marginBottom: "13px" }} />
                                <div className="col-sm-12 py-3">
                                    <p className="quicksand" style={{ fontSize: '14px' }}>Documents Provided</p>
                                </div>
                                <center>
                                  
                                    <div className="row" style={{ paddingTop: "0px", lineHeight: '0px', marginTop: "15px" }} id="accountDetailsView">

                                        <div className="col-sm-1">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}></label>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "12px", top: "-1px" }}>
                                                    Drivers License
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "12px", top: "-1px" }}>
                                                    24th June, 2023
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div class="form-group">
                                                <Image
                                                    style={{ marginTop: '-23px', fontSize: '10px' }}
                                                    width={60}
                                                    src="https://data.unhcr.org/images/documents/big_7a67bce943c9335c1693de0c5fee9b737c7105eb.jpg"
                                                    preview={{
                                                        src: 'https://data.unhcr.org/images/documents/big_7a67bce943c9335c1693de0c5fee9b737c7105eb.jpg',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="row" style={{ paddingTop: "0px", lineHeight: '0px', marginTop: "1px" }} id="accountDetailsView">

                                        <div className="col-sm-1">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}></label>
                                            </div>
                                        </div>

                                        <div className="col-sm-3">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "12px", top: "-1px" }}>
                                                    Authorization Letter
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-3">
                                            <div class="form-group">
                                                <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "12px", top: "-1px" }}>
                                                    24th June, 2023
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-2">
                                            <div class="form-group">
                                                <Image
                                                    style={{ marginTop: '-23px', fontSize: '10px' }}
                                                    width={60}
                                                    src="https://data.unhcr.org/images/documents/big_7a67bce943c9335c1693de0c5fee9b737c7105eb.jpg"
                                                    preview={{
                                                        src: 'https://data.unhcr.org/images/documents/big_7a67bce943c9335c1693de0c5fee9b737c7105eb.jpg',
                                                    }}
                                                />
                                            </div>
                                        </div>

                                    </div>
                                 
                                </center>

                            </div>
                      
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

    verificationAction = (data) => {
        // console.log(this.state.merchantData)
        this.setState({ isLoading : true})
        const payload = {
            "bursarPersonId": this.state.merchantData?.PersonId,
            "status": data
        }
        Endpoint.merchantVerificationAction(encryptAes(payload))
        .then((res) => {
            console.log(res)
            this.loadDataFromServer();
            this.setState({ isLoading: false, pageIgnite:false, isRejected:false })
        })
        .catch((err) => {
            console.log(err)
            this.setState({ isLoading: false })
        })
    }

    componentDidMount() {
        this.loadDataFromServer(this.state.defaultParam);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    //.
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
                    <div className="container-fluid py-5" >
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            {/* <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Verification Requests
                                    </h1>

                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" disabled style={{ marginTop: "20px", fontSize: "13px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add User
                                    </button>
                                    
                                </div>
                            </div> */}
                            <Modal open={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 400 : null}>
                                <div className="modal-top">
                                    {/* <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add User
                                    </p> */}

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Verify Request?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <p className="quicksand text-center" style={{ fontSize: '12px' }}>You are about to approve verification request for <span className="quicksand_head" style={{ fontSize: '14px' }}>Goodspeed Miracle </span> of the <span className="quicksand_head" style={{ fontSize: '14px' }}>ABIA STATE POLYTECHNIC.</span> Do you understand that once verified, this action cannot be revoked?</p>
                                        </div>
                                      
                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12">
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                    <button type="button" onClick={() => this.verificationAction(true)} className="btn manrope-text-light" style={{ fontSize: "12px", width: '100%', backgroundColor:'#289370', color:'#fff' }}>
                                                        Yes I Understand. Approve Request 
                                                        {/* &nbsp; <CheckCircleOutlined style={{ marginTop: '-10px', fontSize: '17px' }} /> */}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal open={this.state.isRejected} title={false} onCancel={this.handleCancel} footer={false} width={!isMobile ? 400 : null}>
                                <div className="modal-top">
                                    {/* <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add User
                                    </p> */}

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Reject Request?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <p className="quicksand text-center" style={{ fontSize: '12px' }}>You are about to <span style={{color:'red', fontWeight:'800'}}>reject</span> verification request for <span className="quicksand_head" style={{ fontSize: '14px' }}>Goodspeed Miracle </span> of the <span className="quicksand_head" style={{ fontSize: '14px' }}>ABIA STATE POLYTECHNIC.</span> Do you understand that once verified, this action cannot be revoked?</p>
                                        </div>

                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12">
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                    <button className="btn manrope-text-light" style={{ fontSize: "12px", width: '100%', backgroundColor: '#b91717', color: '#fff', borderColor: '#ff7c7c' }} onClick={() => this.verificationAction(false)}>
                                                    Yes I Understand. Reject Request
                                                    {/* &nbsp; <CheckCircleOutlined style={{ marginTop: '-10px', fontSize: '17px' }} /> */}
                                                </button>
                                            )}
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
                        <Tabs defaultActiveKey="?AllUsers=true" onChange={this.callback} className="manrope-text-light" style={{ fontSize: '10px', color: 'grey' }}>
                            <TabPane tab="Pending Requests" key="?AllUsers=true">
                            </TabPane>
                            <TabPane tab="Rejected" key="?IsInstitutionUsersOnly=true">
                            </TabPane>
                            <TabPane tab="Approved in the last month" key="?status=true">
                            </TabPane>
                            {/* <TabPane tab="Inactive users" key="?status=false">
                            </TabPane> */}
                        </Tabs>
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

export default VerificationRequests;
