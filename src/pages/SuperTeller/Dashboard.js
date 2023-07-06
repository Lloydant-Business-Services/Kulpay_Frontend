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
import {resolveDateTime} from "../../utils/helpers";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { enquireScreen } from "enquire-js";
import { Bar, Line } from "react-chartjs-2";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import $ from "jquery";
import { Progress, Tooltip } from "antd";

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
createPie(".pieID.legend", ".pieID.pie");


class SuperTellerDashboard extends Component {
    state = {
        pageLoading: false,
        institutionDetails: [],
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

        // Endpoint.getInstitutionDetails()
        //     .then((res) => {
        //         this.setState({ institutionDetails: res.data, pageLoading: false });
        //     })
        //     .catch((error) => {
        //         this.loadDataError(error, this);
        //         this.setState({ pageLoading: false });
        //     });
    };

    componentDidMount() {
        setTimeout(() => {
            $("#preloader").delay(450).fadeOut("slow");
            
        }, 1800);
        setTimeout(() => {
            createPie(".pieID.legend", ".pieID.pie");
        }, 2000)
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        this.loadDataFromServer();
    }

    render() {
        require("antd/dist/reset.css");
        const { isMobile } = this.state;
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

                <div className="container-fluid py-5">
                    <div className="row">
                    <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                    <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                        {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                        Good {resolveDateTime("timeOfDay")}, Max
                    </h1>
                    <p className="manrope-text-light" style={{ fontSize: "14px", marginTop:'-16px' }}>
                        Here’s what’s going on with your fee collections
                    </p>
                    </div>
                    <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{textAlign:'right'}}>
                    <h1 className="manrope-text-light" style={!isMobile ? { fontSize: "20px"} : { fontSize: "16px" }}>
                        {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                        {resolveDateTime("currentDay")} 
                    </h1>
                    <p className="manrope-text-light" style={{ fontSize: "14px", marginTop:'-14px' }}>
                    {resolveDateTime("today")}
                    </p>
                    </div>
                    </div>

                   <div className="row" style={!isMobile ? { marginTop: "5vh" } : null}>
                       
                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                               Total inflow
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               ₦3,356,000
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

                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
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

                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
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
                       
                   <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                              Active Vendors
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               45
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
                                            <div className="" style={{marginRight:'20px'}}>
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                                <a className="manrope-text-light" style={{color:'#1B52C4', fontSize:'14px'}}>View all</a>
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
                                                                345
                                                            </p>
                                                            <p className="manrope-text-light" style={{ fontSize: "12px", color: "#84818A", marginTop: "0px" }}>
                                                                Total Collections
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <ul class="pieID legend">
                                                        <li>
                                                            <em>Humans</em>
                                                            <span>130</span>
                                                        </li>
                                                        <li>
                                                            <em>Dogs</em>
                                                            <span>60</span>
                                                        </li>
                                                        <li>
                                                            <em>Cats</em>
                                                            <span>50</span>
                                                        </li>
                                                        <li>
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
                                                        </li>
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
                                                    <tr className="manrope-text" style={{color:'#84818A', fontSize:'12px'}}>
                                                        <th>DEPARTMENT</th>
                                                        <th>NEW</th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={green}/> &nbsp; Accounting</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={orange}/> &nbsp; Hostel</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={pink}/> &nbsp; School Fee</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={ash}/> &nbsp; Matriculation</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="col-12 col-sm-12 col-xl-4">
                                            <table class="table table-borderless">
                                                <thead>
                                                    <tr className="manrope-text" style={{color:'#84818A', fontSize:'12px'}}>
                                                        <th>DEPARTMENT</th>
                                                        <th>NEW</th>
                                                        <th>TOTAL</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="manrope-text drk-text"><img src={yellow}/> &nbsp; Exam Levy</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={blue}/> &nbsp; Post UTME</td>
                                                        <td className="manrope-text-light">12,202</td>
                                                        <td className="manrope-text-light">55.2k</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="manrope-text-light drk-text"><img src={lightblue}/> &nbsp; Departmental Dues</td>
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

                    <div className="row" style={!isMobile ? { marginTop: "2vh" } : null}>

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
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                               
                                               
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
                                    {/* <Bar data={data} options={options} width={50} height={20} /> */}
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
                                                {/* <Unicons.UilBuilding size="20"/> */}
                                               
                                               
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

                   
                    </div>
                </div>
            </div>
        
        
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuperTellerDashboard);
