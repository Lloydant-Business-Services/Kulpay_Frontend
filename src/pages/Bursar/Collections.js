import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/Label.svg";
import pendingBadge from "../../assets/images/pending.svg";
import NewCollection from "./NewCollection";
import { Fade } from "reactstrap";
import printer from "../../assets/images/print.svg";
import $ from "jquery";
import Endpoint from "../../utils/endpoint";
import { Modal, Button } from "antd";
import kulCheck from "../../assets/images/kulCheck.svg";
import filterIcon from "../../assets/images/filterIcon.svg";
import editIcon from "../../assets/images/editIcon.svg";
import deleteIcon from "../../assets/images/deleteIcon.svg";
import { Table, Radio } from "antd";
import { currencyFormat } from "../../utils/helpers";
import logo from "../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import QueueAnim from "rc-queue-anim";
import { stateKeys, BASE_URL } from "../../redux/actions";

const columns = [
    { 
        title: "SN", 
        dataIndex: "key", 
        key: "key" 
    },
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


class Collections extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        // pageIgnite:false,
        //paymentSetup: true,
        cloneCount: 0,
        globalSelectName: null,
        vendor_select: null,
        pushObjArr: [],
        proposeArr: [],
        levelArr: [],
        departmentArr: [],
    };

    addCollectionSplit = (collectionId, collectionName) => {
        this.setState({
            collection_name: collectionName,
            paymentSetup: true,
            globalCollectionId: collectionId,
        });
    };

    resolveImgWidth = () => {
        var myImg = document.querySelector("#imgCheck");
        var realWidth = myImg.naturalWidth;
        var realHeight = myImg.naturalHeight;
        alert("Original width=" + realWidth + ", " + "Original height=" + realHeight);
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
                                <img  src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
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
                    console.log(this.state.allGateways, "gateways");
                }, 2000);
                //$("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });
    };
    getAllFaculties = () => {
        Endpoint.getAllfaculties()
            .then((res) => {
                // console.log(res.data)
                this.setState({ allFacultyList: res.data });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoading: false });
            });
    };
    getAllDepartments = () => {
        Endpoint.getAllDepartments()
            .then((res) => {
                // console.log(res.data)
                this.setState({ allDepartmentList: res.data });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ isLoading: false });
            });
    };
    getAllSession = () => {
        Endpoint.getActiveSession()
            .then((res) => {
                // console.log(res.data)
                this.setState({ sessionList: res.data });
            })
            .catch((error) => {
                console.log(error);
                //this.setState({isLoading:false})
            });
    };

    getInstitutionProgrammes = () => {
        Endpoint.getInstitutionProgramme(this.state.payLoad.institutionId, true)
            .then((res) => {
                console.log(res.data, "proggg")
                this.setState({ institutionProgrammeList: res.data });
            })
            .catch((error) => {
                console.log(error);
                //this.setState({isLoading:false})
            });
    };

    getAllLevels = () => {
        Endpoint.getInstitutionLevel(3)
            .then((res) => {
                 console.log(res.data, "level")
                this.setState({ levelList: res.data });
            })
            .catch((error) => {
                console.log(error);
                //this.setState({isLoading:false})
            });
    };

    toggleDeptList = () => {
        $("#deptList").toggle("slow");
    };
    toggleGatewayList = () => {
        $("#gatewayList").toggle("slow");
    };
    toggleLevelList = () => {
        $("#levelList").toggle("slow");
    };
    postApplyCollection = () => {
        if (this.state.levelArr == null || this.state.levelArr.length <= 0 || this.state.departmentArr == null || this.state.departmentArr.length <= 0) {
            this.loadDataError("Select atleast one Department/Level to continue!");
            return;
        }

        $("#preloader").fadeIn();
        let applyCollectionPayload = {
            levelIds: this.state.levelArr,
            programmeId: parseInt(this.state.collection_programme),
            sessionId: parseInt(this.state.collection_session),
            departmentIds: this.state.departmentArr,
            collectionId: this.state.globalCollectionId,
        };

        Endpoint.applyCollection(applyCollectionPayload)
            .then((res) => {
                this.setState({ applyCollectionState: false });
                this.loadDataSuccess("Collection Saved!");
                window.location.reload(true);
                //$("#preloader").fadeOut();
            })
            .catch((error) => {
                this.loadDataError("Error applying collection split! Check that your connection is active");
                $("#preloader").fadeOut();
            });
    };

    addCollectionApplication = (collectionId, collectionName) => {
        this.setState({
            collection_name: collectionName,
            applyCollectionState: true,
            globalCollectionId: collectionId,
        });
    };
    loadDataFromServer = () => {
        $("#preloader").fadeIn();
        Endpoint.getInstitutionCollections(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res.data, "rss");
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
                        amount: x.amount != null ? currencyFormat(x.amount) : "-",
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
                                            <br />
                                            <br />
                                            {/* <span style={{ color: "#FFA043", cursor: "pointer" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                                Add Collection Split &nbsp; <i className="fa fa-plus" />
                                            </span>
                                                &nbsp;  &nbsp;  &nbsp;
                                            <span style={{ color: "#FFA043", cursor: "pointer" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                                Add Collection Split &nbsp; <i className="fa fa-plus" />
                                            </span> */}
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
                                    <div className="col-lg-12">
                                        {/* <Radio.Group value={'small'} onChange={this.handleSizeChange}>
          <Radio.Button value="small">Add Collection Vendors</Radio.Button>
          <Radio.Button value="small">Vendor Fee Split</Radio.Button>
          <Radio.Button value="small">Collection Details</Radio.Button>
        </Radio.Group> */}
                                        <span style={{ color: "#1B52C4", cursor: "pointer", fontSize: "12px" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                            <i className="fa fa-arrow-circle-right" /> &nbsp; Add Collection Split
                                        </span>
                                        {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <span style={{ color: "#1B52C4", cursor: "pointer", fontSize: "12px" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                            <i className="fa fa-arrow-circle-right" /> &nbsp; View Vendor Split Details
                                        </span> */}
                                        {/* &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <span style={{ color: "#1B52C4", cursor: "pointer", fontSize: "12px" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                            <i className="fa fa-arrow-circle-right" /> &nbsp; View Collection Details
                                        </span>  */}
                                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                        <span style={{ color: "#1B52C4", cursor: "pointer", fontSize: "12px" }} onClick={() => this.addCollectionApplication(x.collectionId, x.collectionName)}>
                                            <i className="fa fa-arrow-circle-right" /> &nbsp; Apply Collection Details
                                        </span>
                                        <br />
                                    </div>
                                </div>
                                <hr style={{ marginTop: "0rem", marginBottom: "13px" }} />
                                <div className="row" style={{ paddingTop: "1px" }} id="accountDetailsView">
                                    <div className="col-sm-1">
                                        <div class="form-group">
                                            <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}></label>
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

                                {x.collectionSplitList &&
                                    x.collectionSplitList.map((t, i) => {
                                        return (
                                            <div className="row" style={{ paddingTop: "1px" }}>
                                                <div className="col-sm-1">
                                                    <div class="form-group">{/* <p style={{ fontSize: "13px" }}> {t.accountName}</p> */}</div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div class="form-group">
                                                        <p style={{ fontSize: "12px" }}> {t.accountName}</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div class="form-group">
                                                        <p style={{ fontSize: "12px" }}>
                                                            {t.vendorBankName} {t.accountNumber}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div class="form-group">
                                                        <p style={{ fontSize: "12px" }}>{currencyFormat(t.amount)}</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-2">
                                                    <div class="form-group">
                                                        <p style={{ fontSize: "12px" }}>
                                                            {" "}
                                                            <img src={editIcon} style={{ cursor: "pointer" }} /> &nbsp; &nbsp; &nbsp; &nbsp; <img src={deleteIcon} style={{ cursor: "pointer" }} />
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>
                        ),
                    };
                });
                this.setState({
                    allCollections: mappedData,
                });
                console.log(this.state.allCollections, "-");
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });  
        

        this.getInstitutionVendors();
        this.loadPaymentGateways();
        this.getAllDepartments();
        this.getAllFaculties();
        this.getAllSession();
        this.getInstitutionProgrammes();
        this.getAllLevels();
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

        // setTimeout(() => {
        //     this.resolveImgWidth()
        // }, 2000);
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
        this.setState({ visible: false, pageIgnite: false, paymentSetup: false, applyCollectionState: false });
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
        console.log(this.state.collection_name)
        if (this.state.collection_name == null || this.state.collection_amount <= 0) {
            this.loadDataError("Enter Collection name and amount.");
            return;
        }
        this.setState({ isLoading: true });

        if (this.state.levelArr == null || this.state.levelArr.length <= 0 || this.state.departmentArr == null || this.state.departmentArr.length <= 0) {
            this.loadDataError("Select atleast one Department/Level to continue!");
            return;
        }

        let applyCollectionPayload = {
            levelIds: this.state.levelArr,
            programmeId: parseInt(this.state.collection_programme),
            sessionId: parseInt(this.state.collection_session),
            departmentIds: this.state.departmentArr,
        };
        let splitPayload = this.state.pushObjArr.map((x) => {
            return {
                vendorBankDetailId: parseInt(x.itemValue),
                amount: parseInt(x.itemAmount),
            };
        });

        let gatewayPayload = {
            // paymentGatewayIds: [3],
            paymentGatewayIds: this.state.proposeArr,

            
        };
       
        const collection__payload = {
            "collectionName": this.state.collection_name,
            "amount": parseInt(this.state.collection_amount),
            "institutionId": this.state.payLoad.institutionId,
            "fixAmount": true,
            "collectionSplit": splitPayload,
            "collectionPlatform": gatewayPayload, //gateways
            "collectionDetail": applyCollectionPayload
          }

        $("#preloader").fadeIn();
        Endpoint.createCollection(collection__payload)
            .then((res) => {
                console.log(res.data);
                if (res.data.collectionId != null) {
                    $("#preloader").fadeOut()
                    this.loadDataSuccess("Collection Saved!");
                    this.setState({ isLoading: false, paymentSetup: true, pageIgnite: false, visible: false, globalCollectionId: res?.data?.collectionId });
                    this.loadDataFromServer();
                }
            })
            .catch((error) => {
                console.log(error.statusText);
                $("#preloader").fadeOut()
                this.loadDataError(error.statusText);
                this.setState({ isLoading: false });
            });

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
        const storeText = event.target?.options[event.target.selectedIndex]?.text;

        var selectedVendor = this.state.allVendors.filter((x) => {
            return x.id == target.value;
        });

        console.log(storeText, "storeText");
        console.log(selectedVendor[0], "vendorSelect");
        setTimeout(() => {
            this.setState({
                isSelectVendor: selectedVendor != null ? selectedVendor[0] : null,
                globalSelectName: storeText,
                vendorValue: target.value,
            });
            $("#preloader").fadeOut();
        }, 1500);
    };

    handleVendorBankInput = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        const storeText = event.target?.options[event.target.selectedIndex]?.text;

        setTimeout(() => {
            this.setState({
                vendorBankDetails: storeText,
                vendorBankDetailId: target.value,
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
            isLoading: true,
        });
        $("#preloader").fadeIn();
        setTimeout(() => {
            window.location.reload(true);
        }, 1300);
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

    selectPaymentGateway = (id) => {
        var check = this.state.proposeArr.includes(id);
        if (check) {
            var filterGateways = this.state.proposeArr.filter((x) => {
                return x != id;
            });
            this.setState({ proposeArr: filterGateways });
            setTimeout(() => {
                console.log(this.state.proposeArr);
            }, 2000);
        } else {
            this.state.proposeArr.push(id);
            setTimeout(() => {
                console.log(this.state.proposeArr);
            }, 2000);
        }
    };
        resolveSelect = (id) => {
        var check = this.state.proposeArr.includes(id);
        if (check) {
            var lists = this.state.proposeArr.filter((x) => {
                return x != id;
            });
            this.setState({ proposeArr: lists });
            setTimeout(() => {
                console.log(this.state.proposeArr);
            }, 2000);
        } else {
            this.state.proposeArr.push(id);
            setTimeout(() => {
                console.log(this.state.proposeArr);
            }, 2000);
        }
    };
    saveCollection = () => {
        let mappedPayload = this.state.pushObjArr.map((x) => {
            return {
                vendorBankDetailId: parseInt(x.itemValue),
                collectionId: this.state.globalCollectionId,
                amount: parseInt(x.itemAmount),
            };
        });

        let platformPayload = {
            collectionId: this.state.globalCollectionId,
            paymentGatewayIds: this.state.proposeArr,
        };

        if (mappedPayload != null && mappedPayload.length > 0) {
            if (this.state.proposeArr == null || this.state.proposeArr.length <= 0) {
                this.loadDataError("Please select a payment gateway to continue!");
                return;
            }
            this.setState({
                isLoading: true,
            });
            Endpoint.postCollectionFeeSplit(mappedPayload)
                .then((res) => {
                    console.log(res.data);
                    if (res.data) {
                        //Post Collection Gateway
                        Endpoint.postCollectionPlatform(platformPayload)
                            .then(() => {
                                this.loadDataSuccess("Collection fee split successfully setup!");
                                this.setState({ isLoading: false, invoiceCommited: true, paymentSetup: false, pageIgnite: false, visible: false, globalCollectionId: res?.data?.collectionId });
                                this.loadDataFromServer();
                            })
                            .catch((error) => {
                                this.loadDataError("Error setting up collection split! Check that your connection is active");
                                this.setState({ isLoading: false });
                            });
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.loadDataError("Error setting up collection split! Check that your connection is active");
                    this.setState({ isLoading: false });
                });
        } else {
            this.loadDataError("Enter atleast one vendor fee split to continue.");
        }
        console.log(mappedPayload);
    };

    duplicate = () => {
        var newObj = {
            itemName: this.state.globalSelectName,
            itemValue: this.state.vendorBankDetailId,
            itemAmount: this.state.vendorAmount,
            itemBank: this.state.vendorBankDetails,
        };
        const doesExist = this.state.pushObjArr.filter((x) => x.itemValue == newObj.itemValue)
        if(doesExist.length > 0)
            return
        
        this.setState({
          displayAmount: this.state.displayAmount - parseInt(newObj.itemAmount)
        });

        this.state.pushObjArr.push(newObj);
        //setTimeout(() => {
        console.log(this.state.pushObjArr);
        this.setState({
            pushObjArr: this.state.pushObjArr,
            // vendor_account_select: null,
            // vendor_select:null
        });
        document.getElementById('vv').value = 0
        document.getElementById("vb").value = 0;
        document.getElementById("vm").value = '';
        //}, 1500);
        //     var i = 0;
    };

    componentDidMount() {
        this.loadDataFromServer();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    handleVendorAmount = (e) => {
        this.setState({
          vendorAmount: e.target.value,
        });
    };
    handleDefaultAmount = (e) => {
        this.setState({
          collection_amount: e.target.value,
          displayAmount: e.target.value,
        });
    };
    removeVendor = (data) => {
        console.log(data)
        var getItem = this.state.pushObjArr.filter((x) => x.itemValue == data);
        console.log(getItem, 'ggttt')
        var filteredItems = this.state.pushObjArr.filter((x) => {
            return x.itemValue != data;
        });
        this.setState({
          pushObjArr: filteredItems,
          displayAmount: this.state.displayAmount + parseInt(getItem[0].itemAmount)
        });
    };



    resolveLevelSelect = (id) => {
        var check = this.state.levelArr.includes(id);
        if (check) {
            var lists = this.state.levelArr.filter((x) => {
                return x != id;
            });
            this.setState({ levelArr: lists });
            setTimeout(() => {
                console.log(this.state.levelArr);
            }, 2000);
        } else {
            this.state.levelArr.push(id);
            setTimeout(() => {
                console.log(this.state.levelArr, "LevelArray");
            }, 2000);
        }
    };

    resolveDepartmentSelect = (id) => {
        var check = this.state.departmentArr.includes(id);
        if (check) {
            var lists = this.state.departmentArr.filter((x) => {
                return x != id;
            });
            this.setState({ departmentArr: lists });

            
            setTimeout(() => {
                console.log(this.state.departmentArr);
            }, 2000);
        } else {
            this.state.departmentArr.push(id);
            setTimeout(() => {
                console.log(this.state.departmentArr, "DepartmentArray");
            }, 2000);
        }
    };
    
    resolveGatewaySelect = (id) => {
        var check = this.state.departmentArr.includes(id);
        if (check) {
            var lists = this.state.departmentArr.filter((x) => {
                return x != id;
            });
            this.setState({ departmentArr: lists });

            
            setTimeout(() => {
                console.log(this.state.departmentArr);
            }, 2000);
        } else {
            this.state.departmentArr.push(id);
            setTimeout(() => {
                console.log(this.state.departmentArr, "DepartmentArray");
            }, 2000);
        }
    };
    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, institutionProgrammeList, value, isLoading, invoiceCommited, allFacultyList, allDepartmentList, sessionList, levelList } = this.state;
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
                    <div className="container-fluid py-5 mt-4">
                        <>
                            <div className="row">
                                <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                        {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                        Collection
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
                        
                            
                            {/* visible={this.state.paymentSetup ? true : false} */}
                            <Modal visible={this.state.pageIgnite ? true : false} title={false} onCancel={this.handleCancel} onOk={false} footer={false} width={!isMobile ? 900 : null}  style={{marginTop:'-80px'}}>
                                <div className="">
                                    {/* <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                                        Payment Setup for <b style={{ color: "#1B52C4" }}>{this.state.collection_name?.toUpperCase()}</b> collection
                                    </p> */}
                                    <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                                    Collection Setup
                                    </p>
                                      <p className="manrope-text text-right" style={{ fontSize: "30px", color:"#27a177" }}>
                                        {this.state.displayAmount > 0 ? currencyFormat(parseInt(this.state.displayAmount)) : "0.00"}
                                    </p>
                                    

                                    {/* <div className="row cmt-2">
                            <div className="col-sm-8">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div> */}
                                    <div>
                                        <div id="AddMoreVendor" style={{marginTop:'-31px'}}>
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
                                                        <input type="number" className="form-control" placeholder="Enter collection amount" name="collection_amount" onChange={this.handleDefaultAmount} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row" style={{ marginTop: "20px" }}>
                                                <div className="col-sm-4">
                                                    <div className="form-group">
                                                        <label className="manrope-text-light" style={{ fontSize: "11px", marginBottom: "0rem" }}>
                                                            Vendor
                                                        </label>
                                                        <br />
                                                        <select className="form-control manrope-text-light" id="vv" name="vendor_select" onChange={this.handleVendorInput}>
                                                            <option value={0}>Select Vendor</option>
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
                                                        <select className="form-control manrope-text-light" id="vb" name="vendor_account_select" onChange={this.handleVendorBankInput}>
                                                            <option value={0}>Select</option>
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
                                                        <input
                                                            type="number"
                                                            style={{ fontSize: "13px" }}
                                                            className="form-control"
                                                            placeholder="Amount"
                                                            name="vendor_amount"
                                                            id="vm"
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
                                            <button
                                                className="btn btn-outline-primary"
                                                style={{ border: "1px dashed #1B52C4", fontSize: "12px", width: "100%" }}
                                                onClick={
                                                    //this.resolveAddInputSection
                                                    this.duplicate
                                                }
                                            >
                                                <i className="fa fa-plus" /> &nbsp; Add Vendor
                                            </button>
                                        </div>
                                    </div>

                                    <br />
                                    <br />

                                    <div className="text-left">
                                        {this.state.pushObjArr &&
                                            this.state.pushObjArr.map((x, i) => {
                                                return (
                                                    <>
                                                        <QueueAnim>
                                                            <div className="row" key="1">
                                                                <div className="col-md-1 manrope" style={{ color: "#1b52c4", fontSize: "10px", fontWeight: "700" }}>
                                                                    {i + 1}
                                                                </div>
                                                                <div className="col-md-3" style={{ color: "#1b52c4", fontSize: "10px", fontWeight: "700" }}>
                                                                    {x.itemName}
                                                                </div>

                                                                <div className="col-md-4" style={{ color: "#1b52c4", fontSize: "10px", fontWeight: "700" }}>
                                                                    {x.itemBank}
                                                                </div>

                                                                <div className="col-md-2" style={{ color: "#1b52c4", fontSize: "10px", fontWeight: "700" }}>
                                                                    {currencyFormat(parseInt(x.itemAmount))}
                                                                </div>
                                                                <div className="col-md-1" style={{ color: "#1b52c4" }}>
                                                                    <img src={deleteIcon} style={{ cursor: "pointer" }} onClick={() => this.removeVendor(x.itemValue)} />
                                                                </div>
                                                            </div>
                                                        </QueueAnim>

                                                        <br />
                                                    </>
                                                );
                                            })}
                                    </div>

                                    {/* <div className="row">
                                        <div className="col-sm-12 text-center"><p style={{fontWeight:"500"}}>Adavanced Selection</p></div>
                                      
                                                   
                                        
                                    </div> */}
                                    <hr style={{marginTop:'-8px'}}/>
                                    <div className="row" style={{ marginTop: "20px" }}>
                                          <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Payment Channel
                                                </label>
                                                <br />

                                                <select className="form-control" onClick={this.toggleGatewayList}>
                                                    <option>Select Channel</option>
                                                </select>
                                            </div>

                                            <div className="col-sm-12" id="gatewayList" style={{ marginTop: "-17px", display: "none" }}>
                                                <div className="form-group" style={{ padding: "13px", border: "1px solid #d9d9d9", maxHeight: "270px", overflowY: "scroll" }}>
                                                    {this.state.allGateways &&
                                                        this.state.allGateways.map((x) => {
                                                            return (
                                                                <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                                    <input type="checkbox" onChange={() => this.resolveSelect(x.id)} /> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                                </p>
                                                            );
                                                    })}
                                                </div>
                                            </div>
                                             {/* <br /> */}
                                                        {/* <br /> */}
                                                        <br />
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Session
                                                </label>
                                                <br />
                                                {/* <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} /> */}
                                                <select className="form-control" name="collection_session" onChange={this.handleInput}>
                                                    <option>Select Session</option>
                                                    {sessionList &&
                                                        sessionList.map((x) => {
                                                            return <option value={x.id}>{x.name}</option>;
                                                        })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Programme
                                                </label>
                                                <br />
                                                {/* <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} /> */}
                                                <select className="form-control" name="collection_programme" onChange={this.handleInput}>
                                                    <option>Select Programme</option>
                                                    {institutionProgrammeList &&
                                                        institutionProgrammeList.map((x) => {
                                                            return <option value={x.id}>{x.programmeName}</option>;
                                                        })}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Departments
                                                </label>
                                                <br />

                                                <select className="form-control" onClick={this.toggleDeptList}>
                                                    <option>Select Departments</option>
                                                </select>
                                            </div>

                                            <div className="col-sm-12" id="deptList" style={{ marginTop: "-17px", display: "none" }}>
                                                <div className="form-group" style={{ padding: "13px", border: "1px solid #d9d9d9", maxHeight: "270px", overflowY: "scroll" }}>
                                                    {allDepartmentList &&
                                                        allDepartmentList.map((x) => {
                                                            return (
                                                                <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                                    <input type="checkbox" onChange={() => this.resolveDepartmentSelect(x.id)} /> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                                </p>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-sm-12 col-lg-6">
                                            <div className="form-group">
                                                <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    Level
                                                </label>
                                                <br />

                                                <select className="form-control" onClick={this.toggleLevelList}>
                                                    <option>Select Level</option>
                                                </select>
                                            </div>

                                            <div className="col-sm-12" id="levelList" style={{ marginTop: "-17px", display: "none" }}>
                                                <div className="form-group" style={{ padding: "13px", border: "1px solid #d9d9d9", maxHeight: "270px", overflowY: "scroll" }}>
                                                    {levelList &&
                                                        levelList.map((x) => {
                                                            return (
                                                                <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                                    <input type="checkbox" onChange={() => this.resolveLevelSelect(x.id)} /> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                                </p>
                                                            );
                                                        })}
                                                </div>
                                            </div>
                                        </div>
                                        {/* {this.state.showDepartmentList ? <Fade> */}

                                        {/* {this.state.showDepartmentList ? <Fade> */}
                                    </div>

                                    <div className="row" style={{ marginTop: "46px" }}>
                                        <div className="col-sm-12 col-xl-6">
                                            <p style={{ fontSize: "11px", cursor: "pointer" }} className="drk-text manrope-text cmt-1" onClick={this.handleCancel}>
                                                Save and continue later
                                            </p>
                                        </div>
                                        <div className="col-sm-1">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.CreateCollection}>
                                                Save
                                            </button>
                                        </div>

                                        <div className="col-sm-3">
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.CreateCollection}>
                                                Save and add more
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
                                            <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.closeCommitted}>
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

                {/* Add School/Department Modal Starts Here */}
                <Modal visible={this.state.applyCollectionState} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 600 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "20px" }}>
                            Apply Collection for <span style={{ color: "#1B52C4" }}>{this.state.collection_name}</span>
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-12">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Apply collection detail to specific programme/department/session/level
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                        Session
                                    </label>
                                    <br />
                                    {/* <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} /> */}
                                    <select className="form-control" name="collection_session" onChange={this.handleInput}>
                                        <option>Select Session</option>
                                        {sessionList &&
                                            sessionList.map((x) => {
                                                return <option value={x.id}>{x.name}</option>;
                                            })}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                        Programme
                                    </label>
                                    <br />
                                    {/* <input type="text" name="vendor_name" className="form-control" placeholder="Enter vendor name" onChange={this.handleInput} /> */}
                                    <select className="form-control" name="collection_programme" onChange={this.handleInput}>
                                        <option>Select Programme</option>
                                        {institutionProgrammeList &&
                                            institutionProgrammeList.map((x) => {
                                                return <option value={x.id}>{x.programmeName}</option>;
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

                            <div className="col-sm-10" id="deptList" style={{ marginTop: "-17px", display: "none" }}>
                                <div className="form-group" style={{ padding: "13px", border: "1px solid #d9d9d9", maxHeight: "270px", overflowY: "scroll" }}>
                                    {allDepartmentList &&
                                        allDepartmentList.map((x) => {
                                            return (
                                                <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    <input type="checkbox" onChange={() => this.resolveDepartmentSelect(x.id)} /> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                </p>
                                            );
                                        })}
                                </div>
                            </div>
                            {/* </Fade> : null} */}
                        </div>
                        {/* Department Drop Down Ends Here */}

                        {/* Level Drop Down Starts Here */}
                        <div className="row" style={{ marginTop: "7px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                        Level
                                    </label>
                                    <br />

                                    <select className="form-control" onClick={this.toggleLevelList}>
                                        <option>Select Level</option>
                                    </select>
                                </div>
                            </div>
                            {/* {this.state.showDepartmentList ? <Fade> */}

                            <div className="col-sm-10" id="levelList" style={{ marginTop: "-17px", display: "none" }}>
                                <div className="form-group" style={{ padding: "13px", border: "1px solid #d9d9d9", maxHeight: "270px", overflowY: "scroll" }}>
                                    {levelList &&
                                        levelList.map((x) => {
                                            return (
                                                <p className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "7px" }}>
                                                    <input type="checkbox" onChange={() => this.resolveLevelSelect(x.id)} /> &nbsp; &nbsp; {x.name?.toUpperCase()}
                                                </p>
                                            );
                                        })}
                                </div>
                            </div>
                            {/* </Fade> : null} */}
                        </div>
                        {/* Level Drop Down Ends Here */}

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
                                    <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.postApplyCollection}>
                                        Submit
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
                {/* Add School/Department Modal Ends Here */}
            </>
        );
    }
}

export default Collections;
