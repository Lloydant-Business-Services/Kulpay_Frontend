import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import illustration from "../../assets/images/illus.png";
import ic_up from "../../assets/images/ic_up.png";
import ic_down from "../../assets/images/ic_down.png";
import shape from "../../assets/images/Shape.png";
import shape2 from "../../assets/images/Shape2.png";
import shape3 from "../../assets/images/Shape3.png";
import badge from "../../assets/images/Label.svg";
import printer from "../../assets/images/print.svg";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import * as Unicons from "@iconscout/react-unicons";
import Endpoint from "../../utils/endpoint";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";
import { resolveDateTime } from "../../utils/helpers";
import { Modal, Button } from "antd";
import PinInput from "react-pin-input";
import CallInvoice from "./CallInvoice"
const LineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "KulPay Revenue",
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            borderColor: "#1B52C4",
        },
    ],
};
const LineData2 = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
        {
            label: "KulPay Revenue",
            data: [33, 10, 60, 12, 74, 4, 23, 7],
            fill: false,
            borderColor: "#1B52C4",
        },
    ],
};
const data = {
    labels: ["10th Aug", "11th Aug", "12th Aug", "13th Aug", "14th Aug", "15th Aug", "16th Aug", "17th Aug", "18th Aug", "19th Aug"],
    datasets: [
        {
            label: "# of kulpay1",
            data: [250, 140, 200, 66, 110, 130, 79, 44, 67, 77],
            backgroundColor: "#1B52C4",
            // width:'6px',
            barThickness: 8,
        },
        {
            label: "# of kulpay 2",
            data: [122, 163, 222, 111, 177, 144, 54, 81, 32, 56],
            backgroundColor: "#F1F4FB",
            barThickness: 8,
        },
    ],
};
const optionsLine = {
    scales: {
        maintainAspectRatio: false,
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],

        //   barThickness:3
    },
    legend: {
        display: false,
    },
};

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
        maintainAspectRatio: false,

        //   barThickness:3
    },
    legend: {
        display: false,
    },
};
function sliceSize(dataNum, dataTotal) {
    return (dataNum / dataTotal) * 360;
}
function addSlice(sliceSize, pieElement, offset, sliceID, color) {
    $(pieElement).append("<div class='slice " + sliceID + "'><span></span></div>");
    var offset = offset - 1;
    var sizeRotation = -179 + sliceSize;
    $("." + sliceID).css({
        transform: "rotate(" + offset + "deg) translate3d(0,0,0)",
    });
    $("." + sliceID + " span").css({
        transform: "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
        "background-color": color,
    });
}
function iterateSlices(sliceSize, pieElement, offset, dataCount, sliceCount, color) {
    var sliceID = "s" + dataCount + "-" + sliceCount;
    var maxSize = 179;
    if (sliceSize <= maxSize) {
        addSlice(sliceSize, pieElement, offset, sliceID, color);
    } else {
        addSlice(maxSize, pieElement, offset, sliceID, color);
        iterateSlices(sliceSize - maxSize, pieElement, offset + maxSize, dataCount, sliceCount + 1, color);
    }
}
function createPie(dataElement, pieElement) {
    var listData = [];
    $(dataElement + " span").each(function () {
        listData.push(Number($(this).html()));
    });
    var listTotal = 0;
    for (var i = 0; i < listData.length; i++) {
        listTotal += listData[i];
    }
    var offset = 0;
    var color = ["#1B52C4", "#FFA043", "#EBEAED"];
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
createPie(".pieID.legend", ".pieID.pie");

class HODDashboard extends Component {
    state = {
        pageLoading: false,
        institutionDetails: [],
        loading: false,
        visible: false,
        commitingInvoice: false,
        invoiceCommited:false
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
        toast.error("Something went wrong, pls check your connection.", {
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

    loadDataFromServer = () => {};
    showModal = () => {
        this.setState({
            //visible: true,
            ignite:true
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };
    componentDidMount() {
        setTimeout(() => {
            $("#preloader").delay(450).fadeOut("slow");
        }, 1800);
        setTimeout(() => {
            createPie(".pieID.legend", ".pieID.pie");
        }, 2500);
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        this.loadDataFromServer();
    }
    promptCommitInvoice = () => {
        this.setState({
            visible: false,
            commitingInvoice: true,
        });
    };

    closeCommit = () => {
        this.setState({
            
            commitingInvoice: false,
        });
    };
    closeCommitted = () => {
        this.setState({
            
            invoiceCommited: false,
        });
    };
    handleCommit = () => {
        this.setState({
            isLoading:true
        })
        setTimeout(() => {
            this.onClear();
            this.setState({
                isLoading:false,
                commitingInvoice:false,
                invoiceCommited:true

            })
        }, 2000)
    }
    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited} = this.state;
        return (
            <>
                {/* {this.state.pageLoading ?
					<KulLoader/>
					: null
				} */}
                <Modal visible={visible} title={false} onOk={this.handleOk} onCancel={this.handleCancel} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Call Invoice
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-8">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <div className="form-group">
                                    <label className="manrope-text-light" style={{ fontSize: "13px", marginBottom: "0rem" }}>
                                        Invoice number
                                    </label>
                                    <br />
                                    {/* <small style={{color:'red'}}>Invoice number invalid <i className="fa fa-warning"/></small> */}
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "2px", background: "rgba(24, 78, 174, 0.03)", height: "186px", padding: "30px" }}>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Student Name
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    Okoro Kingsley
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Department
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    Science Laboratory Technology
                                </p>
                            </div>

                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Collection
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    School Fees
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "12px" }}>
                                    Year
                                </label>
                                <p style={{ fontSize: "18px" }} className="drk-text manrope-text cmt-1">
                                    2021 - 2022
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "46px" }}>
                            <div className="col-sm-12 col-xl-8">
                                <p style={{ fontSize: "12px" }} className="drk-text manrope-text cmt-1">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }} onClick={this.promptCommitInvoice}>
                                    Commit Transaction
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal visible={commitingInvoice} title={false} onOk={this.closeCommit} onCancel={this.closeCommit} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Commit Tranaction
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-10">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <PinInput
                                    length={4}
                                    focus
                                    // disabled

                                    ref={(p) => (this.pin = p)}
                                    type="numeric"
                                    onChange={this.onChange}
                                    inputMode="number"
                                    style={{padding: '10px', width:'500px', fontSize:'20px'}}  
                                    inputStyle={{borderColor: '#6b666652'}}
                                    // inputFocusStyle={{borderColor: 'blue'}}
                                    // onComplete={(value, index) => {}}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    className="manrope"
                                />
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "46px" }}>
                        <div className="col-sm-3">
                                <button className="btn btn-primary manrope-text-light" disabled={isLoading ? true : false} style={{ fontSize: "14px" }} onClick={this.handleCommit}>
                                    Continue
                                </button>
                            </div>
                            <div className="col-sm-12 col-xl-2">
                                <p onClick={this.closeCommit} style={{ fontSize: "12px", marginTop:"10px", cursor:'pointer' }} className="drk-text manrope-text">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                {isLoading ? <ClickLoader/> : null}
                            </div>
                            
                        </div>
                    </div>
                </Modal>
                <Modal visible={invoiceCommited} title={false} onOk={this.closeCommitted} onCancel={this.closeCommitted} footer={false} width={!isMobile ? 700 : null}>
                    <div className="modal-top">
                        <p className="manrope-text drk-text" style={{ fontSize: "32px" }}>
                            Transaction Completed
                        </p>

                        <div className="row cmt-2">
                            <div className="col-sm-10">
                                <p className="manrope-text-light" style={{ fontSize: "13px" }}>
                                Your new user can start using the account within 24 hours. 
