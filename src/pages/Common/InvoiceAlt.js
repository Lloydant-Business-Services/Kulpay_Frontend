import React, { useEffect, useState } from "react";
//import { render } from "react-dom";
import QR from "./QR"
import darkLogo from "../../assets/images/17.png"
import { Alert, Col, Divider, Row, Table } from 'antd';
import Endpoint from "../../utils/endpoint";
import { nairaFormat } from "../../utils/helpers";
import { stateKeys, BASE_URL, BASE_URL_FRONT } from "../../redux/actions";

//import '../../assets/css/invoice.css';

const Invoice = (props) => {
  const [invoiceDetails, setInvoiceDetails] = useState("")
  const [referenceNumber, setReferenceNumber] = useState("")


  const intializeInvoice = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const trfx = urlParams.get('reference')
    console.log(trfx, "trxf")
    if (trfx == null || trfx == undefined) {
      alert("Unauthorised Action!")
      document.getElementById("inv_body").style.display = "none"
      return;
    }
    setReferenceNumber(trfx);
     setTimeout(() => {

    let stateObj = { id: "100" };
    window.history.replaceState(stateObj, "x 2", "/invoice2");


     }, 2000)

    Endpoint.callPaymentDetailsByRef(trfx)
      .then((res) => {
        console.log(res.data, "response")
        setInvoiceDetails(res.data)

      })
      .catch((err) => {
        console.log(err)
      })

  }
  const calculatePercentage = (number, percentage) => {
    // Check if the inputs are valid numbers
    if (typeof number !== 'number' || isNaN(number) || typeof percentage !== 'number' || isNaN(percentage)) {
      return 'Invalid input. Please provide valid numbers.';
    }

    // Calculate the percentage
    const result = (percentage / 100) * number;

    return result;
  }


  const triggerPayWithCard = (data) => {
    window.open(data)
  }
  useEffect(() => {
    intializeInvoice()
    console.log(props.location.InvoiceObj)
    console.log(props.location.referrer)

    setTimeout(() => {
      console.log(invoiceDetails, "new details")
    }, 2000);
  }, [])
  require('../../assets/css/invoiceNew.css');

  return (

    //   <div id="inv_body" className="mt-3" style={{maxWidth:"55vw", marginLeft:"auto", marginRight:"auto", paddingBottom:"5em"}}>
    //   <div className="card" style={{paddingBottom:"80px"}}>
    //     <div className="card-body">
    //       <div id="invoice">

    //         <div className="invoice overflow-auto">
    //           <div style={{minWidth: '600px'}}>
    //             <header>

    //               <div className="row">
    //              <div className="col-sm-4">
    //             <QR urlProps={BASE_URL_FRONT+"invoice2?reference="+referenceNumber}/>
    //              </div>
    //              <div className="col-sm-4">

    //              </div>
    //              <div className="col-sm-4">
    //              <div className="col">
    //                   <a href="javascript:;">
    //                     <img src="assets/images/logo-icon.png" width={80} alt="" />
    //                   </a>
    //                 </div>
    //                 <div className="col company-details">
    //                   <center className="text-right">
    //                   <h2 className="name">
    //                     <a target="_blank" href="javascript:;">
    //                       <img src={darkLogo} style={{width:"190px"}}/>
    //                     </a>
    //                   </h2>
    //                   </center>
    //                   <div className="monte" style={{fontSize:"14px"}}>26b, Chukwuka Utazi Street</div>
    //                   <div style={{fontSize:"14px"}}>Enugu State</div>
    //                   <div style={{fontSize:"14px"}}>support@kulpay.com</div>
    //                 </div>
    //              </div>
    //               </div>


    //             </header>

    //             <main>
    //               <div className="row contacts">
    //                 <div className="col invoice-to">
    //                   <div className="text-gray-light">INVOICE TO:</div>
    //                   <h3 className="to">{invoiceDetails?.fullname}</h3>

    //                   <div className="email"><a>{invoiceDetails?.email}</a>
    //                   </div>
    //                   <div className="email"><a>Date Issued: 20/02/23</a>
    //                   </div>

    //                 </div>
    //                 <div className="col invoice-details">
    //                   <h1 className="invoice-id">#INVOICE:</h1>
    //                   <h1 className="" style={{fontSize:"20px"}}>Merchant Identifier: {invoiceDetails?.portalIndentifier}</h1>
    //                   <h1 className="" style={{fontSize:"20px"}}>KUL-Ref: {invoiceDetails?.systemReference}</h1>
    //                   <div className="date">&nbsp;</div>

    //                 </div>
    //               </div>
    //               <table>
    //                 <thead>
    //                   <tr>
    //                     <th>#</th>
    //                     <th className="text-left">DESCRIPTION</th>
    //                     <th className="text-right">QTY</th>
    //                     <th className="text-right">PRICE</th>
    //                     <th className="text-right">TOTAL</th>
    //                   </tr>
    //                 </thead>
    //                 <tbody>
    //                   <tr>
    //                     <td className="no">01</td>
    //                     <td className="text-left">
    //                       <h3>
    //                         <a target="_blank" href="javascript:;">
    //                         {invoiceDetails?.collectionname}
    //                         </a>
    //                       </h3>
    //                       <a target="_blank" href="javascript:;">
    //                        Collection
    //                       </a></td>
    //                     <td className="unit">1</td>
    //                     <td className="qty">{invoiceDetails?.collectionamount != null ? nairaFormat(invoiceDetails?.collectionamount, 2) : null}</td>
    //                     <td className="total">{invoiceDetails?.collectionamount != null ? nairaFormat(invoiceDetails?.collectionamount, 2) : null}</td>
    //                   </tr>




    //                 </tbody>
    //                 <tfoot>

    //                   <tr>
    //                     <td colSpan={2} />
    //                     <td colSpan={2}>&nbsp;</td>
    //                     <td>0.00</td>
    //                   </tr>
    //                   <tr>
    //                     <td colSpan={2} />
    //                     <td style={{fontSize:"17px"}} colSpan={2}>GRAND TOTAL</td>
    //                     <td style={{fontSize:"17px"}}>{invoiceDetails?.collectionamount != null ? nairaFormat(invoiceDetails?.collectionamount, 2) : null}</td>
    //                   </tr>
    //                 </tfoot>
    //               </table>
    //               <div style={{fontSize:"20px"}} className="thanks">Thank you!</div>
    //               <div className="">

    //               </div>
    //             </main>

    //           </div>


    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <button onClick={() => triggerPayWithCard(invoiceDetails?.authorization_url)} style={{float:"right", width:"36%", height:"63px", fontSize:"19px", background:"#032885"}} className="btn btn-primary btn-lg"><i className="fa fa-credit-card"/> &nbsp; Pay with card &nbsp;  &nbsp;<i class="fa fa-arrow-left" style={{fontSize:"20px"}}></i></button>
    // </div>
    <div className="invoice-2 invoice-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="invoice-inner clearfix">
              <div className="invoice-info clearfix" id="invoice_wrapper" style={{ width: "60vw" }}>
                <div className="invoice-headar">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="invoice-logo">
                        {/* logo started */}
                        <div className="logo">
                          <img src={darkLogo} style={{ height: "47px" }} alt="logo" />
                        </div>
                        {/* logo ended */}
                      </div>
                    </div>
                    {/* <div className="col-sm-3">

                  </div> */}
                    <div className="col-sm-5" >
                      {/* <div className="invoice-id">
                      <div className="info">
                        <h1 className="inv-header-1">Invoice</h1>
                        <p className="mb-1">Invoice Number: <span>#45613</span></p>
                        <p className="mb-0">Invoice Date: <span>24 Jan 2022</span></p>
                      </div>
                    </div> */}
                      <div style={{ float: "right" }}>
                        <QR style={{ float: "right" }} urlProps={BASE_URL_FRONT + "invoice2?reference=" + referenceNumber} />
                      </div>

                    </div>
                  </div>
                </div>
                <div className="invoice-top">
                  <div className="row" style={{ marginTop: "-30px" }}>
                    <div className="col-sm-6">
                      <div className="invoice-number mb-30">
                        <h4 className="inv-title-1">Invoice To</h4>
                        <h2 className="name">{invoiceDetails?.fullname}</h2>
                        <p className="invo-addr-1">
                          {/* Theme Vessel <br /> */}
                          {invoiceDetails?.email} <br />
                          Date Issued: 08-06-2023<br />
                        </p>
                      </div>
                    </div>
                    <div className="col-sm-6 text-right" style={{ float: "right" }}>
                      {/* <QR urlProps={BASE_URL_FRONT+"invoice2?reference="+referenceNumber}/> */}
                      <div className="invoice-id">
                        <div className="info">
                          <h1 className="inv-header-1">#Invoice</h1>
                          <p className="mb-1">Invoice Number: <span>{invoiceDetails?.portalIndentifier}</span></p>
                          <p className="mb-1">KUL REF: <span>{invoiceDetails?.systemReference}</span></p>
                          {/* <p className="mb-0">Invoice Date: <span>24 Jan 2022</span></p> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-center">
                  <div className="table-responsive">
                    <table className="table mb-0 table-striped invoice-table">
                      <thead className="bg-active">
                        <tr className="tr">
                          <th>No.</th>
                          <th className="pl0 text-start">Item Description</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Quantity</th>
                          <th className="text-end">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="tr">
                          <td>
                            <div className="item-desc-1">
                              <span>01</span>
                            </div>
                          </td>
                          <td className="pl0" style={{ fontSize: "12px" }}> {invoiceDetails?.collectionname}</td>
                          <td className="text-center" style={{ fontSize: "12px" }}>{invoiceDetails?.totalamount != null ? nairaFormat(invoiceDetails?.totalamount - invoiceDetails?.kulcharge, 2) : null}</td>
                          <td className="text-center" style={{ fontSize: "12px" }} >1</td>
                          <td className="text-end" style={{ fontSize: "12px" }} >{invoiceDetails?.collectionamount != null ? nairaFormat(invoiceDetails?.totalamount - invoiceDetails?.kulcharge, 2) : null}</td>
                        </tr>
                        <tr className="tr">
                          <td>
                            <div className="item-desc-1">
                              <span>02</span>
                            </div>
                          </td>
                          <td className="pl0" style={{ fontSize: "12px" }}>KulCharge</td>
                          <td className="text-center" style={{ fontSize: "12px" }}>{invoiceDetails?.kulcharge != null ? nairaFormat(invoiceDetails?.kulcharge, 2) : null}</td>
                          <td className="text-center" style={{ fontSize: "12px" }} >1</td>
                          <td className="text-end" style={{ fontSize: "12px" }} >{invoiceDetails?.kulcharge != null ? nairaFormat(invoiceDetails?.kulcharge, 2) : null}</td>
                        </tr>


                        {/* <tr className="bg-grea">
                        <td>
                          <div className="item-desc-1">
                            <span>02</span>
                          </div>
                        </td>
                        <td className="pl0">Fruit Flayer Design</td>
                        <td className="text-center">$400</td>
                        <td className="text-center">1</td>
                        <td className="text-end">$60.00</td>
                      </tr> */}
                        {/* <tr>
                        <td>
                          <div className="item-desc-1">
                            <span>03</span>
                          </div>
                        </td>
                        <td className="pl0">Application Interface Design</td>
                        <td className="text-center">$240</td>
                        <td className="text-center">3</td>
                        <td className="text-end">$640.00</td>
                      </tr> */}
                        {/* <tr>
                        <td>
                          <div className="item-desc-1">
                            <span>04</span>
                          </div>
                        </td>
                        <td className="pl0">Theme Development</td>
                        <td className="text-center">$720</td>
                        <td className="text-center">4</td>
                        <td className="text-end">$640.00</td>
                      </tr> */}
                        <tr className="tr2">
                          <td />
                          <td />
                          <td />
                          <td className="text-center"></td>
                          <td className="text-end"></td>
                        </tr>
                        {/* <tr className="tr2">
                        <td />
                        <td />
                        <td />
                        <td className="text-center">Tax</td>
                        <td className="text-end">$85.99</td>
                      </tr> */}
                        <tr className="tr2">
                          <td />
                          <td />
                          <td />
                          <td className="text-center f-w-600 active-color">Grand Total</td>
                          <td className="f-w-600 text-end active-color">{invoiceDetails?.totalamount != null ? nairaFormat(invoiceDetails?.totalamount, 2) : null}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="invoice-bottom">
                  <div className="row" style={{ marginBottom: "53px" }}>
                    <div className="col-lg-6 col-md-5 col-sm-5">
                      <div className="payment-method mb-30">
                        <h3 className="inv-title-1">Payment Channel</h3>
                        <ul className="payment-method-list-1 text-14">
                          <li><strong>Bank Payment</strong> Yes</li>
                          <li><strong>Card Payment:</strong> Yes</li>
                          <li><strong>Branch:</strong> ...</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-7">
                      <div className="terms-conditions mb-30">
                        <h5 className="inv-title-1">Terms &amp; Conditions</h5>
                        <p style={{ fontSize: "12px" }}>Please note that this invoice is exclusive to the selected payment switch upon invoice generation and cannot be used for walk in the bank payment. If you wish to pay in the bank, kind return to the payment option selection page and select 'Pay to bank' for a new invoice</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="invoice-contact clearfix" style={{ marginTop: "-70px" }}>
                  <div className="row g-0">
                    <div className="col-sm-12">
                      <div className="contact-info clearfix">
                        <a href="tel:+55-4XX-634-7071" className="d-flex"><i className="fa fa-phone" /> +234 090 6788 7878</a>
                        <a href="tel:info@themevessel.com" className="d-flex"><i className="fa fa-envelope" />paymentsupport@kulpay.com</a>
                        <a href="tel:info@themevessel.com" className="mr-0 d-flex d-none-580"><i className="fa fa-map-marker" /> 26b Chukwuka Utazi Street</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-btn-section clearfix d-print-none">
                <a href="javascript:window.print()" className="btn btn-lg btn-print">
                  <i className="fa fa-print" /> Print Invoice
                </a>
                <a onClick={() => triggerPayWithCard(invoiceDetails?.authorization_url)} id="invoice_download_btn" className="btn btn-lg btn-download btn-theme text-white">
                  <i className="fa fa-credit-card" />&nbsp; Pay with card
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};


export default Invoice;
//render(<App />, document.getElementById("root"));
