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
    { title: "Departments", dataIndex: "name", key: "name" },
    { title: "Action", dataIndex: "action", key: "action" },
   
];
const columnsFaculty = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "School/Faculty", dataIndex: "name", key: "name" },
    //{ title: "Departments", dataIndex: "name", key: "name" },
    { title: "Action", dataIndex: "action", key: "action" },
   
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
const compKeys = {
    FACULTY:"_FACULTY_",
    DEPT: "_DEPT_"
}
class ManageFacultyDepartments extends Component {
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

    newDepartment = () => {
        if(this.state.department_name == null){
            this.loadDataError("Enter Department Name")
            return;
        }
        this.setState({
            isLoading:true
        });
const payLoad ={
        "name": this.state.department_name,
        "active": true
}
        Endpoint.addDepartment(payLoad)
        .then((res) => {
            console.log(res.data)
            if(res.data.id > 0){
                this.setState({commitName:'Department', isLoading:false, invoiceCommited:true, pageIgnite:false})
                this.loadDataFromServer();
            }
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError(error.statusText);
            this.setState({isLoading:false})
        });
    };

    newFaculty = () => {
        if(this.state.faculty_name == null){
            this.loadDataError("Enter Faculty Name")
            return;
        }
        this.setState({
            isLoading:true
        });
const payLoad ={
        "name": this.state.faculty_name,
        "slug": this.state.faculty_name.trim().toLowerCase(),
        "active": true
}
        Endpoint.addFaculty(payLoad)
        .then((res) => {
            console.log(res.data)
            if(res.data.id > 0){
                this.setState({addFaulty:false, commitName:'Faculty/School', isLoading:false, invoiceCommited:true, pageIgnite:false})
                this.loadDataFromServer(compKeys.FACULTY);
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
    callback = (key) => {
        if(key == compKeys.DEPT){
            this.setState({dataSet: columns, activeKey:key})
            this.loadDataFromServer(key)
        }
        else if(key == compKeys.FACULTY){
            this.setState({dataSet: columnsFaculty, activeKey:key})
            this.loadFaculties(key)
        }
        // this.setState({activeKey:key})
        
        console.log(key);
      }
      loadFaculties = () => {
        $("#preloader").fadeIn();
        Endpoint.getFaculties()
            .then((res) => {
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        name: x.name.toUpperCase(),
                        school: "-",
                        action:  (
                        <p style={{ fontSize: "13px" }}>
                        {" "}
                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                        </p>
                    ),
                    description: (
                           <> 
                        {/* <div className="container-fluid">
                         
                           
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
                        </div> */}
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
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        this.setState({dataSet:columns, activeKey:stateKeys.DEPT})
        Endpoint.getDepartments()
            .then((res) => {
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        name: x.name.toUpperCase(),
                        school: "-",
                        action:  (
                        <p style={{ fontSize: "13px" }}>
                        {" "}
                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                        </p>
                    ),
                    description: (
                          <>  
                        {/* <div className="container-fluid">
                         
                           
                            <div className="row" style={{ paddingTop: "1px" }}>
                                <div className="col-sm-4">
                                    <div class="form-group">
                                        <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                            Departments
                                        </label>
                                        <p style={{ fontSize: "13px" }}>{x.name} Business Services</p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
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
                                </div>
                            </div>
                        </div> */}
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
                                    Departments/Faculties/School
                                    </h1>                                  
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    {this.state.activeKey == stateKeys.DEPT ? <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add Department
                                    </button> : <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showFacultyModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add School/Faculty
                                    </button>}
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Department
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Add system department
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Department Name
                                                </label>
                                                <br />
                                                <input type="text" name="department_name" className="form-control" placeholder="Enter department name" onChange={this.handleInput} />
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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.newDepartment}>
                                                    Add Department
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>

                            <Modal visible={this.state.addFaulty ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 500 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Faculty/School
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                               Add system faculty/school.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Faculty Name
                                                </label>
                                                <br />
                                                <input type="text" name="faculty_name" className="form-control" placeholder="Enter faculty name" onChange={this.handleInput} />
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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.newFaculty}>
                                                    Add Faculty
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
                        <Tabs defaultActiveKey={compKeys.DEPT} onChange={this.callback} className="manrope-text-light" style={{fontSize:'10px', color:'grey'}}>
    <TabPane tab="Departments" key={compKeys.DEPT}>
    </TabPane>
    <TabPane tab="Faculties/Schools" key={compKeys.FACULTY}>
    </TabPane>
    
  </Tabs>
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

export default ManageFacultyDepartments;
