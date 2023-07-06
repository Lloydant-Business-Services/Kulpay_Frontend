import React from "react";
import { Component } from "react";
import $ from "jquery";
import Bitmap from "../../../assets/images/NewTeller1.jpg";
import BitmapSuperTeller from "../../../assets/images/NewSuperTeller.jpg";
import BitmapAdmin from "../../../assets/images/NewSuperAdmin.jpg";
import logo from "../../../assets/images/alldarkLogo.png";
import highkulpay from "../../../assets/images/highkulpay.png";
import frame from "../../../assets/images/Frame.png";
import kp from "../../../assets/images/kp.png";
import girl_credit from "../../../assets/images/sss.png";
import roundIcon from "../../../assets/images/Round-icon.png";
import KulLoader from "../../../components/Loader/PageLoader/KulPayLoader";
import { enquireScreen } from "enquire-js";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { loginUser, userLoggedIn, USER_KEY } from "../../../utils/auth";
import { encryptAes, encryptQue, deCryptedData } from "../../../utils/Aesencryption";
import { Modal, Button, Space, Alert } from "antd";
import Endpoint from "../../../utils/endpoint";
import { handleFormSubmissionError, AesKey, AesIv, encrypt, decrypt } from "../../../utils/helpers";
import { AES, enc } from 'crypto-js';
var Teller = {
    
    height: "100vh",
    // backgroundImage: `url(${'https://as2.ftcdn.net/v2/jpg/02/59/46/67/1000_F_259466755_qNCtnnVzw5TsNaVC4vspJDob8ReWuotb.jpg'})`,
    backgroundSize: "cover",
};
var SuperTeller = {
    
    height: "100vh",
    // backgroundImage: `url(${'https://as2.ftcdn.net/v2/jpg/02/59/46/67/1000_F_259466755_qNCtnnVzw5TsNaVC4vspJDob8ReWuotb.jpg'})`,
    backgroundSize: "cover",
};
var SuperAdmin = {
    
    height: "100vh",
    backgroundImage: `url(${girl_credit})`,
    backgroundSize: "cover",
};
var SuperAdminMobile = {
    
    height: "38vh",
    // backgroundImage: `url(${'https://as2.ftcdn.net/v2/jpg/02/59/46/67/1000_F_259466755_qNCtnnVzw5TsNaVC4vspJDob8ReWuotb.jpg'})`,
    backgroundSize: "cover",
    marginTop:'0px'
};
function error() {
    Modal.error({
        title: "This is an error message",
        content: "some messages...some messages...",
    });
}
class SignIn extends Component {
    state = {
        resolveRole: this.props.location?.state?.identifier,
        isVerified: this.props.location?.state?.redirectProps,
        email:this.props.location?.state?.email,
        payLoad: JSON.parse(localStorage.getItem(USER_KEY)),
    };
    handleInput = (event) => {
        // this.setState({isVerified:null})
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };
    isLoadedFunc = () => {
        var image = document.querySelector("img");
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if (isLoaded) {
            setTimeout(() => {
                $("#preloader").delay(450).fadeOut("slow");
            }, 1000);
        }
    };

    
    handleSignIn = () => {
        if(this.state.email == null || this.state.pass == null){
            //this.setState({promptEnter:true})
            $("#emptyFields").fadeIn();
            return;
        }
        $("#preloader").fadeIn("slow");
        const payload = {
                "username": this.state.email,
                "password": this.state.pass
        }
        const payloadString = encryptAes(payload)
        console.log(payloadString, "!111")
        Endpoint.login(payloadString)
        .then((res) => {
            if(res.status == 200){
                //var decr = deCryptedData(res.data)
                // console.log(res.data)
                // console.log(decr)
                // console.log(decr.AuthToken, "token")
                loginUser(res.data.authToken, res.data, true);               
            }
            else{
                $("#preloader").fadeOut("slow");
                $("#invalidLogin").fadeIn();
                    return
               
            }
            
                $("#preloader").fadeOut("slow");
            
        })
        .catch((error) => {
            this.setState({
                loginMessage:error.statusText
            })
            console.log(error, "error")
         
            $("#preloader").fadeOut("slow");
                $("#invalidLogin").fadeIn();
        })
    };

