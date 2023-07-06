import React, { Component } from "react";
import { enquireScreen } from "enquire-js";
import badge from "../../../assets/images/Label.svg";
import pendingBadge from "../../../assets/images/pending.svg";
//import NewCollection from "./NewCollection";
import { Fade } from "reactstrap";
//import printer from "../../assets/images/print.svg";
import $ from "jquery";
import Endpoint from "../../../utils/endpoint";
import { Modal, Button, Menu, Dropdown, Space, Alert } from "antd";
import kulCheck from "../../../assets/images/kulCheck.svg";
import filterIcon from "../../../assets/images/filterIcon.svg";
import editIcon from "../../../assets/images/editIcon.svg";
import deleteIcon from "../../../assets/images/deleteIcon.svg";
import { Table, Skeleton, Drawer, Select, DatePicker, Switch, Radio } from "antd";
import { currencyFormat } from "../../../utils/helpers";
import logo from "../../../assets/images/17.png";
import logoKul from "../../../assets/images/LogoKul.png";
import absu_logo from "../../../assets/images/absu_logo.png";
import { StageSpinner, CircleSpinner } from "react-spinners-kit";
import toast, { Toaster } from "react-hot-toast";
import ClickLoader from "../../../components/Loader/PageLoader/ClickLoader";
import QueueAnim from "rc-queue-anim";
import { stateKeys, BASE_URL } from "../../../redux/actions";
import { nairaFormat, nairaFormatAlt } from "../../../utils/helpers";
import { InputNumber, Checkbox } from 'antd';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';
import { DownOutlined, EllipsisOutlined } from "@ant-design/icons";
import jsPDF from "jspdf"
import "jspdf-autotable"
const { Option, OptGroup } = Select;