In most cases, it should just take few minutes
                                </p>
                            </div>
                        </div>

                        <div className="row" style={{ marginTop: "2px", border:'1px dashed #1B52C4', height: "186px", padding: "30px" }}>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Student Name
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    Okoro Kingsley
                                </p>
                            </div>
                            <div className="col-sm-6">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Department
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    Science Laboratory Technology
                                </p>
                            </div>
                            <div className="col-sm-2">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Status
                                </label>
                               <img src={badge}/>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Collection
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    School Fees
                                </p>
                            </div>
                            <div className="col-sm-8">
                                <label className="label-control manrope" style={{ color: "#84818A", fontSize: "10px" }}>
                                    Year
                                </label>
                                <p style={{ fontSize: "16px" }} className="drk-text manrope-text cmt-1">
                                    2021 - 2022
                                </p>
                            </div>
                        </div>


                        <div className="row" style={{ marginTop: "46px" }}>
                        <div className="col-sm-4">
                                <button className="btn btn-primary manrope-text-light" style={{ fontSize: "14px" }}>
                                    <img src={printer}/>&nbsp; Print Receipt &nbsp;
                                </button>
                            </div>
                            <div className="col-sm-12 col-xl-2">
                                <p onClick={this.closeCommitted} style={{ fontSize: "12px", marginTop:"10px", cursor:'pointer' }} className="drk-text manrope-text">
                                    Close
                                </p>
                            </div>
                            <div className="col-sm-12 col-xl-4">
                                {isLoading ? <ClickLoader/> : null}
                            </div>
                            
                        </div>
                    </div>
                </Modal>

                
                <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>
                {/* <Toaster position="top-center" reverseOrder={false} /> */}

                <div className="container-fluid py-5">
                <CallInvoice/>

                    {/* <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                Good {resolveDateTime("timeOfDay")}, Max
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p>
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px" }} onClick={this.showModal}>
                                Call Invoice
                            </button>
                        </div>
                    </div> */}

                    <div className="row" style={!isMobile ? { marginTop: "5vh" } : null}>
                        <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Total inflow
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                - ₦3,356,000
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Total outflows
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                ₦67,083,000
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-4 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Active Collections
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                1,344
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>
                        <div className="col-12 col-sm-6 col-xl-9 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Collection Status
                                            </p>
                                            <p className="manrope-text drk-text" style={{ fontSize: "32px", lineHeight: "12px" }}>
                                                248,500
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <p className="manrope-text-light" style={{ fontSize: "12px" }}>
                                                    Filter by <span style={{ color: "#1B52C4" }}>months</span>
                                                </p>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                    <Bar data={data} options={options} width={70} height={20} />
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text drk-text text-center" style={{ fontSize: "15px" }}>
                                                Collection Statisfaction
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-12 col-xl-12 text-center">
                                        <main className="pie-main">
                                            <section className="text-center pie-section">
                                                <div class="pieID pie">
                                                    <div className="mid-chart text-center">
                                                        <p className="manrope" style={{ fontSize: "28px", lineHeight: "0.7px" }}>
                                                            75,5%
                                                        </p>
                                                        <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "0px" }}>
                                                            Total Collections
                                                        </p>
                                                    </div>
                                                </div>
                                                <ul class="pieID legend">
                                                    <li>
                                                        <em>Humans</em>
                                                        <span>250</span>
                                                    </li>
                                                    <li>
                                                        <em>Dogs</em>
                                                        <span>60</span>
                                                    </li>
                                                    <li>
                                                        <em>Cats</em>
                                                        <span>50</span>
                                                    </li>
                                                </ul>
                                            </section>
                                        </main>
                                    </div>
                                    <div className="container" style={{ marginTop: "-54px" }}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    <img style={{ width: "7px", height: "7px" }} src={shape} /> &nbsp;Satisfied
                                                </p>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    35,5k collected
                                                </p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    <img style={{ width: "7px", height: "7px" }} src={shape2} /> &nbsp;Not Satisfied
                                                </p>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    35,5k collected
                                                </p>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    <img style={{ width: "7px", height: "7px" }} src={shape3} /> &nbsp;Neutral
                                                </p>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="manrope-text-light" style={{ fontSize: "11px" }}>
                                                    35,5k collected
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>
                        <div className="col-12 col-sm-6 col-xl-6 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Monthly Recurring Revenue
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                ₦156,0980
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "20px", textAlign: "right" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                                <span className="manrope-text-light"> 2.9%</span>
                                                <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                    In selected period
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-xl-12">
                                        <Line data={LineData} options={optionsLine} height={100} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-xl-6 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px" }}>
                                                Net Revenue
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                ₦186,122
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "20px", textAlign: "right" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                                <span className="manrope-text-light"> 19.9%</span>
                                                <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                    In selected period
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-xl-12">
                                        <Line data={LineData2} options={optionsLine} height={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HODDashboard);