    InitializeUser(){
        if(userLoggedIn()){
            loginUser(this.state.payLoad?.authToken, this.state.payLoad, true);   
        }
        else{
            //alert("f")
        }
    }
    clearInputFields(){
        if(this.state.isVerified == "verified"){
            return;
        }
        document.getElementById("user").value = "";
        document.getElementById("pass").value = "";
    }
    componentDidMount() {
      this.InitializeUser();
        setTimeout(() => {
            this.isLoadedFunc();
            
            this.clearInputFields();
        }, 1500);

        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render() {
        require("antd/dist/reset.css");
        // window.addEventListener("load", (event) => {
        //     var image = document.querySelector("img");
        //     var isLoaded = image.complete && image.naturalHeight !== 0;
        //     if (isLoaded) {
        //         setTimeout(() => {
        //             $("#preloader").delay(450).fadeOut("slow");
        //         }, 2000);
        //     }
        // });
        let screen_height = $(window).height();
        const { isMobile } = this.state;

        return (
            <div>
                <div id="preloader">
                    <div id="status">
                        <img src={highkulpay} style={{ left: "-3rem", top: "-2.7rem", width: "138px", marginTop: "10px", position: "absolute" }} />
                        <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={50} />
                    </div>
                </div>

                {/* <KulLoader/> */}
                <div 
                // style={{ padding: '40px' }}
                >
                    <div className="row" 
                    // style={{
                    //     width:'100vw', 
                    // height:'100vh'}}
                    >
                        {!isMobile ? (
                            <div className="col-sm-7" style={this.state.resolveRole === "Teller" ? Teller : this.state.resolveRole == "SuperTeller" ? SuperTeller : SuperAdmin}>
                                <center style={{ marginTop: ("52vh")}}>
                                    <img src={highkulpay} style={{ width: "300px" }} />
                                    <p style={{fontSize:'14px', marginTop:'-2px', marginLeft:'76px'}} className="text-white">Seemless and swift integration...</p>
                                    <br />
                                    {this.state.resolveRole === "Teller" ?
                                        <p style={{ color: "#FFF" }} className="manrope-text">
                                            Teller
                                        </p> :
                                        this.state.resolveRole == "SuperTeller" ?
                                            <p style={{ color: "#FFF" }} className="manrope-text">
                                                Super Teller
                                            </p> : null}

                                    {/* <p style={{ color: "#FFF" }} className="manrope">
                                    Teller
                                </p> */}
                                </center>
                            </div>
                        ) : <div className="container" style={SuperAdminMobile}>
                            <center style={{ marginTop: "100px" }}>
                                <img src={logo} style={{ width: "250px" }} />
                                <br />
                                {this.state.resolveRole === "Teller" ?
                                    <p style={{ color: "#FFF" }} className="manrope-text">
                                        Teller
                                    </p> :
                                    this.state.resolveRole == "SuperTeller" ?
                                        <p style={{ color: "#FFF" }} className="manrope-text">
                                            Super Teller
                                        </p> : null}

                                {/* <p style={{ color: "#FFF" }} className="manrope">
                            Teller
                        </p> */}
                            </center>
                        </div>}
                            
                        <div className=" col-sm-5 col-lg-5" style={!isMobile ? { background: "#FFF", minHeight: "100vh" } : { background: "#FFF", minHeight: "60vh" }}>
                            <div className={isMobile ? "  container-fluid" : " cust-container3"}>
                                <div className="col-sm-12" style={{ marginTop: "5px" }}>
                                    <img src={roundIcon} style={{ width: '67px', marginRight:'60px', float:'right', marginTop:'-20px' }} />
                                </div>
                                <center>
                                    {/* <img src={logo} style={{ width: "150px" }} /> */}
                                    {/* <h2 className="manrope-text"> <img src={kp} style={{ width: "50px" }} /> Kulpay</h2> */}
                                </center>

                                <div class="custom-form col-sm-10" style={!isMobile ? { marginTop: '10vh' } : null}>
                                    <h2 style={!isMobile ? { fontSize: "36px", } : { fontSize: "28px", marginTop: '20px' }} className="manrope-text">
                                        Sign In
                                    </h2>
                                    <h2 style={!isMobile ? { fontSize: "13px", marginTop: '-15px', marginBottom: '18px', color: '#514f4f' } : { fontSize: "10px", color: '#514f4f', marginTop: '10px' }} className="manrope-text">
                                        Login to your account
                                    </h2>
                                    <div id="invalidLogin" style={{ display: 'none' }}>
                                        <Alert closable={true} onClose={() => $("#invalidLogin").fadeOut()} message="Invalid login credentials!" description={<p style={!isMobile ? { fontSize: '12px' } : null}>{this.state.loginMessage}</p>} type="error" showIcon className="manrope" />
                                    </div>
                                    <div id="emptyFields" style={{ display: 'none' }}>
                                        <Alert closable={true} onClose={() => $("#emptyFields").fadeOut()} message="Login Failed!" description={<p style={!isMobile ? { fontSize: '12px' } : null}>Enter an email address and password!</p>} type="error" showIcon className="manrope" />
                                    </div>
                                    {this.state.isVerified != null && this.state.isVerified == "verified" ? (
                                        <Alert closable={true} onClose={() => this.setState({ invalidLogin: false })} message="Verification successful!" description={<p style={!isMobile ? { fontSize: '12px' } : null}>Your account was successfully verified. You may login to continue</p>} type="success" showIcon className="manrope" />
                                    ) : null}
                                    <br />

                                    <div class="form-group">
                                        <input type="text" defaultValue={this.state.email} class="form-control manrope-text" style={{ fontSize: "13px" }} name="email" onChange={this.handleInput} id="user" />
                                        <label for="user" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                            Email address
                                        </label>
                                    </div>
                                    <div className={!isMobile ? "form-group mt-5" : "form-group mt-4"}>
                                        <input type="password" class="form-control manrope-text" name="pass" id="pass" style={{ fontSize: "13px" }} onChange={this.handleInput} />
                                        <label for="pass" class="animated-label manrope-text" style={{ fontSize: "13px" }}>
                                            Password
                                        </label>
                                    </div>
                                    <div class="form-group">
                                        <div className="row">
                                            <div className="col-sm-12 col-lg-6">
                                                <p className="manrope-text" style={{ fontSize: "14px", color: "#1B52C4" }}>
                                                    Forgot password?
                                                </p>
                                            </div>
                                            <div className="col-sm-12 col-lg-6">
                                                <button className="btn btn-primary manrope-text btn-mobile" type="button" onClick={this.handleSignIn} style={{ width: "164px", padding: "11px, 24px, 11px, 24px", fontSize: "14px", height: "48px" }}>
                                                    Sign In
                                                </button>
                                            </div>
                                            <div className="col-sm-12 col-lg-12 mt-4">
                                                <p className="manrope-text text-center" style={{ fontSize: "12px", color: "#1B52C4" }}>
                                                    <a href="/create_account">
                                                        <span style={{ color: '#514f4f' }}>Dont have an account?</span> <span style={{ color: '#1B52C4' }}>Sign up</span>
                                                    </a>
                                                </p>
                                            </div>
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

export default SignIn;
