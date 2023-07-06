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
// import {bankList} from "../../utils/bankcodes";
import filterIcon from "../../assets/images/filterIcon.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import logo from "../../assets/images/17.png";
import { StageSpinner, CircleSpinner } from "react-spinners-kit";
import { Table } from "antd";
import { Modal, Button, Select } from "antd";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import kulCheck from "../../assets/images/kulCheck.svg";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import axios from "axios";

// import Select, { SelectChangeEvent } from '@mui/material/Select';


const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Beneficiary", dataIndex: "name", key: "name" },
    { title: "Date Created", dataIndex: "createdDate", key: "createdDate" },
    { title: "Inflows", dataIndex: "inflows", key: "inflows" },
    { title: "Outflows", dataIndex: "outflows", key: "outflows" },
    { title: "Status", dataIndex: "status", key: "status" },
    // { title: "Pending", dataIndex: "pending", key: "pending" },
    // { title: "Total", dataIndex: "total", key: "total" },
    //   {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: () => <a>Delete</a>,
    //   },
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

class Vendors extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        allbanks: [],
        account_name: ""
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
    handleBankSelect = (event) => {
        console.log(event)
        var splitEvent = event.split(":")
        console.log(splitEvent, "splitevent")
        if(splitEvent.length <= 0){
            return
        }
        this.setState({ bank_id: parseInt(splitEvent[0]), bank_code: splitEvent[1] });
    };
    promptCommitInvoice = () => {
        const payLoad ={
    
            "name": this.state.account_name,
            "accountNumber": this.state.account_number,
            "accountName": this.state.account_name,
            "bankId": this.state.bank_id,
            "institutionId": this.state.payLoad.institutionId,
            "isInstitutionAccount": this.state.isPrimaryVendor == "yes" ? true : false

    }
        console.log(payLoad)
        if(this.state.account_name == null || this.state.account_number == null|| this.state.bank_id == null){
            this.loadDataError("Enter vendor details")
            return;
        }
        this.setState({
            isLoading:true
        });
// const payLoad ={
    
//         "name": this.state.account_name,
//         "accountNumber": this.state.account_number,
//         "accountName": this.state.account_name,
//         "bankId": this.state.bank_id,
//         "institutionId": this.state.payLoad.institutionId
// }
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

    handleAccountNumberInput = (event) => {
        const acctValue = event.target.value;
        this.setState({
            account_number: acctValue
        })
        if(!isNaN(acctValue) && acctValue.length >= 10){
            this.setState({
                validating: true
            })
            this.validateAccountNumber(acctValue);
        }
        else{
            this.setState({
                validating: false,
                validationSuccess: false,
                validationFailiure:false,
                account_name:""
            })
        }
    };

    validateAccountNumber = (data) => {
        this.setState({
            validationSuccess: false,
            validationFailiure:false,
            account_name:""
        })
        Endpoint.accountNumberVerification(data, this.state.bank_code)
        .then((res) => {
            console.log(res.data?.data)
            if(res.data?.status){
                this.setState({
                    validating: false,
                    account_name: res.data?.data?.account_name,
                    validationSuccess: true
                })
            }
            else{
                this.setState({
                    validating: false,
                    validationFailiure:true
                })
            }
           
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                validating: false
            })
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
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        Endpoint.getAllVendorByInstitution(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "vendors")
                if(res.data != null && res.data.length > 0){
                    var mappedData = res.data.map((x, i) => {
                        return {
                            key: i + 1,
                            id: x.id,
                            name: <span>{x.name.toUpperCase()} &nbsp; &nbsp; {x.isInstitutionAccount ? <i className="fa fa-circle" style={{color:"green"}}/> : null}</span> ,
                            createdDate: x.createdDate != null ? x.createdDate.substring(0, 10) : "-",
                            inflows: "₦0.00",
                            outflows: "₦0.00",
                            status: <img src={badge} />,
                            description: (
                                <div className="container-fluid">
                                    <div className="row" style={{ paddingTop: "10px" }}>
                                        <div className="col-sm-6">
                                            <p className="manrope-text" style={{ fontSize: "17px" }}>
                                                {x.name}
                                            </p>
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "-20px" }}>
                                                {/* Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span> */}
                                                <span style={{ color: "#FFA043" }}>Vendor Details</span>
                                            </p>
                                        </div>
    
                                      
                                    </div>
                                    <hr style={{ marginTop: "0rem", marginBottom: "13px" }} />
                                    <div className="row" style={{ paddingTop: "1px" }}>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Account Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Account Number
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Bank Name
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div class="form-group">
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        &nbsp;
                                                    </label>
                                                    {/* <p style={{ fontSize: "13px" }}>
                                                        {" "}
                                                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                                    </p> */}
                                                </div>
                                            </div>
                                        </div>
                                    {x.bankDetailList && x.bankDetailList.map((m, n) => {
                                        return(
                                            <div className="row" style={{ paddingTop: "1px" }}>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                   
                                                    <p style={{ fontSize: "13px" }}>{m.accountName}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                    
                                                    <p style={{ fontSize: "13px" }}>{m.accountNumber}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-3">
                                                <div class="form-group">
                                                   
                                                    <p style={{ fontSize: "13px" }}>{m.bankName}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div class="form-group">
                                                    
                                                    <p style={{ fontSize: "13px" }}>
                                                        {" "}
                                                        <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        )
                                    })}
                                   
                                </div>
                            ),
                        };
                    });
                    this.setState({
                        allVendors: mappedData,
                    });
                }
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    toggleSchoolList = () => {
        $("#schoolList").toggle('slow')

    }
    duplicate = () => {
        var newObj = {
            vendorName: this.state.globalSelectName,
            itemValue: this.state.vendorBankDetailId,
            itemAmount: this.state.vendorAmount,
            itemBank: this.state.vendorBankDetails,
        };

        this.state.pushObjArr.push(newObj);
        //setTimeout(() => {
        console.log(this.state.pushObjArr);
        this.setState({
            pushObjArr: this.state.pushObjArr,
            // vendor_account_select: null,
            // vendor_select:null
        });
        //}, 1500);
        //     var i = 0;
    };
    componentDidMount() {
        this.loadDataFromServer();
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
                    <div className="container-fluid py-5 mt-4" >
                        {/* <NewVendor ignite={this.state.ignite} /> */}

                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        Beneficiaries
                                    </h1>
                                    
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; Beneficiary
                                    </button>
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "left" }}>
                                  <p className="manrope-light" style={{fontSize:"14px"}}>Beneficiaries marked &nbsp; <i className="fa fa-circle" style={{color:"green"}}/> &nbsp; are institution accounts</p>
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 800 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        Add Beneficiary
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Setup vendors/beneficiary for collections. Multiple Bank account details can be entered for a single vendor
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                       
                                        {/* <div className="col-sm-12 col-lg-4">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Acoount Name
                                                </label>
                                                <br />
                                                <input type="text" name="account_name" className="form-control" placeholder="vendor account name" onChange={this.handleInput} />
                                            </div>
                                        </div> */}
                                        <div className="col-sm-12 col-lg-6">
                                        <div className="form-group">
                                        <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Select Bank
                                                </label>
                                        <Select
      showSearch
     onChange={(e) => this.handleBankSelect(e)}
      style={{
        width: '100%',
        height: '41px',
        borderRadius:'0px'
      }}
      placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={this.state.allbanks.map((item) => ({
        value: item.id+":"+item.bankCode,
        label: item.name,
      }))}
    />
    </div>
{/* 
<Select
    showSearch
    style={{
      width: 200,
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
 
  /> */}
    
    {/* <div className="form-group">
    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Select Bank
                                                </label>
                                        <FormControl variant="outlined" fullWidth sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Select Bank</InputLabel>
                                            <Select
                                                
                                                onChange={this.handleBankSelect}
                                                label="Bank"
                                            >
                                                <MenuItem value="">
                                                    <em>Select Bank</em>
                                                </MenuItem>
                                                {this.state.allbanks && this.state.allbanks.map((x, i) => {
                                                    return(
                                                        <MenuItem value={x.id}>{x.name}</MenuItem>
                                                    )
                                                })}
                                                
                                                
                                            </Select>
                                        </FormControl>
                                            
                                        </div> */}
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Account Number
                                                </label>
                                                <br />
                                                <input type="text" name="account_number" className="form-control" placeholder="Enter vendor name" onChange={this.handleAccountNumberInput} />
                                             
                                              {this.state.validating ? <div className="row mt-1">
                                              <div className="col-1"><CircleSpinner color="green" backColor="#FFF" frontColor="#FFF" size={25} /></div>
                                                <div className="col-8"> <p style={{fontSize:"14px"}}> Validating account number...</p></div>
                                              </div> : null}

                                              {this.state.validationSuccess ? <div className="row mt-1">
                                                <div className="col-12"> <p className="" style={{fontSize:"16px", color:"green"}}>{this.state.account_name.toUpperCase()} <span><i className="fa fa-check"/></span></p></div>

                                              </div> : null}


                                              {this.state.validationFailiure ? <div className="row mt-1">
                                                <div className="col-12"> <p className="" style={{fontSize:"16px", color:"red"}}>Acount number validation error! <span><i className="fa fa-times"/></span></p></div>

                                              </div> : null}

                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-lg-12">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Vendor Name
                                                </label>
                                                <br />
                                                <input readOnly type="text" name="vendor_name" value={this.state.account_name.toUpperCase()} className="form-control" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-12">
                                           <p className="manrope">Primary Beneficiary (Institution account)? &nbsp; &nbsp; &nbsp; &nbsp; <span>Yes &nbsp;<input value={"yes"} onChange={this.handleInput} type={"radio"} name="isPrimaryVendor"/></span>
                                           &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span>No &nbsp;<input name="isPrimaryVendor" value={"no"} onChange={this.handleInput} defaultChecked type={"radio"}/></span>
                                           </p>
                                        </div>

                                    </div>
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-sm-12">
                                        {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                <>
                                                {/* <button
                                                className="btn btn-primary"
                                                style={{ border: "1px dashed #1B52C4", fontSize: "12px", width: "100%", padding:"14px" }}
                                                onClick={
                                                    this.promptCommitInvoice
                                                }
                                            >
                                                &nbsp; Validate Account Number
                                            </button> */}
                                             <button
                                             className="btn btn-primary mt-3 monte"
                                             disabled={this.state.validationSuccess ? false :  true}
                                             style={{ border: "1px dashed #1B52C4", fontSize: "15px", width: "100%", marginLeft:"0px", padding:"14px" }}
                                             onClick={
                                                 //this.resolveAddInputSection
                                                 this.promptCommitInvoice
                                             }
                                         >
                                             <i className="fa fa-save" /> &nbsp; Save Vendor
                                         </button>
                                         </>
                                            )}
                                           
                                        </div>
                                       
                                    </div>
                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-8">
                                            <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Close
                                            </p>
                                        </div>
                                        {/* <div className="col-sm-3">
                                            {this.state.isLoading ? (
                                                <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                    <ClickLoader /> Processing...
                                                </div>
                                            ) : (
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                                    Add Vendor
                                                </button>
                                            )}
                                        </div> */}
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
                                               Vender wouold now be available for selection on collection setup
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
                       
                        
                        <br/>
                        <br/>
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

export default Vendors;
