import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../../assets/images/Label.svg";
import pendingBadge from "../../../assets/images/pending.svg";
//import NewCollection from "./NewCollection";
import { Fade } from "reactstrap";
//import printer from "../../assets/images/print.svg";
import $ from "jquery";
import Endpoint from "../../../utils/endpoint";
import { Modal, Button } from "antd";
import kulCheck from "../../../assets/images/kulCheck.svg";
import filterIcon from "../../../assets/images/filterIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { Table } from "antd";
import {currencyFormat} from "../../../utils/helpers"
import logo from "../../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import ClickLoader from "../../../components/Loader/PageLoader/ClickLoader";
import QueueAnim from "rc-queue-anim";
import { stateKeys, BASE_URL } from "../../../redux/actions";


const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Collection", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Collection Key", dataIndex: "collectionKey", key: "collectionKey" },
    { title: "Date Created", dataIndex: "createdDate", key: "createdDate" },
    { title: "Fixed Amount?", dataIndex: "fixAmount", key: "fixAmount" },
    { title: "Status", dataIndex: "status", key: "status" },
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
    {
        key: 2,
        id: "ADM221-10",
        collection: "Hostel B accomodation",
        department: "Hostel",
        pending: "₦ 500.000",
        total: "₦ 4,250.000",
        status: (
            <div>
                <img src={pendingBadge} />
            </div>
        ),
        description: (
            <div className="container">
                <div className="row" style={{ paddingTop: "10px" }}>
                    <div className="col-sm-6">
                        <p className="manrope-text" style={{ fontSize: "20px" }}>
                            Hostel B accomodation
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
    {
        key: 3,
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
    {
        key: 4,
        id: "ADM221-10",
        collection: "Hostel B accomodation",
        department: "Hostel",
        pending: "₦ 500.000",
        total: "₦ 4,250.000",
        status: (
            <div>
                <img src={pendingBadge} />
            </div>
        ),
        description: (
            <div className="container">
                <div className="row" style={{ paddingTop: "10px" }}>
                    <div className="col-sm-6">
                        <p className="manrope-text" style={{ fontSize: "20px" }}>
                            Hostel B accomodation
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
class SettlementReport extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        // pageIgnite:false,
        //paymentSetup: true,
        cloneCount:0,
        globalSelectName: null,
        vendor_select: null,
        pushObjArr: [],
        dynamicColumns: [
            { title: "SN", dataIndex: "key", key: "key" },
            { title: "Collection", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { title: "Collection Key", dataIndex: "collectionKey", key: "collectionKey" },
            { title: "Date Created", dataIndex: "createdDate", key: "createdDate" },
            { title: "Fixed Amount?", dataIndex: "fixAmount", key: "fixAmount" },
            { title: "Status", dataIndex: "status", key: "status" },
           
        ]
    };

    addCollectionSplit = (collectionId, collectionName) => {
        this.setState({
            collection_name: collectionName,
            paymentSetup:true,
            globalCollectionId: collectionId
        })
    }
    loadPaymentGateways = () => {
        Endpoint.getPaymentGateways()
        .then((res) => {
            var mappedData = res.data.map((x, i) => {
                return {
                    key: i + 1,
                    id: x.id,
                    name: x.name.toUpperCase(),
                    logo: x.logoLink,
                        // x.logoLink != null ? (
                        //     <div>
                        //         <img src={BASE_URL + x.logoLink} style={{ width: "50px" }} />
                        //     </div>
                        // ) : (
                        //     "-"
                        // ),
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
            setTimeout(() => {
                console.log(this.state.allGateways, "gateways")
            }, 2000)
            //$("#preloader").delay(450).fadeOut("slow");
        })
        .catch((error) => {
            //loadDataError(error, this);
        });
    }
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        Endpoint.getInstitutionCollections(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res.data, "rss")
                var mappedData = res.data.map((x, i) => {
                    let isComplete = false;
                    let status = 0;
                    Endpoint.getInstitutionCollectionsFeeSplit(x.collectionId)
                        .then((res) => {
                            //alert("1")
                            console.log(res.data, "raw data");
                            console.log(res, " data");
                            if (res.data.length > 0) {
                                isComplete = true;
                                status = res.status;
                                //alert(isComplete)
                                this.setState({ collectionSplits: res.data });
                                console.log(this.state.collectionSplits, "state");
                                return <img src={badge} />;
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                            //this.loadDataError("Error saving vendor! Check that your connection is active");
                            //this.setState({isLoading:false})
                        });

                    return {
                        key: i + 1,
                        id: x.collectionId,
                        name: x.collectionName.toUpperCase(),
                        createdDate: x.createdDate != null ? x.createdDate.substring(0, 10) : "-",
                        amount:  x.amount != null ? currencyFormat(x.amount) : "-",
                        collectionKey: x.collectionKey,
                        fixAmount: x.fixAmount ? "Yes" : "No",
                        status: (
                            <img src={badge} />
                            // setTimeout(() => {
                            //     return isComplete ? <img src={badge} /> : <img src={pendingBadge} />

                            // }, 2000)
                        ),
                        description: (
                            <div className="container-fluid">
                                <div className="row" style={{ paddingTop: "10px" }}>
                                    <div className="col-sm-6">
                                        <p className="manrope-text" style={{ fontSize: "17px" }}>
                                            {x.collectionName}
                                        </p>
                                        <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "-20px" }}>
                                            Your payment status for this month is payed for <span style={{ color: "#FFA043" }}>65%</span>
                                            <br/>
                                            <br/>
                                            <span style={{ color: "#FFA043", cursor:'pointer'}} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>Add Collection Split &nbsp; <i className="fa fa-plus"/></span>
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
                                <div className="col-sm-1">
                                        <div class="form-group">
                                            <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                
                                            </label>
                                            {/* <p style={{ fontSize: "13px" }}>{x.name} Business Services</p> */}
                                        </div>
                                    </div>
                                 
                                    <div className="col-sm-3">
                                        <div class="form-group">
                                            <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                Account Name
                                            </label>
                                            {/* <p style={{ fontSize: "13px" }}>{x.name} Business Services</p> */}
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div class="form-group">
                                            <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                Account Number
                                            </label>
                                            {/* <p style={{ fontSize: "13px" }}>02363782</p> */}
                                        </div>
                                    </div>
                                    <div className="col-sm-2">
                                        <div class="form-group">
                                            <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                Split Amount
                                            </label>
                                            {/* <p style={{ fontSize: "13px" }}>N21,000</p> */}
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

                        {x.collectionSplitList && x.collectionSplitList.map((t, i) => {
                            return(
                                <div className="row" style={{ paddingTop: "1px" }}>
                                     <div className="col-sm-1">
                                    <div class="form-group">
                                        
                                        {/* <p style={{ fontSize: "13px" }}> {t.accountName}</p> */}
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div class="form-group">
                                        
                                        <p style={{ fontSize: "13px" }}> {t.accountName}</p>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div class="form-group">
                                       
                                        <p style={{ fontSize: "13px" }}>{t.vendorBankName} {t.accountNumber}</p>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div class="form-group">
                                        
                                        <p style={{ fontSize: "13px" }}>{currencyFormat(t.amount)}</p>
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
                    allCollections: mappedData,
                });
                console.log(this.state.allCollections, "-")
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });

        this.getInstitutionVendors();
        this.loadPaymentGateways();
    };

    getInstitutionVendors = () => {
        $("#preloader").fadeIn();
        Endpoint.getAllVendorByInstitution(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "vendors");
                if (res.data != null && res.data.length > 0) {
                    var mappedData = res.data.map((x, i) => {
                        return {
                            key: i + 1,
                            id: x.id,
                            name: x.name.toUpperCase(),
                            createdDate: x.createdDate != null ? x.createdDate.substring(0, 10) : "-",
                            inflows: "₦0.00",
                            outflows: "₦0.00",
                            status: <img src={badge} />,
                            bankList: x.bankDetailList,
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
    showModal = () => {
        this.setState({
            //visible: true,
            ignite: true,
        });
    };
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
        this.setState({ visible: false, pageIgnite: false, paymentSetup: false });
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

    loadDataSuccess = (msg) =>
        toast.success(msg, {
            style: {
                border: "1px solid #30afaf",
                padding: "16px",
                background: "#30afaf",
                color: "#fff",
                borderRadius: "3rem",
            },
            iconTheme: {
                primary: "#FFFAEE",
                secondary: "#30afaf",
            },
        });
    CreateCollection = () => {
        if (this.state.collection_name == null || this.state.collection_amount <= 0) {
            this.loadDataError("Enter Collection name and amount.");
            return;
        }
        this.setState({ isLoading: true });

        const payLoad = {
            collectionName: this.state.collection_name,
            amount: this.state.collection_amount,
            institutionId: this.state.payLoad.institutionId,
            fixAmount: true,
        };
        Endpoint.createCollection(payLoad)
            .then((res) => {
                console.log(res.data);
                if (res.data.collectionId != null) {
                    this.loadDataSuccess("Collection Saved!");
                    this.setState({ isLoading: false, paymentSetup: true, pageIgnite: false, visible: false, globalCollectionId: res?.data?.collectionId });
                    this.loadDataFromServer();
                }
            })
            .catch((error) => {
                console.log(error);
                this.loadDataError("Error setting up collection(s)! Check that your connection is active");
                this.setState({ isLoading: false });
            });

        // this.setState({
        //     visible: false,
        //     paymentSetup:true,
        //     pageIgnite:false,

        // });
    };
    handleInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({ 
            [name]: value, 
        });
    };

   

    handleVendorInput = (event) => {
        this.setState({ isSelectVendor: null });
        $("#preloader").fadeIn();
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const storeText = event.target?.options[event.target.selectedIndex]?.text

        var selectedVendor = this.state.allVendors.filter((x) => {
            return x.id == target.value;
        });

        console.log(storeText, "storeText");
        console.log(selectedVendor[0], "vendorSelect");
        setTimeout(() => {
            this.setState({ 
                isSelectVendor: selectedVendor != null ? selectedVendor[0] : null,
                globalSelectName: storeText,
                vendorValue: target.value
            });
            $("#preloader").fadeOut();
        }, 1500);
    };


    handleVendorBankInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const storeText = event.target?.options[event.target.selectedIndex]?.text

        setTimeout(() => {
            this.setState({ 
                vendorBankDetails: storeText,
                vendorBankDetailId: target.value
            });
            $("#preloader").fadeOut();
        }, 1500);
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
    resolveAddInputSection = () => {
        var _parent = $("#");
        _parent.append("");
        var _fieldSet = "";
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

    saveCollection = () => {
        let mappedPayload = this.state.pushObjArr.map(x => {
            return{
                "vendorBankDetailId": parseInt(x.itemValue),
                "collectionId": this.state.globalCollectionId,
                "amount": parseInt(x.itemAmount)
            }
        })


        
        if(mappedPayload != null && mappedPayload.length > 0){
            this.setState({
                isLoading: true,
            });
                Endpoint.postCollectionFeeSplit(mappedPayload)
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                        this.loadDataSuccess("Collection fee split successfully setup!");
                        this.setState({ isLoading: false, invoiceCommited: true, paymentSetup: false, pageIgnite: false, visible: false, globalCollectionId: res?.data?.collectionId });
                        this.loadDataFromServer();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.loadDataError("Error setting up collection split! Check that your connection is active");
                    this.setState({ isLoading: false });
                });
        }
        else{
            this.loadDataError("Enter atleast one vendor fee split to continue.");
        }
        console.log(mappedPayload);
    }

    duplicate = () => {

        var newObj = {
            itemName: this.state.globalSelectName,
            itemValue: this.state.vendorBankDetailId,
            itemAmount: this.state.vendorAmount,
            itemBank: this.state.vendorBankDetails
        }

        this.state.pushObjArr.push(newObj);
        //setTimeout(() => {
            console.log(this.state.pushObjArr)
            this.setState({
                pushObjArr: this.state.pushObjArr,
                // vendor_account_select: null,
                // vendor_select:null
            })
        //}, 1500);
    //     var i = 0;
   
    }
    componentDidMount() {
        this.loadDataFromServer();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        console.log(this.state.dynamicColumns, "DynamicColumns")
    }

    handleVendorAmount = (e) => {

        this.setState({
            vendorAmount: e.target.value
        })

        setTimeout(() => {
            console.log(this.state.vendorAmount)
        }, 1500);

    }

    removeVendor = (data) => {
        var filteredItems = this.state.pushObjArr.filter((x) => {
            return x.itemValue != data;
        });
        this.setState({
            pushObjArr: filteredItems
        })
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
                    <div className="container-fluid py-5 mt-3">
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                        Settlement Report
                                    </h1>
                                    {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                                </div>
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                                    <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                        <img src={filterIcon} /> &nbsp; Filter
                                    </button>
                                    <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize: "14px" }} onClick={this.showModal}>
                                        <i className="fa fa-plus" /> &nbsp; New Collection
                                    </button>
                                </div>
                            </div>
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 700 : null}>
                                <div className="modal-top">
                                    <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                                        New Collection
                                    </p>

                                    <div className="row cmt-2">
                                        <div className="col-sm-8">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Collection Name
                                                </label>
                                                <br />
                                                {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                                <input type="text" name="collection_name" className="form-control" placeholder="Enter collection name" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                                    Collection Amount(₦)
                                                </label>
                                                <br />
                                                {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                                <input type="number" className="form-control" placeholder="Enter collection amount" name="collection_amount" onChange={this.handleInput} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-sm-6">
                                            <div className="form-inline" style={{ marginTop: "-10px" }}>
                                                <input type="checkbox" name="fixed_amount" checked className="form-control" style={{ marginRight: "10px" }} />
                                                <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "13px" }}>
                                                    Fixed Amount?
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-8">
                                            <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Close
                                            </p>
                                        </div>
                                        {this.state.isLoading ? (
                                            <div style={{ float: "right", paddingRight: "30px" }} className="manrope-text">
                                                <ClickLoader /> Processing...
                                            </div>
                                        ) : (
                                            <div className="col-sm-3">
                                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.CreateCollection}>
                                                    Save Collection
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Modal>

                            <Modal visible={this.state.paymentSetup ? true : false} title={false} onCancel={this.handleCancel} onOk={false} footer={false} width={!isMobile ? 900 : null}>
                                <div className="">
                                    <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                                        Payment Setup for <b style={{ color: "#1B52C4" }}>{this.state.collection_name?.toUpperCase()}</b> collection
                                    </p>

                                    {/* <div className="row cmt-2">
                            <div className="col-sm-8">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div> */}
                        <div>
                                    <div id="AddMoreVendor">
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="manrope-text-light" style={{ fontSize: "11px", marginBottom: "0rem" }}>
                                                        Vendor
                                                    </label>
                                                    <br />
                                                    <select className="form-control manrope-text-light" name="vendor_select" onChange={this.handleVendorInput}>
                                                        <option>Select Vendor</option>
                                                        {this.state.allVendors &&
                                                            this.state.allVendors.map((x, i) => {
                                                                return (
                                                                    <option className="form-control" value={x.id}>
                                                                        {x.name}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                  
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="manrope-text-light" style={{ fontSize: "11px", marginBottom: "0rem" }}>
                                                        Account Details
                                                    </label>
                                                    <br />
                                                    <select className="form-control manrope-text-light" name="vendor_account_select" onChange={this.handleVendorBankInput}>
                                                        <option>Select</option>
                                                        {this.state.isSelectVendor &&
                                                            this.state.isSelectVendor?.bankList &&
                                                            this.state.isSelectVendor?.bankList.map((x, i) => {
                                                                return (
                                                                    <option className="form-control" value={x.id}>
                                                                        {x.bankName} - {x.accountNumber}
                                                                    </option>
                                                                );
                                                            })}
                                                    </select>
                                                    
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="manrope-text-light" style={{ fontSize: "11px", marginBottom: "0rem" }}>
                                                        Amount(₦)
                                                    </label>
                                                    <br />
                                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                                    <input type="number" style={{ fontSize: "13px" }} className="form-control" placeholder="Amount" name="vendor_amount" 
                                                    
                                                    // onChange={this.handleInput}
                                                    onChange={(e) => this.handleVendorAmount(e)}
                                                    
                                                    />
                                                </div>
                                            </div>
                                     
                                        </div>
                                    </div>





                             </div>
                                    
                                    <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-sm-12">
                                            <button className="btn btn-outline-primary" style={{ border: "1px dashed #1B52C4", fontSize: "12px", width: "100%" }} onClick={
                                                //this.resolveAddInputSection
                                                this.duplicate
                                                }>
                                                <i className="fa fa-plus" /> &nbsp; Add Vendor
                                            </button>
                                        </div>
                                    </div>
                                    
<br/>
<br/>

<div className="text-left">
    {this.state.pushObjArr && this.state.pushObjArr.map((x,i) => {
        return(
            <>
              <QueueAnim>
                                        
            <div className="row" key="1">
                <div className="col-md-1 manrope" style={{color:'#1B52C4', fontSize:'10px', fontWeight:'700'}}>
                    {i+1}
                    </div>
                    <div className="col-md-3" style={{color:'#1B52C4', fontSize:'10px', fontWeight:'700'}}>
                        {x.itemName}
                    </div>

                    <div className="col-md-4" style={{color:'#1B52C4', fontSize:'10px', fontWeight:'700'}}>
                           {x.itemBank}
                    </div>

                    <div className="col-md-2" style={{color:'#1B52C4', fontSize:'10px', fontWeight:'700'}}>
                            {currencyFormat(parseInt(x.itemAmount))}
                    </div>
                    <div className="col-md-1" style={{color:'#1B52C4'}}>
                    <img src={deleteIcon} style={{ cursor: "pointer" }} onClick={() => this.removeVendor(x.itemValue)}/>
                    </div>

            </div>
            </QueueAnim>

            <br/>
            </>
        )
    })}




</div>

<br/>
<div className="row">
{this.state.allGateways && this.state.allGateways.map(x => {
    return(
       <>
       {/* #1B52C4 */}
            <div className="col-md-6">
                <div style={{width:'389px', height:'76px', border:'1px solid #84818a47', padding:'15px', borderRadius:'4px', marginBottom:'20px', flex:'end', boxSizing:'border-box'}}>
                <img src={BASE_URL + x.logo} style={{ width: "100px" }} />


    <input type="checkbox" style={{float:'right'}}/>

                </div>
                        
            </div>
            <br/>
            <br/>
            <br/>
            </>
    )
})}
        </div>





                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-8">
                                            <p style={{ fontSize: "11px", cursor: "pointer" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Save and continue later
                                            </p>
                                        </div>
                                        <div className="col-sm-3">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.saveCollection}>
                                                Save Collection
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                            
                            <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 582 : null}>
                                <div className="modal-top text-center">
                                    <p className="manrope-text drk-text" style={{ fontSize: "27px" }}>
                                        Collection Split successfully set!
                                    </p>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                                Fee successfully split and set against selected vendors
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <img src={kulCheck} />
                                        </div>
                                    </div>
{/* 
                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <p className="manrope-text" style={{ color: "#1B52C4", fontSize: "20px" }}>
                                                Sandra Okoro
                                            </p>
                                            <p>
                                                Username: Sandramfb@gmail.com
                                                <br />
                                                Password: fjegakal62{" "}
                                            </p>
                                        </div>
                                    </div> */}

                                    {/* <div className="row" style={{ marginTop: "10px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <p className="manrope-text" style={{ color: "#05EEC0", fontSize: "14px" }}>
                                                Copy Password
                                            </p>
                                        </div>
                                    </div> */}

                                    <div className="row" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12 col-xl-12">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}>
                                                Ok &nbsp;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </>
                        <Table
                            columns={columns}
                            expandable={{
                                expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                rowExpandable: (record) => record.name !== "Not Expandable",
                            }}
                            dataSource={this.state.allCollections}
                            className="manrope-text table-responsive"
                        />
                    </div>
                </Fade>
            </>
        );
    }
}

export default SettlementReport;
