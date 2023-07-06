import React, { Component } from "react";
import { connect } from "react-redux";
import { mapDispatchToProps, mapStateToProps, stateKeys } from "../../redux/actions";
import illustration from "../../assets/images/illus.png";
import ic_up from "../../assets/images/ic_up.png";
import ic_down from "../../assets/images/ic_down.png";
import green from "../../assets/images/green.svg";
import orange from "../../assets/images/orange.svg";
import ash from "../../assets/images/ash.svg";
import pink from "../../assets/images/pink.svg";
import yellow from "../../assets/images/yellow.svg";
import blue from "../../assets/images/blue.svg";
import lightblue from "../../assets/images/lightblue.svg";
import shape from "../../assets/images/Shape.png";
import shape2 from "../../assets/images/Shape2.png";
import shape3 from "../../assets/images/Shape3.png";
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import * as Unicons from "@iconscout/react-unicons";
import Endpoint from "../../utils/endpoint";
import { loadUserInfo, logOutUser } from "../../utils/auth";
import { resolveDateTime, nairaFormat } from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";
import { boardingStatus } from "../../utils/Identifiers";
import roundIcon from "../../assets/images/Round-icon.png";

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
    var color = [
        "#1B52C4",
        "#20C9AC",
        "#00A5FF",
        "#FFA043",
        "#EBEAED",
        "#FA699D",
        "#FFCE74",
    ];
    for (var i = 0; i < listData.length; i++) {
        var size = sliceSize(listData[i], listTotal);
        iterateSlices(size, pieElement, offset, i, 0, color[i]);
        $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
        offset += size;
    }
}
//createPie(".pieID.legend", ".pieID.pie");


