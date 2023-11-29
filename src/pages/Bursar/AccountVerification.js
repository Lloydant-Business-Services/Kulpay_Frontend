import { Steps, Button, message, Upload, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { enquireScreen } from "enquire-js";
import done_all from "../../assets/images/done_all.png";
import id_badge from "../../assets/images/id_badge.png";
import facial from "../../assets/images/facial.png";
import contactCard from "../../assets/images/contactCard.png";
import { Fade } from "reactstrap";
import { InboxOutlined } from "@ant-design/icons";
import ClickLoader from "../../components/Loader/PageLoader/ClickLoader";
import { useMergeState } from "../../utils/helpers";
import { logOutUser, updateStorage } from "../../utils/auth";
import { boardingStatus } from "../../utils/Identifiers";

import { faGlasses } from "@fortawesome/free-solid-svg-icons";
import kulCheck from "../../assets/images/isCheck2.png";
import { Link } from "react-router-dom"
import $ from "jquery";
import Endpoint from "../../utils/endpoint";

import logo from "../../assets/images/17.png";
import { StageSpinner } from "react-spinners-kit";

const { Dragger } = Upload;
const { Step } = Steps;
let isMobile;
enquireScreen((b) => {
    isMobile = b;
});
let documentUpload;
let instLetter;
const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
            documentUpload = info.fileList[0];
            console.log(info.file, info.fileList[0], "success");


        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};
const letterProps = {
    name: "file",
    multiple: false,
    maxCount: 1,
    //action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
            console.log(info.file, info.fileList);
        }
        if (status === "done") {
            message.success(`${info.file.name} file uploaded successfully.`);
            instLetter = info.fileList[0];
            console.log(info.file, info.fileList[0], "success");


        } else if (status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
};
const steps = [
    {
        title: (
            <p className="manrope-text" style={{ fontSize: "16px" }}>
                Personal Information
            </p>
        ),
        content: "First-content",
    },
    {
        title: (
            <p className="manrope-text" style={{ fontSize: "16px" }}>
                Personal Verification
            </p>
        ),
        content: "Second-content",
    },
    {
        title: (
            <p className="manrope-text" style={{ fontSize: "16px" }}>
                Institution Verification
            </p>
        ),
        content: "Last-content",
    },
];

