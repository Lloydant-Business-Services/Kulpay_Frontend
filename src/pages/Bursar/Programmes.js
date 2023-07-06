import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/activeBadge.svg";
import pendingBadge from "../../assets/images/pending.svg";
import NewVendor from "./NewVendor";
import { Fade } from "reactstrap";
import printer from "../../assets/images/print.svg";
import toast, { Toaster } from "react-hot-toast";
import $ from "jquery";
import Endpoint from "../../utils/endpoint";
import {updateStorage, updateBordingLocal} from "../../utils/auth";
import { boardingStatus } from "../../utils/Identifiers";

import filterIcon from "../../assets/images/filterIcon.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import logo from "../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";
import { Table } from "antd";
import { Modal, Button } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";


const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Programme Name", dataIndex: "school", key: "school" },
    { title: "Action", dataIndex: "action", key: "action" },
   
];

const data = [
    {
        key: 1,
        id: "ADM221-10",
        school: "School of Management Science",
        departments: "34 Departments",
        collection: "23",
        inflows: "₦ 5,600,000",
        action: (
            <div style={{cursor:'pointer'}}>
                <i className="fa fa-ellipsis-v"/>
            </div>
        ),
        description: (
            <div className="container">
                <div className="row" style={{ paddingTop: "10px", marginLeft:'20px' }}>
                    <div className="col-sm-1">
                        
                    </div>
                    <div className="col-sm-4">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            Departments
                        </p>
                        
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            No. of Students
                        </p>
                        
                    </div>
                    <div className="col-sm-2">
                        <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                            Expected Inflow
                        </p>
                       
                    </div>
                   
                </div>

                {/* Rows */}

                <div className="row" style={{ paddingTop: "2px", marginLeft:'20px' }}>
                    <div className="col-sm-1">
                       
                    </div>
                    <div className="col-sm-4">
                        <p className="manrope-light" style={{ fontSize: "13px", color: "#000" }}>
                            Banking and Finance
                        </p>
                       
                    </div>
                    <div className="col-sm-2">
                    <p className="manrope-light" style={{ fontSize: "13px", color: "#000" }}>
                            14
                        </p>
                        
                    </div>
                    <div className="col-sm-2">
                    <p className="manrope-light" style={{ fontSize: "13px", color: "#000" }}>
                    ₦ 322,600.00
                        </p>
                       
                    </div>
                   
                </div>

                
            </div>
        ),
    },
   
];

class Programmes extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        proposeArr:[]
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

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false, proposeArr:[] });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false, pageIgnite: false, facultyModal:false, proposeArr:[] });
    };

    promptCommitInvoice = () => {
        if(this.state.vendor_name == null){
            this.loadDataError("Select a School/Department to continue")
            return;
        }
        this.setState({
            isLoading:true
        });
const payLoad ={
        "name": this.state.vendor_name,
        "active": true,
        "institutionId": this.state.payLoad.institutionId
}
        Endpoint.addVendor(payLoad)
        .then((res) => {
            console.log(res.data)
            if(res.data.id > 0){
                this.setState({isLoading:false, invoiceCommited:true, pageIgnite:false})
                this.loadDataFromServer();
            }
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError("Error saving vendor! Check that your connection is active");
            this.setState({isLoading:false})
        });
    };

    addFacultySchool = () => {
        if(!this.state.proposeArr || this.state.proposeArr.length <= 0){
            this.loadDataError("Select Programme(s) to continue")
            return;
        }
        this.setState({
            isLoading:true
        });
        const payLoad ={

            "programmeIds": this.state.proposeArr,
            "institutionId": this.state.payLoad.institutionId
            
        }
        Endpoint.postInstitutionProgrammes(payLoad)
        .then((res) => {
            console.log(res.data)
           

            this.initiateUpdateOnboardStatus(this.state.payLoad.personId, boardingStatus.Department)
            // if(this.state.payLoad?.onboardingStatus < boardingStatus.Collection){
            //     window.location.reload(true)
            // }
                this.setState({isLoading:false, facultyAdded:true, pageIgnite:false, facultyModal:false, proposeArr:[]})
                this.loadDataFromServer();
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError("Error saving programme. Check that your connection is active");
            this.setState({isLoading:false})
        });
    };

