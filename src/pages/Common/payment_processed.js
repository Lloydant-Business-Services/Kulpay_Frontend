import React,{useEffect, useState} from "react";
//import { render } from "react-dom";
import QR from "./QR"
import $ from "jquery";
import darkLogo from "../../assets/images/alldarkLogo.png"
import successGif from "../../assets/images/successp.gif"
import successStatic from "../../assets/images/successp-30.png"





import Endpoint from "../../utils/endpoint";
import { stateKeys, BASE_URL, BASE_URL_FRONT } from "../../redux/actions";
import logo from "../../assets/images/17.png";
import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, CircleSpinner } from "react-spinners-kit";

const ProcessPayment = (props) => {
  const [paymentDetails, setpaymentDetails] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")


  const intializePayment = () => {
    const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const trfx = urlParams.get('reference')
        console.log(trfx, "trxf")
        // return
        if(trfx == null || trfx == undefined){
          alert("Unauthorised Action!")
          document.getElementById("inv_body").style.display = "none"
          return;
        }
        setTimeout(() => {
            let stateObj = { id: "100" };
            window.history.replaceState(stateObj, "x 2", "/payment_processed");
           }, 2000)
        setReferenceNumber(trfx);

        Endpoint.confirmAndUpdatePayment(trfx)
        .then((res) => {
          console.log(res.data, "response")
          controlledDisplay()
        setpaymentDetails(res.data)
          
        })
        .catch((err) => {
          console.log(err)
        $("#preloader2").fadeOut()
        alert("oops! something went wrong")
        })
       
  }
  const triggerReceipt = () => {
    const RECEIPT_URL = BASE_URL_FRONT+"paymentreceipt?reference="+paymentDetails?.systemReference
    window.open(RECEIPT_URL)
}
  const controlledDisplay = () => {
    setTimeout(() => {
        $("#preloader2").fadeOut()
        
    }, 2000);


    setTimeout(() => {
        $("#first_a").hide()
        $("#first_b").fadeIn('slow')
        
    }, 8000);
  }

  useEffect(() => {
    intializePayment()

    
    
    setTimeout(() => {
      console.log(paymentDetails, "new details")
    }, 2000);
  }, [])
require('../../assets/css/reciept.css');

  return (
    <div >
          
                <div id="preloader2">
                    <div id="status">
                        <center>
                        <CircleSpinner
								size={50}
								color={"#fff"}
								loading={true}
							/>
                        </center>
                    </div>
                </div>
                <center className="mt-5">
    <img src={darkLogo} style={{width:"220px"}}/>
</center>

<div id="done_logo" >

<div className="container">

    <center>

        <img src={successGif} id="first_a" style={{width:"25vw"}}/>
        <img src={successStatic} id="first_b" style={{width:"25vw", display:"none"}}/>
<h1 className="text-black" style={{fontSize:"36px"}}>payment verified!</h1>
<p style={{fontSize:"17px"}}>Congratulations! Your payment was successfully proccessed.</p>
            <button className="btn btn-primary" type="button" onClick={() => triggerReceipt()} style={{ padding: "10px" }}> &nbsp;View Reciept &nbsp; &nbsp;<i class="fa fa-arrow-left" style={{ fontSize: "20px" }}></i>&nbsp; &nbsp; &nbsp;</button>
    </center>

   
</div>
</div>
                {/* <div class="wrapperAlert mt-4" id="stay_process">

<div class="contentAlert ">

  <div class="topHalf">

    <p><svg viewBox="0 0 512 512" width="100" title="check-circle">
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
      </svg></p>
    <h1 className="text-white">payment successful!</h1>

   <ul class="bg-bubbles">
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
   </ul>
  </div>

  <div class="bottomHalf">

    <p className="manrope">Congratulation! Your payment was successfully proccessed.</p>
<div className="text-center">
<p style={{color: '#464646', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '26px', lineHeight: '33px', margin: 0}}>
  <strong>Transaction Reference: </strong><br/>7651278121827128 <br />
  <br /></p>

  

</div>
    <button id="alertMO" className="btn btn-primary manrope">View Reciept</button>

  </div>

</div>        

</div> */}
 </div>
  
  );
};


export default ProcessPayment;
//render(<App />, document.getElementById("root"));