const AccountVerification = () => {
    const [state, setState] = useMergeState({
        redirect: false,
        isLoading: false,
        isVerified: false,
        isSaved: false,
        payLoad: JSON.parse(localStorage.getItem('_IDENTITY_')),
        inst_type:"-",
        stateList:[],
        instReturnList:[]
        //personDetails:"hghhh"     
    });

    let [current, setCurrent] = React.useState(0);
    //const [state, setState] = useState(initialState);

    const next = () => {
        setCurrent(current + 1);
        if (state.payLoad.hasDonePersonalVerification && current == 1) {
            setCurrent(current + 1);

        }
        else {
            console.log(current, "curr")
            if (current == 1) {

                if (documentUpload == null || state.payLoad.personId == null) {
                    alert("Select a document to continue")
                    setCurrent(current = 1)
                    return;
                }
                var personVerified = verifyPerson();
                //alert(personVerified)
                if (personVerified == true) {
                    //alert("true")
                    //setState({isSaved:true})
                    //setCurrent(current + 1);
                }
                else {
                    //if(current == 1){
                    // setCurrent(current -1);

                    //}
                }
            }
        }


    };

    const prev = () => {
        //loadDataFromServer();
        setCurrent(current - 1);
    };
    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 2000);
    };

    const submitRequest = () => {

        if (instLetter == null || state.payLoad?.personId == null) {
            alert("Select a document to continue")
            return false;
        }
        setState({ isLoading: true })
        let formData = new FormData;
        //formData.append("InstitutionName", state.inst_name);
        formData.append("InstitutionDomainName", state.inst_domain);
        formData.append("InstitutionAddress", state.inst_address);
        formData.append("InstitutionId", state.inst_select);
        formData.append("BursarPersonId", state.payLoad.personId);
        formData.append("DocumentType", 2);
        formData.append("AuthorizationLetter", instLetter.originFileObj);

        Endpoint.InstitutionVerification(formData)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    updateStorage(state.inst_select, boardingStatus.AwaitingApproval, state.inst_type)

                    setTimeout(() => {
                        setState({ isLoading: false, isVerified: true })
                    }, 2000)

                }
                setState({ isLoading: false })
            })
            .catch((error) => {
                console.log(error)
                setState({ isLoading: false })
            });
    }
    const closeItems = () => {
        setState({ isVerified: false })

    }
    const getInstitutionType = () => {
        Endpoint.getInstitutionType()
            .then((res) => {
                setState({
                    institutionType: res.data
                });

            })
            .catch((error) => {
                //loadDataError(error, this);
                //this.setState({ pageLoading: false });
            });
    }
    const handleInput = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        setState({ [name]: value })

        console.log(target.text)
        console.log(state?.documentType)
        $("#yourdropdownid option:selected").text();

    }

    const handleStateInstitution = (e) => {
        const selectedInstType = e.target.value;
        setState({inst_type: selectedInstType})
        Endpoint.getStateInstitutionList(state.inst_state, selectedInstType)
        .then((res) => {
            console.log(res, "instss")
            setState({instReturnList: res.data})
        })
        .catch((err) => {

        })

    }

    const loadAllStates = () => {
        Endpoint.getAllState()
        .then((res) => {
            console.log(res.data, "states")
            setState({
                stateList:res.data
            })
        })
        .catch((err) => {

        })
    }
    const loadDataFromServer = () => {
        // setState({
        //     personDetails: "res.data"
        // });
        loadAllStates();
        $("#preloader").fadeIn();
        Endpoint.getPersonDetails(state.payLoad?.personId)
            .then((res) => {
                setState({
                    personDetails: res.data
                });
                // setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
                //}, 1500);
            })
            .catch((error) => {
                //loadDataError(error, this);
                //this.setState({ pageLoading: false });
            });
        getInstitutionType();
    };
    const verifyPerson = () => {
        if (documentUpload == null || state.payLoad.personId == null) {
            alert("Select a document to continue")
            return false;
        }
        $("#preloader").delay(450).fadeIn("slow");
        let formData = new FormData;
        formData.append("PersonId", state.payLoad.personId);
        formData.append("DocumentType", 1);
        formData.append("Document", documentUpload.originFileObj);

        Endpoint.personVerification(formData)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    $("#preloader").delay(450).fadeOut("slow");
                    return true;
                }
                //$("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                console.log(error)
                $("#preloader").delay(450).fadeOut("slow");

                return false;
                //loadDataError(error, this);
                //this.setState({ pageLoading: false });
            });

    }

    const verifyInstitution = () => {
        if (documentUpload == null || state.payLoad.personId == null) {
            alert("Select a document to continue")
            return false;
        }
        $("#preloader").delay(450).fadeIn("slow");
        let formData = new FormData;
        formData.append("PersonId", state.payLoad.personId);
        formData.append("DocumentType", 2);
        formData.append("Document", documentUpload.originFileObj);

        Endpoint.personVerification(formData)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    $("#preloader").delay(450).fadeOut("slow");
                    return true;
                }
                $("#preloader").delay(450).fadeOut("slow");
            })
            .catch((error) => {
                console.log(error)
                $("#preloader").delay(450).fadeOut("slow");

                return false;
                //loadDataError(error, this);
                //this.setState({ pageLoading: false });
            });

    }
    useEffect(() => {
        loadDataFromServer();
        // updateStorage("sdsdsdss", null)
        //setCurrent(current + 1);
    }, []);
    require("antd/dist/reset.css");

    return (

        <>
            <div id="preloader">
                <div id="status">
                    <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                    <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                </div>
            </div>
            <Modal visible={state.isVerified}
                title={false}
                // onOk={this.closeCommitted} 
                onCancel={closeItems}
                footer={false}
                width={!isMobile ? 400 : null}>
                <div className="modal-top text-center" style={{ paddingBottom: '20px' }}>
                    <p className="manrope-text drk-text" style={{ fontSize: "23px" }}>
                        Verification request sent
                    </p>

                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-xl-12">
                            <img src={kulCheck} style={{ width: '69px' }} />
                        </div>


                    </div>
                    <div className="row" style={{ marginTop: '20px' }}>

                        <div className="col-sm-12">
                            <p className="manrope-text-light" style={{ fontSize: "14px" }}>
                                {/* Your account was successfully verified. You will now be logged out. Kindly Relogin to continue */}

                                Your details have successfully been recieved! Details on the next steps are on your dashboard
                            </p>
                        </div>
                    </div>


                    <div className="row" style={{ marginTop: '20px' }}>
                        <div className="col-sm-12 col-xl-12">
                            <a className="btn btn-primary manrope-text-light" style={{ fontSize: "14px", width: '170px', padding: '15px' }} 
                            // onClick={() => logOutUser(false)}
                            href="/admin/index"
                            >
                                Go to Dashboard &nbsp;
                            </a>

                        </div>


                    </div>

                </div>
            </Modal>

            <div className={!isMobile ? "py-5" : "py-5"} style={!isMobile ? {maxWidth:"70vw", paddingLeft:"9em"} : null}>
                <div className="card" style={{ marginTop: "50px", background: "#FFF" }}>
                    <div className="card-body" style={isMobile ? { padding: "0.5rem" } : { padding: "3rem" }}>
                        <h2 className="manrope-text" style={!isMobile ? { fontSize: "30px", marginBottom: "20px" } : { fontSize: "17px", marginBottom: "20px" }}>
                            {current == 0 ? "Personal Information" : current == 1 ? "Personal Verification" : current == 2 ? "Institution Verification" : "-"}
                        </h2>
                        {/* <Steps current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps> */}
                        <Steps current={current}>
                            <Step
                                key={"Personal Information"}
                                title={
                                    <p className="manrope-text" style={!isMobile ? { fontSize: "14px" } : { fontSize: "9px" }}>
                                        Personal Information
                                    </p>
                                }
                            />
                            <Step
                                key={"Personal Verification"}
                                title={
                                    <p className="manrope-text" style={{ fontSize: "14px" }}>
                                        Personal Verification
                                    </p>
                                }
                            />
                            <Step
                                key={"Institution Verification"}
                                title={
                                    <p className="manrope-text" style={{ fontSize: "14px" }}>
                                        Institution Verification
                                    </p>
                                }
                            />
                        </Steps>
                        <hr style={{ marginTop: "0px" }} />
                        <div className="steps-content">
                            {current == 0 ? (
                                <Fade>
                                    <div className="custom-form mt-3" style={!isMobile ? { paddingLeft: '40px', paddingRight: '40px' } : null}>
                                        <div className="row">
                                            <div className="col-lg-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control manrope-text-light drk-text" defaultValue={state.personDetails?.firstName} style={{ fontSize: "13px" }} name="first_name" id="user" />
                                                    <label for="user" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        First Name
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" class="form-control manrope-text-light drk-text" defaultValue={state.personDetails?.lastName} style={{ fontSize: "13px" }} name="last_name" id="last_name" />
                                                    <label for="last_name" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Last Name
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={!isMobile ? { marginTop: "40px" } : null}>
                                            <div className="col-lg-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" defaultValue={state.personDetails?.otherName} class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="other_name" id="other_name" />
                                                    <label for="other_name" class="animated-label manrope-text" style={{ fontSize: "13px", top: "-1px" }}>
                                                        Other names
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" defaultValue={state.personDetails?.email} class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="email" id="email" />
                                                    <label for="email" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Email address
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row" style={{ marginTop: "40px" }}>
                                            <div className="col-lg-6 col-sm-12">
                                                <div class="form-group">
                                                    <input type="text" defaultValue={state.personDetails?.phoneNo} class="form-control manrope-text-light drk-text" style={{ fontSize: "13px" }} name="phone" id="phone" />
                                                    <label for="phone" class="animated-label manrope-text" style={{ fontSize: "14px", top: "-1px" }}>
                                                        Phone number
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ) : null}

                            {current == 1 ? (

                                <Fade>
                                    <div className="custom-form mt-5">
                                        <div className="row">
                                            <div className="col-sm-12 col-xl-7">
                                                <div className="row">
                                                    <div className="col-sm-12 col-xl-10">
                                                        <div className="card-dash flex-fill" style={{ border: "1px solid #1B52C4", background: "rgba(27, 82, 196, 0.02)", minHeight: "90px" }}>
                                                            <div className="card-body p-3">
                                                                {/* <img src={leftActive} style={{width:'3px', height:'94px'}}/> */}

                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        {/* <p className="manrope-text" style={{ fontSize: "16px" }}>
                                                            Personal Information
                                                        </p> */}
                                                                        <div className="row">
                                                                            <div className="col-sm-2">
                                                                                <img src={id_badge} />
                                                                            </div>
                                                                            <div className="col-sm-10">
                                                                                <p className="manrope-text" style={{ fontSize: "16px", marginTop: "" }}>
                                                                                    Driver’s License &nbsp; <input type={"radio"} name="docType"/>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-sm-2">
                                                                                <img src={id_badge} />
                                                                            </div>
                                                                            <div className="col-sm-10">
                                                                                <p className="manrope-text" style={{ fontSize: "16px", marginTop: "" }}>
                                                                                    Voter's Card &nbsp;  <input type={"radio"} name="docType"/>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-sm-2">
                                                                                <img src={id_badge} />
                                                                            </div>
                                                                            <div className="col-sm-10">
                                                                                <p className="manrope-text" style={{ fontSize: "16px", marginTop: "" }}>
                                                                                    National ID card or NIN Slip &nbsp;  <input type={"radio"} name="docType"/>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-sm-2">
                                                                                <img src={id_badge} />
                                                                            </div>
                                                                            <div className="col-sm-10">
                                                                                <p className="manrope-text" style={{ fontSize: "16px", marginTop: "" }}>
                                                                                    International Passport &nbsp;  <input type={"radio"} name="docType" />
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {state.payLoad?.hasDonePersonalVerification ? <div className="col-xl-2 col-sm-12">
                                                        <img src={done_all} style={{ width: "20px", marginTop: "30px" }} />
                                                    </div> : null}
                                                </div>

                                               
                                            </div>
                                            <div className="col-xl-5 col-sm-12">
                                                <Dragger {...props} customRequest={dummyRequest} disabled={state.payLoad?.hasDonePersonalVerification ? true : false}>
                                                    <p className="ant-upload-drag-icon">
                                                        <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text manrope-text">Click or drag file to this area to upload</p>
                                                    <p className="ant-upload-hint manrope-text-light">Supported Files(png, jpg, jpeg), &nbsp; Max-Size(1mb)</p>
                                                </Dragger>
                                            </div>
                                        </div>
                                    </div>
                                </Fade>
                            ) : null}

                            {current == 2 ? (
                                <Fade>
                                    <div className="row">
                                    <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                    State
                                                </label>
                                                <select className="form-control manrope-text-light" name="inst_state" onChange={e => handleInput(e)}>
                                                    <option>Select State</option>
                                                    {state.stateList && state.stateList.map((x, i) => {
                                                        return (
                                                            <option className="form-control" value={x.id}>{x.name}</option>

                                                        )
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                    Institution Type
                                                </label>
                                                <select className="form-control manrope-text-light" name="inst_type" onChange={e => handleStateInstitution(e)}>
                                                    <option>Select Instistution Type</option>
                                                    {state.inst_state > 0 && state.institutionType && state.institutionType.map((x, i) => {
                                                        return (
                                                            <option className="form-control" value={x.id}>{x.name}</option>

                                                        )
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                     {state?.inst_type == 3 ? "University" : state?.inst_type == 2 ? "Polytechnic" : state?.inst_type == 1 ? "College" : "Institution"}
                                                </label>
                                                <select className="form-control manrope-text-light" name="inst_select" onChange={e => handleInput(e)}>
                                                    <option>Select  {state?.inst_type == 3 ? "University" : state?.inst_type == 2 ? "Polytechnic" : state?.inst_type == 1 ? "College" : "Institution"}</option>
                                                    {state.instReturnList && state.instReturnList.map((x, i) => {
                                                        return (
                                                            <option className="form-control" value={x.institutionId}>{x.institutionName}</option>

                                                        )
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        {/* <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                    Institution Name
                                                </label>
                                                <input className="form-control manrope-text-light" name="inst_name" type="text" placeholder="Enter institution name" onChange={e => handleInput(e)} />
                                            </div>
                                        </div> */}
                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                    Institution Domain
                                                </label>
                                                <input className="form-control manrope-text-light" name="inst_domain" type="text" placeholder="Enter institution website" onChange={e => handleInput(e)} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-xl-6">
                                            <div className="form-group">
                                                <label className="label-control manrope-text-light" style={{ fontSize: "14px" }}>
                                                    Address
                                                </label>
                                                <input className="form-control manrope-text-light" name="inst_address" type="text" placeholder="Enter institution address" onChange={e => handleInput(e)} />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-sm-12">
                                            <Dragger {...letterProps} customRequest={dummyRequest} style={{ padding: '10px' }}>
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <img src={contactCard} />
                                                    </div>
                                                    <div className="col-sm-10 text-left">
                                                        <p className="manrope-text">Institution Authorization Letter</p>
                                                        <p className="ant-upload-hint manrope-text-light">Upload institution authorization letter</p>
                                                    </div>
                                                </div>

                                            </Dragger>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        {/* <div className="col-xl-6 col-sm-12">
                                            <Dragger {...props} customRequest={dummyRequest} disabled style={{ padding: '10px' }}>
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <img src={contactCard} />
                                                    </div>
                                                    <div className="col-sm-10 text-left">
                                                        <p className="manrope-text">Proof of institution address</p>
                                                        <p className="ant-upload-hint manrope-text-light">Upload proof of address</p>
                                                    </div>
                                                </div>

                                            </Dragger>
                                        </div> */}

                                        {/* <div className="col-xl-6 col-sm-12">
                                            <Dragger {...letterProps} customRequest={dummyRequest} style={{ padding: '10px' }}>
                                                <div className="row">
                                                    <div className="col-sm-2">
                                                        <img src={contactCard} />
                                                    </div>
                                                    <div className="col-sm-10 text-left">
                                                        <p className="manrope-text">Institution Authorization Letter</p>
                                                        <p className="ant-upload-hint manrope-text-light">Upload institution authorization letter</p>
                                                    </div>
                                                </div>

                                            </Dragger>
                                        </div> */}
                                    </div>
                                </Fade>
                            ) : null}
                        </div>
                    </div>

                    {/* <div className="steps-content">
          {steps[current].content}
          </div> */}
                    <div className="steps-action mt-3" style={{ padding: "40px" }}>
                        {current < steps.length - 1 && (
                            <button className="btn btn-primary manrope-text" style={{ float: "right", width: "120px", padding: "11px, 24px, 11px, 24px" }} onClick={() => next()}>
                                Next
                            </button>
                        )}
                        {current === steps.length - 1 && (
                            !state.isLoading ? <button className="btn btn-primary manrope-text" style={{ float: "right", width: "120px", padding: "11px, 24px, 11px, 24px" }} onClick={submitRequest}>
                                Submit
                            </button> : <div style={{ float: 'right', paddingRight: '30px' }} className="manrope-text">
                                <ClickLoader /> Processing...
                            </div>
                        )}
                        {current > 0 && (
                            <button className="btn btn-default manrope-text" style={{ float: "left", margin: "0 8px" }} onClick={() => prev()}>
                                Back
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountVerification;
