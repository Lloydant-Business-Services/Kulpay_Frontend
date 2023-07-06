import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../assets/images/NewTeller1.jpg";
// import "../../assets/fonts/font-gilroy.css";
import BitmapSuperTeller from "../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../assets/images/NewSuperAdmin.jpg";
//import remove_red_eye from "../../../assets/images/remove_red_eye.svg";
import TweenOne from 'rc-tween-one';
import KulLoader from "../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
//import { loginUser } from "../../../utils/auth";
import Endpoint from "../../utils/endpoint";
import { handleFormSubmissionError, nairaFormat, calculatePercentage } from "../../utils/helpers";
import { Modal, Button, Space, Alert } from "antd";
import { Link, Redirect } from "react-router-dom";
import { AttentionSeeker, Fade } from "react-awesome-reveal";
import QR from "./QR";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { stateKeys, BASE_URL, BASE_URL_FRONT } from "../../redux/actions";

// import Marquee from 'react-fast-marquee';

//import VerifyIdentity from "./VerifyIdentity";
//import VerifyAccount from "./VerifyAccount";


var Teller = {
    height: "100vh",
    backgroundImage: `url(${Bitmap})`,
    backgroundSize: "cover",
};
var SuperTeller = {
    height: "100vh",
    backgroundImage: `url(${BitmapSuperTeller})`,
    backgroundSize: "cover",
};
var SuperAdmin = {
    height: "100vh",
    backgroundImage: `url(${Bitmap})`,
    backgroundSize: "cover",
};