const columns = [
    { title: "SN", dataIndex: "key", key: "key" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Programme", dataIndex: "programme", key: "programme" },
    { title: "Department", dataIndex: "department", key: "department" },
    { title: "Matric Mumber", dataIndex: "matricnumber", key: "matricnumber" },
    { title: "Invoice Number", dataIndex: "invoicenumber", key: "invoicenumber" },
    { title: "Gateway", dataIndex: "gateway", key: "gateway" },
    { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
    // { title: "Fixed Amount?", dataIndex: "fixAmount", key: "fixAmount" },
    // { title: "Status", dataIndex: "status", key: "status" },
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
        name: "O. GODSPEED MIRACLE",
        amount: "N22,250.000",
        invoicenumber: "FPI245162536",
        matricnumber: "FPI/ACC/0001",
        paymentDate: "02-02-2022",
        programme: "HND FULL-TIME",
        department: "ACCOUNTANCY",
        gateway: "REMITA",
    },
    {
        key: 2,
        name: "OKEKE JULIAN CHIDINMA",
        amount: "N22,250.000",
        invoicenumber: "FPI2457783536",
        matricnumber: "FPI/COMP/0002",
        paymentDate: "07-02-2022",
        programme: "ND PART-TIME",
        department: "COMPUTER SCIENCE",
        gateway: "REMITA",
    },
    {
        key: 3,
        name: "DIALA EBERE ANN",
        amount: "N22,250.000",
        invoicenumber: "FPI7257783536",
        matricnumber: "FPI/MC/0003",
        paymentDate: "11-04-2022",
        programme: "ND FULL-TIME",
        department: "MASS COMMUNICATION",
        gateway: "ETRANZACT",
    },
    {
        key: 4,
        name: "ODOGWU BINTA CHIAMAKA",
        amount: "N22,250.000",
        invoicenumber: "FPI971162536",
        matricnumber: "FPI/ACC/0001",
        paymentDate: "02-02-2022",
        programme: "HND FULL-TIME",
        department: "ACCOUNTANCY",
        gateway: "PAYSTACK",
    },
];

TweenOne.plugins.push(Children);
class Inflows extends Component {
    state = {
        payLoad: JSON.parse(localStorage.getItem("_IDENTITY_")),
        // pageIgnite:false,
        //paymentSetup: true,
        cloneCount: 0,
        totalValue:0,
        clickStatus: 0,
        globalSelectName: null,
        collectionSelect: "",
        refinement: null,
        inflowSelectValue: "collection",
        vendor_select: null,
        pushObjArr: [],
        deptList: [],
        sessionList:[],
        dynamicSum: "0.00",
        dateFrom: '0001-01-01',
        dateTo: '0001-01-01',
        value: 0.00,
        animation: null,
        formatMoney: true,
        dynamicColumns: [
            { title: "SN", dataIndex: "key", key: "key" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { title: "Programme", dataIndex: "programme", key: "programme" },
            { title: "Department", dataIndex: "department", key: "department" },
            { title: "Matric Mumber", dataIndex: "matricnumber", key: "matricnumber" },
            { title: "Invoice Number", dataIndex: "invoicenumber", key: "invoicenumber" },
            { title: "Gateway", dataIndex: "gateway", key: "gateway" },
            { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        ],
        dynamicColumnsConstant: [
            { title: "SN", dataIndex: "key", key: "key" },
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
            { title: "Programme", dataIndex: "programme", key: "programme" },
            { title: "Department", dataIndex: "department", key: "department" },
            { title: "Matric Mumber", dataIndex: "matricnumber", key: "matricnumber" },
            { title: "Invoice Number", dataIndex: "invoicenumber", key: "invoicenumber" },
            { title: "Gateway", dataIndex: "gateway", key: "gateway" },
            { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        ],
    };

    exportPDF = () => {
        const orientation = "landscape" // portrait or landscape
        const unit = "pt"
        const size = "A4" // Use A1, A2, A3 or A4
        const margins = {
            bottom: 40,
            top: 10,
            left: 10,
            right: 10
        };
        if (typeof window !== "undefined") {
            // const doc = new jsPDF(orientation, unit, size)
            const doc = new jsPDF('landscape', 'pt', "A4", [200, 400]);
            const docWidth = doc.internal.pageSize.getWidth();

            var img = new Image()
            var imgLogo = new Image()
            img.src = logoKul;
            imgLogo.src = logoKul;
            var objToday = new Date(),
                weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
                dayOfWeek = weekday[objToday.getDay()],
                domEnder = function () { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
                dayOfMonth = today + (objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
                months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
                curMonth = months[objToday.getMonth()],
                curYear = objToday.getFullYear();
            var today = dayOfMonth + " " + curMonth + ", " + curYear;
            // curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " +


            doc.setFontSize(15)
            doc.setFont('Times New Roman')

            const footer = "khjlllbk"

            const headers = [
                this.state.dynamicColumns
            ]
            const headerSecond = [
                [
                    "TOTAL"
                ],
            ]
            const totalColumn = [[this.state.totalValue]]
            let bodyFoot = [
                {
                    vc: "Least Punctual: " + this.state.attendanceList?.leastPuntual,
                },
                {
                    vc: "Most Punctual: " + this.state.attendanceList?.mostPuntual,
                },
            ]

            const dora = bodyFoot.map(d => [
                d.vc,

            ])
            const dataBody = this.state.collectionReportState.map((d, i) => [
                i + 1,
                d.name,
                d.amountAlt.toString(),
                d.programme,
                d.department,
                d.matricnumber,
                d.invoicenumber,
                d.gateway,
                d.paymentDate,
            ])

            let content = {
                startY: 220,
                head: headers,
                body: dataBody,
                styles: {
                    fontSize: 7
                },
                theme: 'grid',
                headStyles: {
                    fillColor: '#1B52C4'
                }
            }
            const schName = this.state.payLoad?.institutionName;
            doc.setFont('Arial')
            doc.setFontSize(13)
            doc.addFont("Roboto-Regular.ttf", "Roboto", "normal")
            doc.addFont("Roboto-Bold.ttf", "Roboto", "bold")
            doc.addImage(imgLogo, 'png', 50, 45, 80, 25);
            // doc.text(this.state.payLoad?.institutionName, 50, 45, 75, 25);
            doc.setFont(undefined, 'bold')
            // doc.addImage(imgLogo, 'png', docWidth / 4, 75)
            // doc.text(schName, docWidth / 3, 75)
            doc.text("COLLECTION REPORT", (docWidth / 3) + 42, 63)
            doc.setFont(undefined, 'normal')

            // doc.setFontSize(12);
            // doc.text("info@abiastateuniversity.com", (docWidth / 3) + 50, 92)
            doc.setFont('Arial')
            doc.setFontSize(20);
            // doc.setFontSize(11);
            doc.text("Institution: " + schName, 50, 130)
            doc.setFontSize(11);

            doc.text("BEING GENERATED FOR: ", 50, 150)
            doc.text("DATE GENERATED: " + today, 50, 165)

            doc.setFontSize(13)
            doc.setFont(undefined, 'bold')
            // doc.text("COLLECTION REPORT", (docWidth / 3) + 50, 210)

            doc.autoTable(content)
            var check = doc.autoTableEndPosY() + 15
            doc.autoTable({
                startY: check,
                head: headerSecond,
                body: totalColumn,
                styles: {
                    fontSize: 10,
                    cellWidth: 100,
                },
                theme: 'grid',
                headStyles: {
                    fillColor: '#f1f1f1',
                    textColor: 'black'
                }
            })
            const pageCount = doc.internal.getNumberOfPages();
            const docHeight = doc.internal.pageSize.getHeight();


            for (var i = 1; i <= pageCount; i++) {
                // Go to page i
                doc.setPage(i);
                doc.setFontSize(9);
                doc.setFont(undefined, 'normal')

                doc.text("Powered by KulPay", docWidth - 110, 23) //LANSCAPE ORIENTATION

                doc.setFontSize(9)
                doc.setFont(undefined, 'normal')
                doc.text('Page ' + String(i) + ' of ' + String(pageCount), docWidth - 110, docHeight - 40);
            }

            doc.save(today + " Collection Repoort")
        }
    }
    loadCollectionReportBy = () => {
        this.setState({ loadSpinner: true, filterPool: false });

        // getAllCollectionByPrimaryVendor


        Endpoint.getCollectionBy(this.state.collectionSelect, this.state.payLoad?.institutionId, this.state.programmeSelect, this.state.departmentSelect, this.state.gatewaySelect, this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,
                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        matricnumber: x.regNumber,
                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate

                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount) })

                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });



    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ collectionSelect: value })
        if (value == "all") {
            this.resolveTotalInflowSum("")
        }
        else {
            this.resolveTotalInflowSum(value)
        }
    }

    handleBankChange = (value) => {
        console.log(`selected ${value}`);
        this.setState({ bankSelect: parseInt(value) })
            // this.resolveTotalInflowSum(value)
    }
    handleProgramme = (value) => {
        console.log(`selected ${value}`);
        this.setState({ programmeSelect: value })
    }
    handleRefinement = (value) => {
        console.log(`selected ${value}`);
        this.setState({ refinementValue: value })
    }
    handleRefinementAlt = (value) => {
        console.log(`selected ${value}`);
        this.setState({ refinementValue2: value })
    }
    handleDepartment = (value) => {
        console.log(`selected ${value}`);
        this.setState({ departmentSelect: value })
    }
    handleSession = (value) => {
        console.log(`selected ${value}`);
        this.setState({ sessionSelect: value })
    }

    handleGateway = (value) => {
        console.log(`selected ${value}`);
        this.setState({ gatewaySelect: value })
    }
    onChangeDateFrom = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ dateFrom: dateString })
    }
    onChangeDateTo = (date, dateString) => {
        console.log(date, dateString);
        this.setState({ dateTo: dateString })
    }
    addCollectionSplit = (collectionId, collectionName) => {
        this.setState({
            collection_name: collectionName,
            paymentSetup: true,
            globalCollectionId: collectionId,
        });
    };
    loadInstitutionProgramme = () => {

        console.log(this.state.payLoad?.institutionId)
        Endpoint.getInstitutionProgramme(this.state.payLoad?.institutionId, true)
            .then((res) => {
                console.log(res.data, "colle")
                this.setState({
                    programmeList: res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    loadInstitutionDepartment = () => {
        Endpoint.getAllDepartmentByInstitution(this.state.payLoad?.institutionId, false)
            .then((res) => {
                console.log(res.data, "depts")
                this.setState({
                    deptList: res.data
                });
            })
            .catch((error) => {
                console.log(error, "error")

            });
    }


    loadPaymentGateways = () => {
        Endpoint.getPaymentGateways()
            .then((res) => {
                console.log(res.data, "GAT")
                this.setState({
                    allGateways: res.data,
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
 

    megaLoader = () => {
        if (this.state.refinementValue == "programme") {
            this.loadAllCollectionByProgramme(this.state.collectionSelect)
        }
        else if (this.state.refinementValue == "department") {
            this.loadAllCollectionByDepartment(this.state.collectionSelect)
        }
        else if (this.state.sessionSelect) {
            this.loadAllCollectionBySession(this.state.collectionSelect)
        }
        else if (this.state.refinementValue == "level") {

        }
        else {
            // this.loadAllCollectionDefault(this.state.collectionSelect);
        }
    }

    getAllSession = () => {
        Endpoint.getActiveSession()
            .then((res) => {
                console.log(res.data, "Sessssssssssssssss")
                this.setState({ sessionList: res.data });
            })
            .catch((error) => {
                console.log(error);
                //this.setState({isLoading:false})
            });
    };

    loadAllCollectionDefault = (data) => {
        // getAllCollectionByPrimaryVendor
        Endpoint.getAllCollectionByPrimaryVendor(this.state.payLoad?.institutionId, data, this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,

                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        matricnumber: x.regNumber,
                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate

                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount) })

                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadAllCollectionInflowByBank = () => {
        Endpoint.getCollectionByInflowBank(this.state.payLoad?.institutionId, this.state.bankSelect, parseInt(this.state.sessionSelect), this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        // amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amount: x.amount != null ? <span className="manrope" style={{ fontSize: "13px", color: "#b23131", fontFamily: "monospace" }}>{nairaFormat(x.amount, 2)} <span style={{ fontSize: "12px", color: "#277016" }}> <i style={{ fontSize: "9px" }} className="fa fa-angle-right" /> {nairaFormat(x.recievedAmount, 2)}</span></span> : null,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,

                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        matricnumber: x.regNumber,
                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate

                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount), dynamicSum: nairaFormat(res.data?.totalAmount) })
                this.onClick(res.data?.totalAmount)
                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadAllCollectionByProgramme = (data) => {
        // getAllCollectionByPrimaryVendor
        Endpoint.getAllCollectionByProgramme(this.state.payLoad?.institutionId, data, parseInt(this.state.sessionSelect), parseInt(this.state.programmeSelect),true, this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        // amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amount: x.amount != null ? <span className="manrope" style={{ fontSize: "13px", color: "#b23131", fontFamily: "monospace" }}>{nairaFormat(x.amount, 2)} <span style={{ fontSize: "12px", color: "#277016" }}> <i style={{ fontSize: "9px" }} className="fa fa-angle-right" /> {nairaFormat(x.recievedAmount, 2)}</span></span> : null,
                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,

                        matricnumber: x.regNumber,
                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate

                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount), dynamicSum: nairaFormat(res.data?.totalAmount) })
                this.onClick(res.data?.totalAmount)
                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    loadAllCollectionByDepartment = (data) => {
        // getAllCollectionByPrimaryVendor
        Endpoint.getAllCollectionByDepartment(this.state.payLoad?.institutionId, data, parseInt(this.state.sessionSelect), parseInt(this.state.departmentSelect), true, this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        // amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amount: x.amount != null ? <span className="manrope" style={{ fontSize: "13px", color: "#b23131", fontFamily: "monospace" }}>{nairaFormat(x.amount, 2)} <span style={{ fontSize: "12px", color: "#277016" }}> <i style={{ fontSize: "9px" }} className="fa fa-angle-right" /> {nairaFormat(x.recievedAmount, 2)}</span></span> : null,
                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,

                        matricnumber: x.regNumber,
                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate

                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount), dynamicSum: nairaFormat(res.data?.totalAmount) })
                this.onClick(res.data?.totalAmount)

                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadAllCollectionBySession = (data) => {
        // getAllCollectionByPrimaryVendor
        Endpoint.getAllCollectionBySession(this.state.payLoad?.institutionId, data, parseInt(this.state.sessionSelect), true, this.state.dateFrom, this.state.dateTo)
            .then((res) => {
                //alert("1")
                console.log(res.data)
                this.setState({ loadSpinner: false });

                console.log(res.data, "collectionReport");
                var mappedData = res.data?.reportList.map((x, i) => {
                    return {
                        key: i + 1,
                        name: x.studentName,
                        // amount: x.amount != null ? nairaFormat(x.amount, 2) : null,
                        amount: x.amount != null ? <span className="manrope" style={{ fontSize: "13px", color: "#b23131", fontFamily: "monospace" }}>{nairaFormat(x.amount, 2)} <span style={{ fontSize: "12px", color: "#277016" }}> <i style={{ fontSize: "9px" }} className="fa fa-angle-right" /> {nairaFormat(x.recievedAmount, 2)}</span></span> : null,
                        programme: x.programme.toUpperCase(),
                        department: x.department,
                        matricnumber: x.regNumber,
                        amountAlt: x.amount != null ? nairaFormatAlt(x.amount, 2) : null,

                        invoicenumber: x.invoiceNumber,
                        gateway: x.gateway,
                        paymentDate: x.paymentDate != null ? x.paymentDate.substring(0, 10) : x.paymentDate
                    }
                })

                this.setState({ collectionReportState: mappedData, amountSum: nairaFormat(res.data?.totalAmount), dynamicSum: nairaFormat(res.data?.totalAmount) })
                this.onClick(res.data?.totalAmount)

                setTimeout(() => {

                }, 2000);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    resolveTotalInflowSum = (data) => {
        this.setState({
            resolving: true
        })
        // return
        const collectionId = data == "" ? "" : data
        Endpoint.getInflowSum(this.state.payLoad?.institutionId, collectionId)
            .then((res) => {
                console.log(res, "inflow Amount")
                this.setState({
                    dynamicSum: nairaFormat(res.data),
                    resolving: false
                })
            })
            .catch((err) => {
                console.log(err)
                this.setState({
                    resolving: false
                })
            })
    }


    loadDataFromServer = () => {
        this.getAllSession();
        // $("#preloader").fadeIn();
        this.loadInstitutionProgramme()
        this.loadInstitutionDepartment()
        // this.resolveTotalInflowSum("")
        // this.loadCollectionReportBy();
        this.setState({ loadSpinner: true });
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
                                            <span style={{ color: "#FFA043", cursor: "pointer" }} onClick={() => this.addCollectionSplit(x.collectionId, x.collectionName)}>
                                                Add Collection Split &nbsp; <i className="fa fa-plus" />
                                            </span>
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
                                                        <p style={{ fontSize: "13px" }}> {t.accountName}</p>
                                                    </div>
                                                </div>
                                                <div className="col-sm-3">
                                                    <div class="form-group">
                                                        <p style={{ fontSize: "13px" }}>
                                                            {t.vendorBankName} {t.accountNumber}
                                                        </p>
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
                                        );
                                    })}
                            </div>
                        ),
                    };
                });
                this.setState({
                    allCollections: mappedData,
                    loadSpinner: false,
                });
                console.log(this.state.allCollections, "-");
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                //loadDataError(error, this);
            });

        this.getInstitutionVendors();
        this.loadPaymentGateways();
    };

    getInstitutionVendors = () => {
        //$("#preloader").fadeIn();
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
        console.log(value)
        if (!value) {
            this.setState({
                refinement: false,
                programmeSelect: "",
                departmentSelect: "",
                sessionSelect: "",
                levelSelect: "",
                refinement2: null,
                refinementValue2:null
            })
        }
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
        let mappedPayload = this.state.pushObjArr.map((x) => {
            return {
                vendorBankDetailId: parseInt(x.itemValue),
                collectionId: this.state.globalCollectionId,
                amount: parseInt(x.itemAmount),
            };
        });

        if (mappedPayload != null && mappedPayload.length > 0) {
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
    onChangeMoney = (e) => {
        this.setState({
            formatMoney: e.target.checked
        })
    }

    onClick = (data) => {
        const { dynamicSum, formatMoney } = this.state;
        this.setState({
            animation: {
                Children: {
                    // value: 947525000,
                    value: typeof data === 'number' ? data : 0.00, 
                    floatLength: 2,
                    formatMoney,
                },
                duration: 1000,
            },
            totalValue: nairaFormatAlt(data, 2)
        })
    }

    onChange = (value) => {
        console.log(value)
        this.setState({
            value,
        });
    }
    componentDidMount() {
        //     fetch('http://ip-api.com/json')
        // .then(function (response) {
        //     return response.json();
        // })
        // .then(function (payload) {
        //     console.log(payload);
        // });
        this.fetchInflowBanks();
        this.loadDataFromServer();
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
        console.log(this.state.dynamicColumns, "DynamicColumns");
    }

    handleVendorAmount = (e) => {
        this.setState({
            vendorAmount: e.target.value,
        });

        setTimeout(() => {
            console.log(this.state.vendorAmount);
        }, 1500);
    };

    removeVendor = (data) => {
        var filteredItems = this.state.pushObjArr.filter((x) => {
            return x.itemValue != data;
        });
        this.setState({
            pushObjArr: filteredItems,
        });
    };
    toggleColumnView = (e) => {
        e.preventDefault();
        if (this.state.isMenuVisble) {
            this.setState({ isMenuVisble: false });
        } else {
            this.setState({ isMenuVisble: true });
        }
    };
    resolveColumnVisibilty = (data) => {
        //var doesExist = this.state.dynamicColumns.includes(x => x.key == data.key);
        //console.log(doesExist, "DoesExist")
        var filteredItems = this.state.dynamicColumns.filter((x) => {
            if (x != null && x.key != null) {
                return x.key != data.key;
            } else {
                filteredItems.push(data);
            }
        });

        console.log(filteredItems, "filtered Items");
        this.setState({ dynamicColumns: filteredItems });
    };
    toggleDateFilter = () => {
        if ($('#dateFilter').is(':visible')) {
            $('#dateFilter').toggle('slow')
            this.setState({
                dateFrom: '0001-01-01',
                dateTo: '0001-01-01'
            })
        }
        else {
            $('#dateFilter').toggle('fast')
        }
    }
    fetchInflowBanks = () => {
        Endpoint.getInflowBanks(this.state.payLoad?.institutionId)
            .then((res) => {
                console.log(res.data, "inflow banks");
                this.setState({ inflowBanks: res?.data })
            })
            .catch((err) => {
                console.log(err);
            });
    }
    setInflowType = (e) => {
        this.setState({
            inflowSelectValue: e
        })
        setTimeout(() => {
            console.log(e, "vallll")
        }, 2000);
        // if(e.target.va)
    }
    render() {
        require("antd/dist/reset.css");
        require("../../../assets/css/antDrawerReport.css")
        const { isMobile, visible, loading, commitingInvoice, value, isLoading, invoiceCommited } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1" onClick={() => this.exportPDF()}>PDF</Menu.Item>
                <Menu.Item key="2" onClick={() => this.testExport()}>Excel</Menu.Item>
            </Menu>
        );
        return (
            <>
                <Toaster position="top-center" reverseOrder={false} />




                <div id="preloader" style={{ display: "none" }}>
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
                                        Inflow Report <span style={{ fontSize: "18px" }}>(Collection)</span>
                                    </h1>
                                    <Alert style={{ width: '400px' }} showIcon icon={<i className="fa fa-info-circle" />} type="success" message={<p className="manrope-text-light" style={{ fontSize: "10px" }}>
                                        The inflow reports simply presents/show funds that went into the school account. This can be queried majorly using the collection and bank categories
                                    </p>} />
                                    {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                                </div>
                                <div className="col-md-12" style={{marginTop:'-30px'}}>
                                    <span style={{ fontSize: "14px" }} className="">


                                        <div className="row" style={{ float: "right" }}>
                                            <div className="col-sm-6">
                                                <Dropdown
                                                    visible={this.state.isMenuVisble}
                                                    overlay={
                                                        <Menu onClick={() => this.setState({ isMenuVisble: true })}>
                                                            {this.state.dynamicColumns &&
                                                                this.state.dynamicColumnsConstant.map((x) => {
                                                                    return (
                                                                        <Menu.Item key={x.key}>
                                                                            {x.title} &nbsp; &nbsp; <input type="checkbox" defaultChecked={true} onClick={() => this.resolveColumnVisibilty(x)} />
                                                                        </Menu.Item>
                                                                    );
                                                                })}

                                                        </Menu>
                                                    }
                                                    trigger={["click"]}
                                                >

                                                    <Button style={{ color: "" }} onClick={this.toggleColumnView}>
                                                        Column Selection &nbsp; <EllipsisOutlined />
                                                    </Button>

                                                </Dropdown>
                                            </div>
                                            <div className="col-sm-6">
                                                <Dropdown.Button
                                                    icon={<DownOutlined />}
                                                    overlay={menu}
                                                    style={{ color: "" }}
                                                >
                                                    Export &nbsp; <i className="fa fa-file-pdf-o" />
                                                </Dropdown.Button>
                                            </div>

                                        </div>


                                    </span>

                                    <span style={{ fontSize: "14px", marginLeft: "1px", color: "#930909", cursor: "pointer", fontWeight: "600" }} className="manrope-text">

                                    </span>


                                </div>

                                <div className="col-md-12" style={{ float: "right" }}>
                                    {/* <h1 className="manrope" style={{fontSize:"16px"}}>Inflow amount: <span style={{color:"green", fontSize:"1.625rem"}}>N68,000.00</span></h1> */}
                                    <div className="row mt-1" style={{ float: "right" }}>
                                        {/* <div className="col-sm-12">
                                            <h1 className="manrope" style={{ fontSize: "16px" }}>Inflow amount:</h1>

                                        </div>
                                        <div className="col-sm-12">
                                            {this.state.resolving ?
                                                <>
                                                    <CircleSpinner color="green" backColor="#FFF" frontColor="#FFF" size={25} /></>

                                                : <h1 className="manrope" style={{ fontSize: "16px" }}><span style={{ color: "green", fontSize: "1.625rem" }}>{this.state.dynamicSum}</span></h1>}


                                        </div> */}
                                        <div className="col-sm-12">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    height: '100%',
                                                    minHeight: '100px',
                                                    alignItems: 'center',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                <div style={{ width: '100%', display: "contents" }}>
                                                    <small style={{ fontSize: "14px", padding: "4px", background: "gold", fontWeight: "600" }}>NGN </small>

                                                    <TweenOne
                                                        animation={this.state.animation}
                                                        style={{ fontSize: 66, marginTop: -20, color:"#10804c", fontWeight:"600" }}
                                                    >
                                                       0.00
                                                    </TweenOne>
                                                    {/* <InputNumber
                                                        defaultValue={this.state.value}
                                                        onChange={this.onChange}
                                                    />
                                                    <Checkbox style={{ margin: '0 16px' }} onChange={this.onChangeMoney}> to money</Checkbox>
                                                    <Button
                                                        type="primary"
                                                        style={{ marginBottom: 32 }}
                                                        onClick={this.onClick}
                                                    >
                                                        Start
                                                    </Button> */}
                                                </div>
                                            </div>
                                        </div>




                                    </div>


                                </div>

                            </div>
                            <br />





                        </>

                        <Fade style={{ marginTop: "-120px" }}>
                            <div className="row" style={{ textAlign: 'right' }}>

                            </div>
                            <br />
                            <p className="manrope-text" style={{fontSize:"14px"}}>Select inflow category</p>
                            <div>

                                <Radio.Group style={{ marginTop: '-10px' }} value={this.state.inflowSelectValue} defaultValue="collection" className="manrope-text" onChange={(e) => this.setInflowType(e.target.value)}>
                                    <Radio.Button style={{ fontSize: "11px" }} value="collection">Collection</Radio.Button>
                                    <Radio.Button style={{ fontSize: "11px" }} value="bank">Bank</Radio.Button>
                                    {/* <Radio.Button style={{fontSize:"15px"}} value="stundenttype">Student Type</Radio.Button> */}


                                    {this.state.inflowSelectValue == "" ? null : <div className="mt-4">
                                        <Space direction="horizontal">
                                            Date Range? &nbsp; <Switch onChange={this.toggleDateFilter} />
                                        </Space>
                                    </div>}


                                    <br />
                                    <div id="dateFilter" className="mt-1" style={{ display: 'none' }}>
                                        <Space direction="horizontal">
                                            <DatePicker onChange={this.onChangeDateFrom} />
                                            <DatePicker onChange={this.onChangeDateTo} />

                                        </Space>
                                    </div>
                                </Radio.Group>


                            </div>

                            <Space>

                                {this.state.inflowSelectValue == "collection" ?
                                    <Space>
                                        <Select defaultValue="all" style={{ width: 200 }} onChange={this.handleChange}>
                                            <OptGroup label="Collection">
                                                &nbsp;
                                                <Option value="all">Select Collection</Option>
                                                {/* <Option value="all">All Collection</Option> */}
                                                {this.state.allCollections && this.state.allCollections.map(x => {
                                                    return (
                                                        <Option value={x.id}>{x.name}</Option>
                                                    )
                                                })}

                                            </OptGroup>

                                        </Select>

                                        {/* &nbsp; */}
                                        <Select defaultValue="Session" style={{ width: 200 }} onChange={this.handleSession}>
                                            <OptGroup label="Session">
                                                <Option value="Session">Select Session</Option>
                                                {this.state.deptList && this.state.sessionList.map(x => {
                                                    return (
                                                        <Option value={x.id}>{x.name}</Option>

                                                    )
                                                })}
                                            </OptGroup>

                                        </Select>
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <input name="refinement" type={"checkbox"} onChange={this.handleInput} />
                                        <Select disabled={!this.state.refinement ? true : false} defaultValue="refine" style={{ width: 200 }} onChange={this.handleRefinement}>
                                            <OptGroup label="Filter By">
                                                <Option value="refine">Filter Collection By</Option>
                                                <Option value="programme">Programme</Option>
                                                <Option value="department">Department</Option>
                                                {/* <Option value="session">Session</Option> */}

                                            </OptGroup>

                                        </Select>

                                        {this.state.refinementValue == "programme" ?
                                            <Select disabled={!this.state.refinement ? true : false} defaultValue="Programme" style={{ width: 200 }} onChange={this.handleProgramme}>
                                                <OptGroup label="Programme">
                                                    <Option value="Programme">Select Programme</Option>
                                                    {this.state.programmeList && this.state.programmeList.map(x => {
                                                        return (
                                                            <Option value={x.programmeId}>{x.programmeName}</Option>
                                                        )
                                                    })}
                                                </OptGroup>

                                            </Select>
                                            : null}


                                        {this.state.refinementValue == "department" ?
                                            <Select disabled={!this.state.refinement ? true : false} defaultValue="Department" style={{ width: 200 }} onChange={this.handleDepartment}>
                                                <OptGroup label="Department">
                                                    <Option value="Department">Select Department</Option>
                                                    {this.state.deptList && this.state.deptList.map(x => {
                                                        return (
                                                            <Option value={x.department?.id}>{x.department?.name}</Option>

                                                        )
                                                    })}
                                                </OptGroup>

                                            </Select>
                                            : null}

{/* 
                                        {this.state.refinementValue == "session" ?
                                            <Select disabled={!this.state.refinement ? true : false} defaultValue="Session" style={{ width: 200 }} onChange={this.handleSession}>
                                                <OptGroup label="Session">
                                                    <Option value="Session">Select Session</Option>
                                                    {this.state.deptList && this.state.sessionList.map(x => {
                                                        return (
                                                            <Option value={x.id}>{x.name}</Option>

                                                        )
                                                    })}
                                                </OptGroup>

                                            </Select>
                                            : null} */}

                                    </Space>
                                    :

                                    null



                                }

                                {
                                    this.state.inflowSelectValue == "bank" ?
                                        <Space>
                                            {/* <span style={{display:"none"}}></span> */}
                                            <Select defaultValue="select" style={{ width: 200 }} onChange={this.handleBankChange}>
                                                <OptGroup label="Bank">
                                                    <Option value="select">Select Bank</Option>

                                                    {this.state.inflowBanks && this.state.inflowBanks.map(x => {
                                                        return <Option value={x.id}>{x.name}</Option>;
                                                    })}
                                                </OptGroup>

                                            </Select>
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            <input name="refinement2" type={"checkbox"} onChange={this.handleInput} />
                                            <Select disabled={!this.state.refinement2 ? true : false} defaultValue="refine" style={{ width: 200 }} onChange={this.handleRefinementAlt}>
    <OptGroup label="Filter By">
      <Option value="refine">Filter Collection By</Option>
      {/* <Option value="programme">Programme</Option>
      <Option value="department">Department</Option> */}
      <Option value="session">Session</Option>
      
    </OptGroup>
    
  </Select>

                                            {this.state.refinementValue2 == "programme" ?
                                                <Select disabled={!this.state.refinement2 ? true : false} defaultValue="Programme" style={{ width: 200 }} onChange={this.handleProgramme}>
                                                    <OptGroup label="Programme">
                                                        <Option value="Programme">Select Programme</Option>
                                                        {this.state.programmeList && this.state.programmeList.map(x => {
                                                            return (
                                                                <Option value={x.programmeId}>{x.programmeName}</Option>
                                                            )
                                                        })}
                                                    </OptGroup>

                                                </Select>
                                                : null}


                                            {this.state.refinementValue2 == "department" ?
                                                <Select disabled={!this.state.refinement2 ? true : false} defaultValue="Department" style={{ width: 200 }} onChange={this.handleDepartment}>
                                                    <OptGroup label="Department">
                                                        <Option value="Department">Select Department</Option>
                                                        {this.state.deptList && this.state.deptList.map(x => {
                                                            return (
                                                                <Option value={x.department?.id}>{x.department?.name}</Option>

                                                            )
                                                        })}
                                                    </OptGroup>

                                                </Select>
                                                : null}


                                            {this.state.refinementValue2 == "session" ?
                                                <Select disabled={!this.state.refinement2 ? true : false} defaultValue="Session" style={{ width: 200 }} onChange={this.handleSession}>
                                                    <OptGroup label="Session">
                                                        <Option value="Session">Select Session</Option>
                                                        {this.state.deptList && this.state.sessionList.map(x => {
                                                            return (
                                                                <Option value={x.id}>{x.name}</Option>

                                                            )
                                                        })}
                                                    </OptGroup>

                                                </Select>
                                                : null}

                                        </Space>
                                        : null
                                }
                                {/* <Select defaultValue="Programme" style={{ width: 200 }} onChange={this.handleProgramme}>
    <OptGroup label="Programme">
      <Option value="Programme">Select Programme</Option>
      {this.state.programmeList && this.state.programmeList.map(x => {
            return(
                <Option value={x.programmeId}>{x.programmeName}</Option>
            )
      })}
    </OptGroup>
    
  </Select>

  <Select defaultValue="Department" style={{ width: 200 }} onChange={this.handleDepartment}>
    <OptGroup label="Department">
      <Option value="Department">Select Department</Option>
      {this.state.deptList && this.state.deptList.map(x => {
        return(
            <Option value={x.department?.id}>{x.department?.name}</Option>

        )
      })}
    </OptGroup>
    
  </Select>

  <Select defaultValue="Department" style={{ width: 200 }} onChange={this.handleGateway}>
    <OptGroup label="Department">
      <Option value="Department">Select Gateway</Option>
      {this.state.allGateways && this.state.allGateways.map(x => {
        return(
            <Option value={x.id}>{x.name}</Option>
        )
      })}
     
    </OptGroup>
    
  </Select>

   */}
                                <br />
                                {this.state.inflowSelectValue == "" ? null : <button id="send_btn"
                                    //   disabled={this.state.collectionSelect == null || this.state.collectionSelect == "" ? true : false}
                                    className="btn btn-primary" onClick={this.state.inflowSelectValue == "bank" ? this.loadAllCollectionInflowByBank : this.megaLoader}>Load</button>}
                            </Space>
                            <br />
                            {this.state.loadSpinner ? (
                                <>
                                    {/* <Skeleton active/> */}
                                    <Skeleton active />
                                    <Skeleton active />
                                </>
                            ) : (



                                <Fade>
                                    <Table
                                        columns={this.state.dynamicColumns}
                                        // expandable={{
                                        //     expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                                        //     rowExpandable: (record) => record.name !== "Not Expandable",
                                        // }}
                                        //dataSource={data}
                                        dataSource={this.state.collectionReportState}

                                        className="manrope-text table-responsive mt-4"
                                    />
                                    {/* <button onClick={this.generateReport}>Generate Report</button> */}

                                </Fade>
                            )}
                        </Fade>

                    </div>
                </Fade>
            </>
        );
    }
}

export default Inflows;
