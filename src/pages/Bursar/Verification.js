import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import illustration from "../../assets/images/illus.png";
import ic_up from "../../assets/images/ic_up.png";
import doneOval from "../../assets/images/doneOval.png";
import done_all from "../../assets/images/done_all.png";

import green from "../../assets/images/green.svg";
import analyze from "../../assets/images/analyze.png";
import leftActive from "../../assets/images/leftActive.png";
import ash from "../../assets/images/ash.svg";
import pink from "../../assets/images/pink.svg";
import yellow from "../../assets/images/yellow.svg";
import blue from "../../assets/images/blue.svg";
import super_sky from "../../assets/images/super_sky.png";
import shape2 from "../../assets/images/Shape2.png";
import shape3 from "../../assets/images/Shape3.png";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import * as Unicons from "@iconscout/react-unicons";
import { resolveDateTime } from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import Endpoint from "../../utils/endpoint";

import TourVerify from "./TourVerify";
import { Progress, Tooltip, Timeline, Tour } from "antd";
import { ClockCircleOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom"

const LineData = {
    labels: ["Acc", "Msc", "Pol", "Eco", "Soc", "Geo"],
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
    labels: ["Acc", "Msc", "Pol", "Eco", "Soc", "Geo", "Med"],
    datasets: [
        {
            label: "# of kulpay1",
            data: [250, 140, 200, 66, 110, 130, 79, 44, 67, 77, 52],
            backgroundColor: "#1B52C4",
            // width:'6px',
            barThickness: 17,
        },
        // {
        //     label: "# of kulpay 2",
        //     data: [122, 163, 222, 111, 177, 144, 54, 81, 32, 56],
        //     backgroundColor: "#F1F4FB",
        //     barThickness: 12,
        // },
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
    var color = ["#1B52C4", "#20C9AC", "#00A5FF", "#FFA043", "#EBEAED", "#FA699D", "#FFCE74"];
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
//createPie(".pieID.legend", ".pieID.pie");

class Verification extends Component {
    state = {
        pageLoading: false,
        institutionDetails: [],
        personDetails:{
            first_name:"Oghenechavwuko"
        },
		payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')), 

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

    loadDataFromServer = () => {
        this.setState({ pageLoading: true });

        Endpoint.getPersonDetails()
            .then((res) => {
                this.setState({ personDetails: res.data });
                setTimeout(() => {
                    $("#preloader").delay(450).fadeOut("slow");
                }, 1800);

            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
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
        // this.loadDataFromServer();
    }

    render() {
        require("antd/dist/reset.css");
        const { isMobile, personDetails } = this.state;
        return (
            <div style={{ background: "#fbfcff00" }}>
                {/* {this.state.pageLoading ?
                <KulLoader/>
                : null
            } */}

                <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={60} />
                    </div>
                </div>

                {/* <Toaster position="top-center" reverseOrder={false} /> */}

                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "33px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                Welcome to KulPay
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Complete your verification to get started
                            </p>
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <h1 className="manrope-text-light" style={!isMobile ? { fontSize: "20px" } : { fontSize: "16px" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                {resolveDateTime("currentDay")}
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-14px" }}>
                                {resolveDateTime("today")}
                            </p>
                        </div>
                    </div>
                    {!isMobile ? (
                        <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>
                            <div className="col-12 col-sm-12 col-xl-12 mt-2 mt-xl-0">
                                <img
                                    src={analyze}
                                    style={
                                        !isMobile
                                            ? {
                                                  height: "112px",
                                                  width: "1440px",
                                                  position: "relative",
                                              }
                                            : null
                                    }
                                />
                                <div style={{ position: "absolute", top: "33px", left: "140px" }}>
                                    <p style={{ fontSize: "16px" }} className="manrope-text drk-text">
                                        Analyze your data with our analyze tools.
                                    </p>
                                    <p style={{ fontSize: "14px", color: "#84818A", marginTop: "-10px" }} className="manrope-text-light">
                                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}
<p className="manrope-text" style={{fontSize:'18px', marginTop:'40px'}}>Things to do</p>
<TourVerify/>
                    {/* <div className="row" style={!isMobile ? { marginTop: "3vh" } : null}>
                        <div className="col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <Timeline>
                                <Link to="/admin/account_verification">
                                <Timeline.Item dot={<img src={doneOval}/>} style={{cursor:'pointer'}} tag={Link} >
                                <div className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={{ background: "#1B52C4", color: "#FFF", height: "102px" }}>

                                            <div className="card-body p-3" style={{borderLeft:'3px solid #05EEC0'}}>
                                        
 
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Personal Information
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", color: "#F1F4FB", fontWeight: "0", marginTop: "-13px" }}>
                                                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px', marginTop:'30px'}}/>
                                    </div>
                                </div>
                            </div>
                                    </Timeline.Item>
                                    </Link>
                                    <Link to="/admin/account_verification">
                                <Timeline.Item dot={this.state.payLoad?.hasDonePersonalVerification ? <img src={doneOval}/> : null}>
                                <div className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={this.state.payLoad?.hasDonePersonalVerification ? { background: "#1B52C4", color: "#FFF", height: "102px" } : { color: "black", height: "102px" }}>
                                            <div className="card-body p-3">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Personal Verification
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", fontWeight: "0", marginTop: "-13px" }}>
                                                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.payLoad?.hasDonePersonalVerification ? <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px'}}/>
                                    </div> : null}
                                </div>
                            </div>
                                </Timeline.Item>
                                </Link>
                                <Link to="/admin/account_verification" >
                                <Timeline.Item dot={this.state.payLoad?.hasDoneInstitutionVerification ? <img src={doneOval}/> : null}>
                                <div className="col-sm-12 col-xl-12">
                                <div className="row">
                                    <div className="col-sm-12 col-xl-11">
                                        <div className="card-dash flex-fill" style={this.state.payLoad?.hasDoneInstitutionVerification ? { background: "#1B52C4", color: "#FFF", height: "102px" } : { color: "black", height: "102px" }}>
                                            <div className="card-body p-3">
                                                <div className="media">
                                                    <div className="media-body">
                                                        <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Institution Verification
                                                        </p>
                                                        <p className="" style={{ fontSize: "14px", fontWeight: "0", marginTop: "-13px" }}>
                                                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.payLoad?.hasDoneInstitutionVerification ? <div className="col-xl-1 col-sm-12">
                                        <img src={done_all} style={{width:'23px'}}/>
                                    </div> : null}
                                </div>
                            </div>
                                </Timeline.Item>
                                </Link>
                               
                            </Timeline>
                            

                           

                            
                        </div>
                    
                    <div className="col-sm-12 col-xl-6 mt-2 mt-xl-0">
                                        <img src={super_sky} style={{maxWidth:'50vh'}}/>
                    </div>
                    </div> */}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