initiateUpdateOnboardStatus = (personId, status) => {
    Endpoint.resolveOnboarding(personId, status)
    .then((res) => {
        console.log(res, "status")
        updateBordingLocal(boardingStatus.Department)
    })
    .catch((err) => {
        console.log(err)
    })
}

    addDepartments = () => {
        if(this.state.proposeArr == null || this.state.proposeArr?.length <= 0){
            this.loadDataError("Select Departments to continue")
            return;
        }
        this.setState({
            isLoading:true
        });
        const payLoad = {

            "departmentIds": this.state.proposeArr,
              "institutionId": this.state.payLoad.institutionId,
              "institutionFacultyId": this.state.school_faculty
            
        }
        Endpoint.postInstitutionDepartments(payLoad)
        .then((res) => {
            console.log(res.data)
                this.setState({isLoading:false, pageIgnite:false, facultyModal:false,invoiceCommited:true, proposeArr:[]})
                this.loadDataFromServer();
        })
        .catch((error) => {
            console.log(error)
            this.loadDataError("Error saving faculties. Check that your connection is active");
            this.setState({isLoading:false})
        });
    };
    getAllFaculties = () => {
        Endpoint.getAllProgrammes()
            .then((res) => {
                // console.log(res.data)
                this.setState({allFacultyList: res.data})
                
            })
            .catch((error) => {
                console.log(error)
                this.setState({isLoading:false})
            });
        
    }
    getAllDepartments = () => {
        Endpoint.getAllDepartments()
            .then((res) => {
                // console.log(res.data)
                this.setState({allDepartmentList: res.data})
                
            })
            .catch((error) => {
                console.log(error)
                this.setState({isLoading:false})
            });
        
    }
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
            facultyAdded:false
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
        Endpoint.getInstitutionProgramme(this.state.payLoad?.institutionId, true)
            .then((res) => {
                console.log(res)
                var mappedData = res.data.map((x, i) => {
                    return {
                        key: i + 1,
                        id: x.id,
                        school: x.programmeName.toUpperCase(),
                   
                        action: (
                            <div style={{cursor:'pointer'}}>
                                <i className="fa fa-ellipsis-v"/>
                            </div>
                        )
                    };
                });
                this.setState({
                    instFaculties: mappedData,
                });
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
                console.log(error, "error")
                $("#preloader").delay(450).fadeOut("slow");

            });

        this.getAllFaculties()
        this.getAllDepartments()

    };

    toggleDeptList = () => {
        $("#deptList").toggle('slow')
        
    }

    toggleSchoolList = () => {
        $("#schoolList").toggle('slow')

    }
    showFacultyModal = () => {
        this.setState({
            facultyModal:true
        })
    }

    resolveSelect = (id) => {
        //let proposeArr = [];
        var check = this.state.proposeArr.includes(id);
        if (check) {
            var lists = this.state.proposeArr.filter((x) => {
                return x != id;
            });
            //this.state.proposeArr = lists;
            this.setState({proposeArr:lists})
            setTimeout(() => {
                console.log(this.state.proposeArr) 
            }, 2000);
        } else {
            this.state.proposeArr.push(id);
            setTimeout(() => {
                console.log(this.state.proposeArr) 
            }, 2000);
        }
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
        const { isMobile, visible, loading, allDepartmentList, value, isLoading, invoiceCommited, facultyAdded, allFacultyList } = this.state;

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
                    <div className="container-fluid py-5 mt-4" >
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "28px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Institution Programmes
                                    </h1>
                                    
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showFacultyModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add Programme(s)
                                    </button>
                                    {/* <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Add Department
                                    </button> */}
                                </div>
                            </div>

                            {/* Add School/Department Modal Starts Here */}
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 600 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add School/Department
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                This process involves you selecting a faculty/school as presented and then proceed to selecting department(s) you want domiciled under faculty/school selected.

                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    School/Faculty
                                                </label>
                                                <br />
                                                {/* <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} /> */}
                                                <select className="form-control" name="school_faculty" onChange={this.handleInput}>
                                                <option>Select School/faculty</option>
                                                    {this.state.instFaculties && this.state.instFaculties.map(x => {
                                                        return(
                                                            <option value={x.id}>{x.school}</option>

                                                        )

                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Department Drop Down Starts Here */}
                                    <div className="row" style={{ marginTop: "7px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Departments
                                                </label>
                                                <br />
                                                
                                                <select className="form-control" onClick={this.toggleDeptList}>
                                                   <option>Select Departments</option>
                                                </select>
                                               
                                            </div>
                                        </div>
                                {/* {this.state.showDepartmentList ? <Fade> */}

                                        <div className="col-sm-10" id="deptList" style={{marginTop:'-17px', display:'none'}}>
                                            <div className="form-group" style={{padding:'13px', border:'1px solid #d9d9d9', maxHeight:'270px', overflowY:'scroll'}}>
                                                {allDepartmentList && allDepartmentList.map(x => {
                                                    return(
                                                        <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                        <input type="checkbox" onChange={() => this.resolveSelect(x.id)}/> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                     </p>
                                                    )
                                                })}
                                              

                                               
                                               
                                               
                                            </div>
                                        </div>
                                {/* </Fade> : null} */}

                                    </div>
                                    {/* Department Drop Down Ends Here */}

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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.addDepartments}>
                                                   Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            {/* Add School/Department Modal Ends Here */}


                          





                                {/* Add School Modal Starts Here */}
                                <Modal visible={this.state.facultyModal ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 600 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Programme
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. */}


                                                Select one or more programme applicaple to your institution from the pool presented below
                                            </p>
                                        </div>
                                    </div>

                                  

                                      {/* Faculty Drop Down Starts Here */}
                                      <div className="row" style={{ marginTop: "7px" }}>
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Select Programme
                                                </label>
                                                <br />
                                                
                                                <select className="form-control" onClick={this.toggleSchoolList}>
                                                   <option>Select School/Faculties</option>
                                                </select>
                                               
                                            </div>
                                        </div>
                                        <div className="col-sm-10" id="schoolList" style={{marginTop:'-17px', display:'none'}}>
                                        <div className="form-group" style={{padding:'13px', border:'1px solid #d9d9d9', maxHeight:'270px', overflowY:'scroll'}}>
                                {allFacultyList && allFacultyList.map(x => {
                                    return(
                                        
                                            <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                               <input type="checkbox" onChange={() => this.resolveSelect(x.id)}/> &nbsp; &nbsp; {x.name}
                                            </p>

                                    )
                                    
                                })}
                                   </div>
                                    </div>

                                     

                                    </div>
                                    {/* Faculty Drop Down Ends Here */}

                              

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
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.addFacultySchool}>
                                                   Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            {/* Add School Modal Ends Here */}




                            <Modal visible={facultyAdded} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 482 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                                        Programme Added!
                                    </p>

                                    {/* <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Faculty/School was successfully added.
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
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px", padding:"10px" }} onClick={this.closeCommitted}>
                                                Ok &nbsp;
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
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.instFaculties}
                            className="manrope-text-light table-responsive mt-3"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default Programmes;
