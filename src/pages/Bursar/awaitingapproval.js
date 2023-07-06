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


class Awaiting extends Component {
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


    componentDidMount() {
    
    }


    render() {
        require("antd/dist/reset.css");
        const { isMobile, visible, loading, institutionProgrammeList, value, isLoading, invoiceCommited, allFacultyList, allDepartmentList, sessionList, levelList } = this.state;
        return (
            <>
                <Toaster position="top-center" reverseOrder={false} />
                {/* <div id="preloader">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div> */}
                <Fade>
                    <div className="container-fluid py-5 mt-4">
                      <h2>Awaiting</h2>
                    </div>
                </Fade>

            </>
        );
    }
}

export default Awaiting;