var SuperAdminMobile = {
    height: "38vh",
    backgroundImage: `url(${BitmapAdmin})`,
    backgroundSize: "cover",
    marginTop: "0px",
};
function error() {
    Modal.error({
        title: "This is an error message",
        content: "some messages...some messages...",
    });
}
class CreateAccount extends Component {
    state = {
        resolveRole: this.props.location?.state?.identifier,
        invoiceProps: this.props.location?.state?.referrer,
        availableGateways: this.props.location?.state?.referrer?.paymentGateways,
        verify_identity: false,
        create_account: true,
        amountProps: this.props.location?.state?.referrer?.amount,
        formatMoney:true,
        mockObj: {
            emailAddress: "miracleoghenemado@gmail.com",
            id: "2d948261-05c7-4e73-a074-47d1fada7866",
            isEmail: false,
            isPhoneNo: false,
            phoneNo: "08068247820",
            // emailAddress: "miracle.speed@yahoo.com",
            // id: "8c1d0f3b-ca83-47a6-a113-2ec07c27d3f8",
            // isEmail: false,
            // isPhoneNo: false,
            // phoneNo: "07088582107"
        }
        // verify_account:true
    };
    handleInput = (event) => {
        this.setState({ validationError: false })
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    onChangeEmail = (e) => {
        if (!e.target.value.includes("@")) {
            this.setState({ isEmailInvalid: true, isEmailValid: false })
        }
        if (e.target.value.includes("@")) {
            this.setState({ isEmailInvalid: false, isEmailValid: true, email: e.target.value })
        }
    }

    passwordCompare = (e) => {
        if (e.target.value != this.state.password) {
            this.setState({ passwordMismatch: true, passwordMatch: false })
        }
        if (e.target.value === this.state.password) {
            this.setState({ passwordMismatch: false, passwordMatch: true, confirm_password: e.target.value })
        }
    }
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader2").delay(450).fadeOut("slow");
                this.onClick(this.state.invoiceProps?.amount)
            }, 1000);
           
        }
    };
    handleValidation = () => {
        let isAgreed = document.getElementById("isAgreed");
        if (this.state.first_name == null || this.state.last_name == null) {
            this.setState({ validationError: true, validationMessage: "Enter First name and Last name" })
            return false;
        }
        if (this.state.email == null || !this.state.email.includes("@")) {
            this.setState({ validationError: true, validationMessage: "Enter a valid email address" })
            return false;
        }
        if (this.state.confirm_password != this.state.password) {
            this.setState({ validationError: true, validationMessage: "Password and confirm password mismatch!" })
            return false;
        }
        if (!isAgreed.checked) {
            this.setState({ validationError: true, validationMessage: "Agree to our terms and conditions." })
            return false;
        }
        return true;
    }
    handleCreateAccount = () => {
        setTimeout(() => {
            this.setState({
                //responseData:res.data,
                create_account: false,
                verify_identity: true,
            })
            $("#preloader2").fadeOut("slow");

        }, 1000);
        const isValidated = this.handleValidation();
        if (isValidated) {
            $("#preloader2").fadeIn("slow");
            const payload = {
                "firstName": this.state.first_name,
                "lastName": this.state.last_name,
                "emailAddress": this.state.email,
                "phoneNo": this.state.phone,
                "password": this.state.password
            }

            Endpoint.schoolSignUp(payload)
                .then((res) => {
                    console.log(res)
                    console.log(res.data)
                    setTimeout(() => {
                        this.setState({
                            responseData: res.data,
                            create_account: false,
                            verify_identity: true,
                        })
                        $("#preloader2").fadeOut("slow");

                    }, 1000);
                })
                .catch((error) => {
                    handleFormSubmissionError(error, this);
                })

        }

    };
    onChangeMoney = (e) => {
        this.setState({
            formatMoney: e.target.checked
        })
    }

    onClick = (data) => {
        // const { dynamicSum, formatMoney } = this.state;
        console.log(data, "setttttt")
        this.setState({
            animation: {
                Children: {
                    value: typeof data === 'number' ? data : 10000,
                    floatLength: 2,
                    formatMoney:true,
                },
                duration: 1000,
            },
            value: data
        })
    }

    onChange = (value) => {
        console.log(value)
        this.setState({
            value,
        });
    }

    selectPaymentGateway = (data, percentageAmt) => {

        console.log(data, percentageAmt)
        var defaultAmount = this.state.amountProps;
        console.log(defaultAmount, "defaultAmount")
        this.onClick(defaultAmount + parseFloat(percentageAmt))
        console.log(data)

        this.setState({
            gatewaySelect: data
        })
    };
    componentDidMount() {
        setTimeout(() => {
            this.isLoadedFunc();
            this.loadInstitutionProgramme(this.state.invoiceProps?.institutionId)
            this.loadInstitutionDepartment(this.state.invoiceProps?.institutionId)
            this.loadInstitutionLevel(this.state.invoiceProps?.institutionId)
            console.log(this.state.invoiceProps, "invoice props")
        }, 2000);

        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
  
//  calculatePercentage = (number, percentage) => {
//     if (typeof number !== 'number' || isNaN(number) || typeof percentage !== 'number' || isNaN(percentage)) {
//         return 'Invalid input. Please provide valid numbers.';
//     }

//     const result = (percentage / 100) * number;
//      this.setState({ resolvedAmount: nairaFormat(result, 2)})
//      return (percentage / 100) * number;
// }

  

    executeInitializeTransaction = (e) => {
        e.preventDefault();
        if(!this.state.gatewaySelect){
            alert("Select Gateway to continue")
            return;
        }
        $("#preloader2").fadeIn()
        let payload ={
            "email": this.state.email || this.state.invoiceProps?.email,
            "referenceNumber": this.state.invoiceProps?.systemPaymentReference,
            "portalIdentifier": this.state.invoiceProps?.clientPortalIdentifier,
            "gateway": this.state.gatewaySelect,
            "amount": this.state.invoiceProps?.amount,
            "programmeId": this.state.programmeSelect,
            "departmentId": this.state.departmentSelect,
            "levelId": this.state.levelSelect,
            "collectionId": this.state.invoiceProps?.collectionId,
            "amountChargesInclusive": this.state.value
          }
        Endpoint.initializeTransaction(payload)
        .then((res) => {
            console.log(res.data)
            window.open(BASE_URL_FRONT+"invoice2?reference="+res?.data?.systemReference)
            $("#preloader2").fadeOut()

            // this.setState({
            //     verificationRedirect: true,
            //     responseData: res.data,
            //     invoiceData: this.state.invoiceProps
            // })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleLevelChange = (event) => {
        this.setState({ levelSelect: event.target.value });
    };

    handleProgrammeChange = (event) => {
        this.setState({ programmeSelect: event.target.value });
    };
    handleDepartmentChange = (event) => {
        this.setState({ departmentSelect: event.target.value });
    };

    loadInstitutionProgramme = (data) => {
        Endpoint.getInstitutionProgramme(data, false)
        .then((res) => {
            console.log(res.data[0], "programmes")
            this.setState({
                programmeList: res.data
            });
        })
        .catch((error) => {
            //loadDataError(error, this);
            console.log(error, "error")

        });
    }

    loadInstitutionDepartment = (data) => {
        Endpoint.getAllDepartmentByInstitution(data, false)
        .then((res) => {
            console.log(res.data[0], "depts")
            this.setState({
                deptList: res.data
            });
        })
        .catch((error) => {
            console.log(error, "error")

        });
    }

    loadInstitutionLevel = (data) => {
        Endpoint.getAllLevelByInstitution(data)
        .then((res) => {
            console.log(res.data, "levels")
            this.setState({
                levelList: res.data
            });
        })
        .catch((error) => {
            //loadDataError(error, this);
            console.log(error, "error")

        });
    }

    
    render() {
        if (this.state.verificationRedirect) {
            return <Redirect 
            to={{
                pathname: "/invoice2",
                state: { referrer: this.state.responseData, invoiceObj: this.state.invoiceData }
              }}
            />;
            
          }
        require("antd/dist/reset.css");
        
        // window.addEventListener("load", (event) => {
        //     var image = document.querySelector("img");
        //     var isLoaded = image.complete && image.naturalHeight !== 0;
        //     if (isLoaded) {
        //         setTimeout(() => {
        //             $("#preloader2").delay(450).fadeOut("slow");
        //         }, 2000);
        //     }
        // });
        let screen_height = $(window).height();
        const { isMobile } = this.state;

        return (
            <div>
                <div id="preloader2">
                    <div id="status">
                        <img src={logo} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

                {/* <KulLoader/> */}
                <div className="row" style={isMobile ? { paddingLeft: "10px" } : null}>
                    {!isMobile ? (
                        <div className="col-sm-5" style={SuperAdmin}>
                            <center style={{ marginTop: "420px" }}>
                                <img src={logo} style={{ width: "173.24px" }} />
                                <br />
                                {this.state.resolveRole === "Teller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Teller
                                    </p>
                                ) : this.state.resolveRole == "SuperTeller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Super Teller
                                    </p>
                                ) : null}

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                                    Teller
                                </p> */}
                            </center>
                        </div>
                    ) : (
                        <div className="container" style={SuperAdminMobile}>
                            <center style={{ marginTop: "100px" }}>
                                <img src={logo} style={{ width: "100.24px" }} />
                                <br />
                                {this.state.resolveRole === "Teller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Teller
                                    </p>
                                ) : this.state.resolveRole == "SuperTeller" ? (
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Super Teller
                                    </p>
                                ) : null}

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                            Teller
                        </p> */}
                            </center>
                        </div>
                    )}
                    {this.state.create_account ? <div className="col-sm-12 col-lg-7" style={{ background: "#FFF", minHeight: "100vh" }}>
                        <div className={isMobile ? "mobile-container-fluid" : "cust-container4"}>
                            <div className={!isMobile ? "custom-form col-sm-11 merchant_conf shadow" : "custom-form col-sm-10 mt-4 merchant_conf shadow"}>
                                <h2 style={!isMobile ? { fontSize: "40px", marginTop:"-22px" } : { fontSize: "31px" }} className="manrope-thick">
                                    Merchant Details
                                </h2>
                                {/* <h2 style={!isMobile ? { fontSize: "36px" } : { fontSize: "31px" }} className="manrope-thick">
                                    Student Details
                                </h2> */}
                                <p className="manrope-text" style={{ fontSize: "14px", marginTop: "-10px" }}>
                                    Confirm that details presented are correct and make modifications where neccessary{" "}
                                    {/* <span style={{ color: "#1B52C4", cursor: "pointer" }}>
                                        <Link style={{ color: "#1B52C4" }} to={{ pathname: "/signin" }}>
                                            Sign in
                                        </Link>
                                    </span> */}
                                </p>
                                <br />
                                {/* <QR/> */}


                                {/* {this.state.invalidLogin ? (
                                    <Alert closable={true} onClose={() => this.setState({invalidLogin:false})} message="Invalid login credentials!" description={<p style={!isMobile ? {fontSize:'12px'} : null}>Your email and password could not be validated. Kindly double check and try again</p>} type="error" showIcon className="manrope" />
                                ) : null} */}
                                    {/* <Alert style={{marginTop:"-25px", padding:"8px"}} onClose={() => this.setState({ validationError: false })} 
                                    message={<> */}
                                
                                
                                <div className="row" style={{ marginTop: "10px", }}>
                                <div className="col-sm-12 col-lg-4">
                                        <p className=" text-black" style={{ color: "#0d7815", textAlign:"center", fontSize: "15px", fontFamily: "fantasy", fontWeight: "bolder" }}> <i className="fa fa-user-circle" /> &nbsp; Merchant: <br/><span className="manrope-thick">{this.state.invoiceProps?.institutionName.toUpperCase()}</span></p>
                                        
                                </div>
                                    <div className="col-sm-12 col-lg-4">
                                        <p className=" text-black" style={{ color: "#0d7815", textAlign: "center",  fontSize: "15px", fontFamily: "fantasy", fontWeight: "bolder" }}><i className="fa fa-cart-plus" /> &nbsp; Collection: <br/><span className="manrope-thick">{this.state.invoiceProps?.collectionName.toUpperCase()}</span></p>

                                    </div>
                                    <div className="col-sm-12 col-lg-4">
                                        <p className=" text-black" style={{ color: "#0d7815", textAlign: "center", fontSize: "17px", fontFamily: "fantasy", fontWeight: "bolder" }}><i className="fa fa-cart-plus" /> &nbsp; Amount(NGN): <br /><span className="manrope-thick">
                                            
                                            <TweenOne
                                                animation={this.state.animation}
                                                style={{ fontSize: 37, marginTop: -20, color: "#10804c", fontWeight: "600" }}
                                            >
                                                0.00
                                            </TweenOne>
                                            </span></p>

                                    </div>
                                </div>
                                    {/* <p>Collection: {this.state.invoiceProps?.collectionName.toUpperCase()}</p> */}
                                    {/* </> */}
                                    {/* } 
                                    description={<p style={!isMobile ? { fontSize: '12px' } : null}>{this.state.validationMessage}</p>} type="success" className="manrope" /> */}
                                <br />
                                {/* <Alert
                                    banner
                                    message={
                                    <Marquee pauseOnHover gradient={false}>
                                        I can be a React component, multiple React components, or just some text.
                                    </Marquee>
                                    }
                                /> */}
                                {/* <div class="row" style={{marginTop:"-20px"}}>
                                    <br />
                                    <div class="col-xl-12 col-sm-12">
                                        <h2 style={!isMobile ? { fontSize: "16px", color: "#5675bb", fontWeight: "bold" } : { fontSize: "20px" }} className="">
                                            <i className="fa fa-user-circle" /> &nbsp;  Merchant : <span>{this.state.invoiceProps?.institutionName.toUpperCase()}</span>
                                        </h2>
                                    </div>

                                </div> */}
                                {/* <div class="row mt-3">
                                    <br />
                                    <div class="col-xl-12 col-sm-12">
                                        <h2 style={!isMobile ? { fontSize: "16px", color: "#5675bb", fontWeight: "bold" } : { fontSize: "20px" }} className="">
                                            <i className="fa fa-cart-plus" /> &nbsp;  Collection : <span>{this.state.invoiceProps?.collectionName.toUpperCase()}</span>
                                        </h2>
                                    </div>

                                </div> */}

                                <div class="row" style={{marginTop:"-20px"}}>
                                    <br />
                                    <div class="col-xl-12 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" class="form-control manrope-text drk-text" style={{ fontSize: "13px" }} defaultValue={this.state.invoiceProps?.studentName} name="first_name" onChange={this.handleInput} id="first_name" />
                                            <label for="first_name" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Fullname
                                            </label>
                                        </div>
                                    </div>

                                </div>

                                <div class="row mt-3">
                                    <div class="col-xl-6 col-sm-12">
                                        <div class="form-group">
                                            <input type="text" onChange={this.handleInput} name="email" class="form-control manrope-text drk-text" style={{ fontSize: "13px" }}
                                                // name="email" 
                                                // onChange={this.onChangeEmail} 
                                                value={this.state.invoiceProps?.email}
                                                id="email"
                                            />
                                            <label for="email" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Email address
                                            </label>

                                        </div>

                                    </div>

                                    <div class="col-xl-6 col-sm-12">
                                        <div class="form-group">
                                            <input type="number" class="form-control manrope-text drk-text" value={this.state.invoiceProps?.phoneNumber} style={{ fontSize: "13px" }} name="phone" onChange={this.handleInput} id="phone" />
                                            <label for="phone" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Phone Number
                                            </label>

                                        </div>

                                        {/* <div style={{marginTop:'-15px'}}>
                                        {this.state.isEmailValid ? <small className="text-success">Email address is valid &nbsp; <i className="fa fa-check"/></small> : null}
                                        {this.state.isEmailInvalid ? <small className="text-danger">Email address is not valid. Keep going  <i className="fa fa-times"/></small> : null}
                                        </div> */}
                                    </div>



                                </div>
                                {/* <br /> */}

                                <div class="row mt-3">
                                    {/* <div class="col-xl-12 col-sm-12">
                                        <div class="form-group">
                                            <input type="number" class="form-control manrope-text drk-text" value={this.state.phone} style={{ fontSize: "13px" }} name="phone" onChange={this.handleInput} id="phone" />
                                            <label for="phone" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                                Phone Number
                                            </label>

                                        </div>
                                      
                                    </div> */}

                                    <div class="col-xl-4 col-sm-12">


                                        <FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-standard-label">Programme</InputLabel>
                                            <Select
                                                // labelId="demo-simple-select-standard-label"
                                                // id="demo-simple-select-standard"
                                                // value={0}
                                                onChange={this.handleProgrammeChange}
                                                label="Programme"
                                            >
                                                <MenuItem value="">
                                                    <em>Select Programme</em>
                                                </MenuItem>
                                                {this.state.programmeList && this.state.programmeList.map((x, i) => {
                                                    return(
                                                        <MenuItem value={x.programmeId}>{x.programmeName}</MenuItem>
                                                    )
                                                })}
                                                
                                                
                                            </Select>
                                        </FormControl>
                                    </div>

                                    <div class="col-xl-4 col-sm-12">


<FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="demo-simple-select-standard-label">Department</InputLabel>
    <Select
        // labelId="demo-simple-select-standard-label"
        // id="demo-simple-select-standard"
        // value={0}
        onChange={this.handleDepartmentChange}
        label="Department"
    >
        <MenuItem value="">
            <em>Select Department</em>
        </MenuItem>
        {this.state.deptList && this.state.deptList.map((x, i) => {
                                                    return(
                                                        <MenuItem value={x.departmentId}>{x.department.name}</MenuItem>
                                                    )
                                                })}
    </Select>
</FormControl>
</div>

<div class="col-xl-4 col-sm-12">


<FormControl variant="standard" fullWidth sx={{ m: 1, minWidth: 120 }}>
    <InputLabel id="demo-simple-select-standard-label">Level</InputLabel>
    <Select
        // labelId="demo-simple-select-standard-label"
        // id="demo-simple-select-standard"
        // value={0}
        onChange={this.handleLevelChange}
        label="Age"
    >
        <MenuItem value="">
            <em>Select Level</em>
        </MenuItem>
        {this.state.levelList && this.state.levelList.map((x, i) => {
                   return(
                    <MenuItem value={x.id}>{x.name}</MenuItem>
                    )
              })}
    </Select>
</FormControl>
</div>
                                </div>
                                {/* <br /> */}
                               
                                <div className="row">
                                  
                                        <div className="col-sm-12 monte mt-5"><p style={{fontWeight:"700"}}>Select Payment Channel</p></div>
                                        {this.state.availableGateways &&
                                            this.state.availableGateways.map((x) => {
                                                let resolveAmount = x.name == "Paystack" ? nairaFormat(calculatePercentage(parseInt(this.state.invoiceProps?.amount), 1.5) + 100, 2) : nairaFormat(calculatePercentage(this.state.invoiceProps?.amount, 1.7), 2) ;
                                                let percentageCalcPaystack = calculatePercentage(parseInt(this.state.invoiceProps?.amount), 1.5)+100;
                                                let percentageCalcOthers = calculatePercentage(parseInt(this.state.invoiceProps?.amount), 1.7);
                                                return (
                                                    
                                                    <>
                                                        <div className="col-lg-4">
                                                           
                                                            <div style={{border: "1px solid #84818a47", padding: "9px", borderRadius: "4px", marginBottom: "20px", flex: "end", boxSizing: "border-box" }}>
                                                               
                                                                <img id="imgCheck" src={BASE_URL + x.logoLink} style={{ width: "50px" }} /> {x.name}

                                                                <input type="radio" name={"paymentChannel"} style={{ float: "right" }} onClick={() => this.selectPaymentGateway(x.name, x.name == "Paystack" ? percentageCalcPaystack : percentageCalcOthers)} />
                                                                <p className="text-right" style={{ fontSize: "13px", color:"#cc174c", fontFamily:"monospace"}}>
                                                                   {resolveAmount}
                                                                    </p>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <br />
                                                        <br />
                                                    </>
                                                );
                                            })}
                                    </div>
                                <div className="row mt-3">
                                    {/* <div className="col-sm-1">
                                        <input type="checkbox" id="isAgreed" name="terms" className="" style={{ marginRight: "10px" }} />
                                    </div> */}
                                    {/* <div className="col-sm-10">
                                        <div className="form-inline">
                                            <label className="label-control manrope-text-light" style={{ color: "#84818A", fontSize: "12px" }}>
                                                <p className="manrope-text-light" style={{ color: "#84818A", fontSize: "12px" }}>
                                                    By clicking Create account, I agree that I have read and accepted the <span style={{ color: "#1B52C4" }}>Terms of Use</span> and <span style={{ color: "#1B52C4" }}>Privacy Policy</span>.
                                                </p>
                                            </label>
                                        </div>
                                    </div> */}
                                </div>

                                <div class="form-group">
                                    <div className="row">
                                        {/* <div className="col-sm-12 col-lg-6">
                                            <p className="manrope-text" style={{ fontSize: "14px", color: "#1B52C4" }}>
                                                Forgot password?
                                            </p>
                                        </div> */}
                                        <div className="col-sm-12 col-lg-12">
                                            <button className="btn btn-primary manrope-text" type="button" 
                                            onClick={(e) => this.executeInitializeTransaction(e)} 
                                            style={{ width: "100%", padding: "11px, 24px, 11px, 24px", fontSize: "14px", height: "48px" }}>
                                                Generate Invoice
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : null}

                    {/* {this.state.verify_identity ?  <div className="col-sm-12 col-lg-6" style={{ background: "#FFF", minHeight: "100vh" }} id="verify_identity"><VerifyIdentity email={this.state.email} 
                    propData={this.state.responseData}
                    propData={this.state.mockObj}
                    /> </div>: null} */}

                    {/* {this.state.verify_account ?  <div className="col-sm-12 col-lg-6" style={{ background: "#FFF", minHeight: "100vh" }} id="verify_identity"><VerifyAccount email={this.state.email}/> </div>: null}
                     */}

                </div>
            </div>
        );
    }
}

export default CreateAccount;