class SuperAdminDashboard extends Component {
    state = {
        pageLoading: false,
        institutionDetails: [],
        outflowState: [],
        inflowState: [],
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),

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
    loadInflowMonthly = () => {
        Endpoint.getMonthlyInfloAmount(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "inflow")
                this.setState({ inflowState: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    }
    loadOutflowMonthly = () => {
        Endpoint.getMonthlyOutflowAmount(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "outflow")

                this.setState({ outflowState: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    }

    loadOutflowMonthly = () => {
        Endpoint.getMonthlyOutflowAmount(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "outflow")

                this.setState({ outflowState: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    }
    loadMonthlyCollectionChart = () => {
        Endpoint.getMonthlyCollectionChart(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res, "outflow")

                this.setState({ mainStat: res.data });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    }
    loadDataFromServer = () => {
        this.setState({ pageLoading: true });
        loadUserInfo();

        Endpoint.getInstitutionDetails()
            .then((res) => {
                this.setState({ institutionDetails: res.data, pageLoading: false });
            })
            .catch((error) => {
                this.loadDataError(error, this);
                this.setState({ pageLoading: false });
            });
    };

    resolveAwaitingApproval = () => {
        if (this.state.payLoad?.onboardingStatus == boardingStatus.AwaitingApproval) {
            setTimeout(() => {
                $("#awaiting").fadeIn("slow");
            }, 5000);
        }
    }
    componentDidMount() {
        this.resolveAwaitingApproval()
        this.loadInflowMonthly()
        this.loadOutflowMonthly()
        this.loadMonthlyCollectionChart()
        setTimeout(() => {
            $("#preloader").delay(450).fadeOut("slow");

        }, 1800);
        setTimeout(() => {
            createPie(".pieID.legend", ".pieID.pie");
        }, 2500)
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        // this.loadDataFromServer();
    }

    render() {
        require("antd/dist/reset.css");
        const { isMobile } = this.state;
        const firstName = this.state.payLoad?.fullName.split(" ")
        return (
            <div style={{ background: "#fbfcff00" }} className="mt-3">
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

                <div id="awaiting">
                    <div style={{ border: '4px solid white', width: '70vw', minHeight: '80vh', backgroundColor: '#2d2da6', marginLeft: 'auto', marginRight: 'auto', marginTop: '5vh', padding: '35px' }}>
                        <div className="col-sm-12" style={{ marginTop: "-2px" }}>
                            <img src={roundIcon} style={{ width: '67px', float: 'right' }} />
                        </div>
                        <center>
                            <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "200px", marginTop: "10px" }} />
                            <p style={{ fontSize: '22px' }} className="text-white quicksand_head">Processing your application...</p>

                        </center>
                        <div style={{ marginTop: "2vh" }}>

                            <p style={{ fontSize: '30px' }} className="text-white quicksand_head">Hi {firstName[0]}!</p>
                            <p style={{ fontSize: '16px' }} className="text-white quicksand">
                                While we have recieved your submission, registrations are subject to vetting and verification by our system. We want to ensure that you get the best of experience and that the institution/organization details provided are authentic.
                                <br />
                                So until then, your access to our exclusive would be on a short hold
                                <br />
                                <br />
                                We are very intentional about customer security and authenticity.
                                <br />
                                An email would be sent accordingly once verification request is processed and confirmed as authentic.   This might take a short while so please be patient with us and check back in a few minutes.

                                <br />
                                <br />
                                Once request is confirmed and approved, you will be granted full access to the exclusive features on Kulpay.<br />
                                Your security and privacy would always be our priority.
                                <br />
                                <br />
                                <span className="quicksand_head" style={{ fontSize: '18px' }}>Thank you for being patient.</span>
                                <br />
                                <br />

                                <span>
                                    <a className="quicksand_head" href="/" style={{ textDecoration: "underline", color: "#fff" }}>Click here to learn more about Kulpay while you wait</a>
                                    &nbsp;
                                    &nbsp;
                                    OR
                                    &nbsp;
                                    &nbsp;
                                    <a className="quicksand_head" onClick={() => logOutUser()} style={{ textDecoration: "underline", color: "#fff", cursor: 'pointer' }}>Log Out</a></span>


                                {/* Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. */}
                            </p>
                        </div>
                        <br />

                        <div className="col-sm-12" style={{ marginTop: "-2px" }}>
                            <img src={roundIcon} style={{ width: '67px' }} />
                        </div>
                    </div>
                    {/* <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                    </div> */}
                </div>
                {/* <Toaster position="top-center" reverseOrder={false} /> */}

                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                Good {resolveDateTime("timeOfDay")}, {firstName[0]}
                                {/* Admin<span style={{fontSize:'22px'}}>({firstName[0]})</span> */}
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: '-16px' }}>
                                Here’s what’s going on with your fee collections
                            </p>
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: 'right' }}>
                            <h1 className="manrope-text-light" style={!isMobile ? { fontSize: "20px" } : { fontSize: "16px" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                                {resolveDateTime("currentDay")}
                            </h1>
                            <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: '-14px' }}>
                                {resolveDateTime("today")}
                            </p>
                        </div>
                    </div>
                    <div className="row" style={!isMobile ? { marginTop: "5vh" } : null}>

                        <div className="col-sm-6 col-lg-3 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Total inflow ({this.state.inflowState?.label})
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                {this.state.inflowState?.amount > 0 ? nairaFormat(this.state.inflowState?.amount) : 0}

                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}


                                                {this.state.mainStat?.totalActiveCollections ?
                                                    <>
                                                        <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                                    </>

                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Total outflows ({this.state.inflowState?.label})
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                {this.state.outflowState?.amount > 0 ? nairaFormat(this.state.outflowState?.amount) : 0}


                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                {/* <img src={ic_down} style={{ width: "16px", height: "16px" }} /> */}

                                                {this.state.mainStat?.totalActiveCollections ?
                                                    <>
                                                        <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                                    </>

                                                    : null}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Active Collections
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                {this.state.mainStat?.totalActiveCollections}
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}

                                                {this.state.mainStat?.totalActiveCollections ?
                                                    <>
                                                        <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                                    </>

                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                                Merchants
                                            </p>
                                            <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                                {this.state.mainStat?.totalActiveCollections}
                                            </p>
                                        </div>

                                        <div className="mt-2">
                                            <div className="" style={{ marginTop: "40px" }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}

                                                {this.state.mainStat?.totalActiveCollections ?
                                                    <>
                                                        <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                                    </>

                                                    : null}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>
                        <div className="col-12 col-sm-6 col-xl-12 mt-2 mt-xl-0">
                            <div className="card-dash flex-fill">
                                <div className="card-body p-3">
                                    <div className="media">
                                        <div className="media-body">
                                            <p className="manrope-text drk-text" style={{ fontSize: "15px" }}>
                                                Top performing collections
                                                <hr style={{ marginTop: "1rem" }} />
                                            </p>
                                        </div>
                                        <div className="mt-2">
                                            <div className="" style={{ marginRight: '20px' }}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <a className="manrope-text-light" style={{ color: '#1B52C4', fontSize: '14px' }}>View all</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-12 col-xl-3">
                                            <main className="pie-main">
                                                <section className="pie-section">
                                                    <div class="pieID pie">
                                                        <div className="mid-chart">
                                                            <p className="manrope text-center" style={{ fontSize: "28px", lineHeight: "0.7px" }}>
                                                                {this.state.mainStat?.totalActiveCollections}
                                                            </p>
                                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "0px" }}>
                                                                Total Collections
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ul class="pieID legend">
                                                        {/* <li>
                                                        <em>Humans</em>
                                                        <span>130</span>
                                                    </li>
                                                    <li>
                                                        <em>Dogs</em>
                                                        <span>60</span>
                                                    </li> */}
                                                        {/* <li>
                                                        <em>Cats</em>
                                                        <span>50</span>
                                                    </li> */}
                                                        {/* <li>
                                                        <em>Cas</em>
                                                        <span>50</span>
                                                    </li>
                                                    <li>
                                                        <em>Casy</em>
                                                        <span>80</span>
                                                    </li>
                                                    <li>
                                                        <em>exam</em>
                                                        <span>80</span>
                                                    </li> */}
                                                        <li>
                                                            <em>test</em>
                                                            <span>50</span>
                                                        </li>
                                                    </ul>
                                                </section>
                                            </main>
                                        </div>
                                        <div className="col-12 col-sm-12 col-xl-4">
                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr className="manrope-text" style={{ color: '#84818A', fontSize: '12px' }}>
                                                        <th>DEPARTMENT</th>
                                                        <th>NEW</th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={green} /> &nbsp; Accounting</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={orange} /> &nbsp; Hostel</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    {/* <tr>
                                                    <td className="manrope-text-light drk-text"><img src={pink}/> &nbsp; School Fee</td>
                                                    <td className="manrope-text-light">12,202</td>
                                                    <td className="manrope-text-light">55.2k</td>
                                                </tr>
                                                <tr>
                                                    <td className="manrope-text-light drk-text"><img src={ash}/> &nbsp; Matriculation</td>
                                                    <td className="manrope-text-light">12,202</td>
                                                    <td className="manrope-text-light">55.2k</td>
                                                </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-12 col-sm-12 col-xl-4">
                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr className="manrope-text" style={{ color: '#84818A', fontSize: '12px' }}>
                                                        <th>DEPARTMENT</th>
                                                        <th>NEW</th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="manrope-text drk-text"><img src={yellow} /> &nbsp; Exam Levy</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={blue} /> &nbsp; Post UTME</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={lightblue} /> &nbsp; Departmental Dues</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>

                    <div className="col-12 col-sm-6 col-xl-6 mt-2 mt-xl-0">
                        <div className="card-dash flex-fill">
                            <div className="card-body p-3">
                                <div className="media">
                                    <div className="media-body">
                                        <p className="manrope-text" style={{ fontSize: "12px" }}>
                                            Disbursements
                                        </p>
                                       
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{textAlign: "right" }}>
                                           
                                           
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                This month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row" style={{marginTop:'20px'}}>
                                <div className="col-sm-12 col-xl-9">
                                <Bar data={data} options={options} width={50} height={23} />
                                </div>
                                <div className="col-sm-12 col-xl-3">
                                    <p className="manrope drk-text" style={{fontSize:'18px', lineHeight:'16px'}}>₦ 3,575
                                    <br/>
                                    <span className="manrope-text-light" style={{fontSize:'12px', color:'#84818A'}}>Avg. disbursed</span>
                                    </p>
                                    <p className="manrope drk-text" style={{fontSize:'18px', lineHeight:'16px'}}>85.0%
                                    <br/>
                                    <span className="manrope-text-light" style={{fontSize:'12px', color:'#84818A'}}>Average Payed</span>
                                    </p>
                                    <p className="manrope drk-text" style={{fontSize:'18px', lineHeight:'16px'}}>₦ 24,500
                                    <br/>
                                    <span className="manrope-text-light" style={{fontSize:'12px', color:'#84818A'}}>Total Payout</span>
                                    </p>
                                </div>
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
                                        Bonus Performance
                                        </p>
                                       
                                    </div>

                                    <div className="mt-2">
                                        <div className="" style={{textAlign: "right" }}>
                                           
                                           
                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A" }}>
                                                This month
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr style={{ marginTop: "-0.7rem", marginBottom:'30px' }} />
                                <div className="row" style={{marginTop:'-20px'}}>
                                <div className="col-sm-12 col-xl-12">
                                <table class="table table-borderless super-table">
                                            <thead>
                                                <tr className="manrope-text" style={{color:'#84818A', fontSize:'12px'}}>
                                                    <th>DEPARTMENT</th>
                                                    <th>%</th>
                                                    <th>TOTAL</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <td className="manrope drk-text"><img src={green}/> &nbsp; Accounting</td>
                                                    <td className="manrope-text-light">10%</td>
                                                    <td className="manrope-text-light">₦ 3,900</td>
                                                </tr>
                                                <tr>
                                                    <td className="manrope drk-text"><img src={orange}/> &nbsp; Administration</td>
                                                    <td className="manrope-text-light">10%</td>
                                                    <td className="manrope-text-light">₦ 3,900</td>
                                                </tr>
                                                <tr>
                                                    <td className="manrope drk-text"><img src={pink}/> &nbsp; Customer Support</td>
                                                    <td className="manrope-text-light">10%</td>
                                                    <td className="manrope-text-light">₦ 3,900</td>
                                                </tr>
                                                <tr>
                                                    <td className="manrope drk-text"><img src={ash}/> &nbsp; Finance</td>
                                                    <td className="manrope-text-light">10%</td>
                                                    <td className="manrope-text-light">₦ 3,900</td>
                                                </tr>
                                                <tr>
                                                    <td className="manrope drk-text"><img src={yellow}/> &nbsp; Human Resource</td>
                                                    <td className="manrope-text-light">10%</td>
                                                    <td className="manrope-text-light">₦ 3,900</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                </div>
                              
                                </div>
                            </div>
                        </div>
                    </div>

               
                </div> */}
                </div>
            </div>

        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SuperAdminDashboard);
