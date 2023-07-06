import React,{useEffect, useState} from "react";
//import { render } from "react-dom";
import QR from "./QR"
import darkLogo from "../../assets/images/alldarkLogo.png"
import { Alert, Col, Divider, Row, Table } from 'antd';
import Endpoint from "../../utils/endpoint";
import {nairaFormat} from "../../utils/helpers";
import { stateKeys, BASE_URL, BASE_URL_FRONT } from "../../redux/actions";

//import '../../assets/css/invoice.css';

const Receipt = (props) => {
  const [paymentDetails, setpaymentDetails] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")


  const intializeInvoice = () => {
    const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const trfx = urlParams.get('reference')
        console.log(trfx, "trxf")
        if(trfx == null || trfx == undefined){
          alert("Unauthorised Action!")
          document.getElementById("inv_body").style.display = "none"
          return;
        }
        setReferenceNumber(trfx);
        //  setTimeout(() => {
        //   let stateObj = { id: "100" };
        //   window.history.replaceState(stateObj, "x 2", "/paymentreceipt");
        //  }, 2000)

        Endpoint.callPaymentDetailsByRef(trfx)
        .then((res) => {
          console.log(res.data, "response")
          if(!res.data?.ispaid){
            alert("No payment recored found!")
            document.getElementById("inv_body").style.display = "none"
            return
          }
          setpaymentDetails(res.data)
          
        })
        .catch((err) => {
          console.log(err)
        })
       
  }

  const triggerPayWithCard = (data) => {
      window.open(data)
  }
  useEffect(() => {
    intializeInvoice()
    console.log(props.location.InvoiceObj)
    console.log(props.location.referrer)

    setTimeout(() => {
      console.log(paymentDetails, "new details")
    }, 2000);
  }, [])
require('../../assets/css/invoice.css');

  return (
    <div id="inv_body" className="mt-3" style={{maxWidth:"55vw", marginLeft:"auto", marginRight:"auto", paddingBottom:"5em"}}>
    <div className="card" style={{paddingBottom:"80px"}}>
      <div className="card-body">
        <div id="invoice">
          {/* <div className="toolbar hidden-print">
            <div className="text-end">
              <button type="button" className="btn btn-dark"><i className="fa fa-print" /> Print</button>
              <button type="button" className="btn btn-danger"><i className="fa fa-file-pdf-o" /> Export as PDF</button>
            </div>
            <hr />
          </div> */}
          <div className="invoice overflow-auto">
            <div style={{minWidth: '600px'}}>
              <header>
                
                <div className="row">
               <div className="col-sm-4">
              <QR urlProps={BASE_URL_FRONT+"invoice2?reference="+referenceNumber}/>
               </div>
               <div className="col-sm-4">
             
               </div>
               <div className="col-sm-4">
               <div className="col">
                    <a href="javascript:;">
                      <img src="assets/images/logo-icon.png" width={80} alt="" />
                    </a>
                  </div>
                  <div className="col company-details">
                    <center className="text-right">
                    <h2 className="name">
                      <a target="_blank" href="javascript:;">
                        <img src={darkLogo} style={{width:"190px"}}/>
                      </a>
                    </h2>
                    </center>
                    <div className="monte" style={{fontSize:"14px"}}>26b, Chukwuka Utazi Street</div>
                    <div style={{fontSize:"14px"}}>Enugu State</div>
                    <div style={{fontSize:"14px"}}>support@kulpay.com</div>
                  </div>
               </div>
                </div>

                
              </header>
              
              <main>
                <div className="row contacts">
                  <div className="col invoice-to">
                    <div className="text-gray-light">INVOICE TO:</div>
                    <h3 className="to">{paymentDetails?.fullname}</h3>
                    {/* <div className="address">796 Silver Harbour, TX 79273, US</div> */}
                    <div className="email"><a>{paymentDetails?.email}</a>
                    </div>
                    <div className="email"><a>Date Issued: 20/02/23</a>
                    </div>
                    
                  </div>
                  <div className="col invoice-details">
                    <h1 className="invoice-id" style={{color:"#009320"}}>#Receipt:</h1>
                    <h1 className="" style={{fontSize:"20px"}}>Merchant Identifier: {paymentDetails?.portalIndentifier}</h1>
                    <h1 className="" style={{fontSize:"20px"}}>KUL-Ref: {paymentDetails?.systemReference}</h1>
                    <div className="date">&nbsp;</div>
                    {/* <div className="date">Date Issued: 20/02/23</div> */}
                  </div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th className="text-left">DESCRIPTION</th>
                      <th className="text-right">QTY</th>
                      <th className="text-right">PRICE</th>
                      <th className="text-right">TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{background:"#20703c"}} className="no">01</td>
                      <td className="text-left">
                        <h3>
                          <a target="_blank" href="javascript:;">
                          {paymentDetails?.collectionname}
                          </a>
                        </h3>
                        <a target="_blank" href="javascript:;">
                         Collection
                        </a></td>
                      <td className="unit">1</td>
                      <td className="qty">{paymentDetails?.collectionamount != null ? nairaFormat(paymentDetails?.collectionamount, 2) : null}</td>
                      <td style={{background:"#536c6ca6"}} className="total">{paymentDetails?.collectionamount != null ? nairaFormat(paymentDetails?.collectionamount, 2) : null}</td>
                    </tr>
                    {/* <tr>
                    
                      <td className="no">01</td>
                      <td className="text-left">
                        <h3>Website Design</h3>Creating a recognizable design solution based on the company's existing visual identity</td>
                      <td className="unit">$40.00</td>
                      <td className="qty">30</td>
                      <td className="total">$1,200.00</td>
                    </tr>
                    <tr>
                      <td className="no">02</td>
                      <td className="text-left">
                        <h3>Website Development</h3>Developing a Content Management System-based Website</td>
                      <td className="unit">$40.00</td>
                      <td className="qty">80</td>
                      <td className="total">$3,200.00</td>
                    </tr>
                    <tr>
                      <td className="no">03</td>
                      <td className="text-left">
                        <h3>Search Engines Optimization</h3>Optimize the site for search engines (SEO)</td>
                      <td className="unit">$40.00</td>
                      <td className="qty">20</td>
                      <td className="total">$800.00</td>
                    </tr>
                   */}
                  
                  
                  
                  </tbody>
                  <tfoot>
                    {/* <tr>
                      <td colSpan={2} />
                      <td colSpan={2}>SUBTOTAL</td>
                      <td>$5,200.00</td>
                    </tr> */}
                    <tr>
                      <td colSpan={2} />
                      <td colSpan={2}>&nbsp;</td>
                      <td>0.00</td>
                    </tr>
                    <tr style={{fontSize:"17px"}}>
                      <td colSpan={2} />
                      <td style={{fontSize:"17px"}} colSpan={2}>GRAND TOTAL</td>
                      <td style={{fontSize:"17px"}}>{paymentDetails?.collectionamount != null ? nairaFormat(paymentDetails?.collectionamount, 2) : null}</td>
                    </tr>
                  </tfoot>
                </table>
                <div style={{fontSize:"20px"}} className="thanks">Thank you!</div>
                <div className="">
                  {/* <div>NOTICE:</div> */}
                  {/* <div className="notice">A finance charge of 1.5% will be made on unpaid balances after 30 days.</div> */}
                </div>
              </main>
              {/* <footer><button style={{float:"right", width:"36%", height:"63px"}} className="btn btn-warning btn-lg">Pay with card</button></footer> */}
            </div>
            {/*DO NOT DELETE THIS div. IT is responsible for showing footer always at the bottom*/}
            <div />
            
          </div>
        </div>
      </div>
    </div>
    <button 
    // onClick={() => triggerPayWithCard(paymentDetails?.authorization_url)} 
    style={{float:"right", fontSize:"19px", background:"#032885"}} className="btn btn-primary btn-lg">Print <i class="fa fa-print" style={{fontSize:"20px"}}></i></button>
  </div>
  
  );
};


export default Receipt;
//render(<App />, document.getElementById("root"));
