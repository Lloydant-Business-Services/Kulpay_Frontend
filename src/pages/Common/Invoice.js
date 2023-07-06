import React from "react";
// import ("../../assets/css/invoice.css")
//import { render } from "react-dom";
import logo from "../../assets/images/alldarkLogo.png";

import Avatar from "../../assets/images/avatar.png";

import { Col, Divider, Row, Table } from 'antd';
// import 'antd/dist/reset.css';

const Invoice = () => {
// require('antd/dist/reset.css');
require ("../../assets/css/invoice.css")
require('antd/dist/reset.css')


  return (
    <div style={{margin: 0}}>
    <div className="mt-4" style={{margin: '0 auto 10px', marginTop:'35px', padding: '30px', background: '#fff', width: '50%', borderRadius: '4px', minHeight: '400px'}}>
      <div style={{padding: '20px'}}>
        {/* company profile */}
        <div style={{paddingBottom: '8px', marginBottom: '5px', borderBottom: '2px solid #edf2f7'}}>
          <div style={{display: 'inline-block', width: '120px', height: '120px', verticalAlign: 'top', borderRadius: '5px'}}>
            <img src={logo} alt="customer company logo" style={{borderRadius: 'inherit', maxWidth: '100%', maxHeight: '100%'}} />
          </div>
          <div style={{display: 'inline-block', width: '78%', textAlign: 'right'}}>
            <h1 style={{fontSize: '30px', margin: '0 0 10px'}}>
              Receipt
            </h1>
            <h1 style={{fontSize: '16px', color: '#333333', fontWeight: 600, margin: '0 0 5px'}}>
              Ref. No.: 32424224242
            </h1>
            <h1 style={{fontSize: '12px', fontWeight: 500, margin: '5px 0'}}>
              56, Balogun Street, Shomolu, Lagos
            </h1>
            <h1 style={{fontSize: '12px', fontWeight: 500, margin: '5px 0'}}>
              digify.space@gmail.com
            </h1>
            <h1 style={{fontSize: '12px', fontWeight: 500, margin: '5px 0'}}>
              089489767467
            </h1>
          </div>
        </div>
        <table style={{margin: '8px 0 0', width: '100%'}}>
            <tbody><tr>
                <td>
                  <div style={{marginBottom: '5px'}}>
                    <p style={{margin: '0 0 5px', fontSize: '14px', color: '#333'}}>
                      Bill To:
                    </p>
                    <p style={{margin: 0, fontSize: '14px', fontWeight: 600, color: '#333333'}}>
                      Godspeed Miracle
                    </p>
                    <p style={{margin: '5px 0', fontSize: '12px'}}>
                      56, Balogun Street, Shomolu, Lagos State
                    </p>
                    <p style={{margin: '5px 0', fontSize: '12px'}}>
                      johndoe@example.com
                    </p>
                    <p style={{margin: '5px 0', fontSize: '12px'}}>
                      081676476767
                    </p>
                  </div>
                </td>
                <td style={{verticalAlign: 'top', textAlign: 'right'}}>
                  {/* <p style={{fontSize: '14px', margin: '0 0 5px', color: '#878787'}}>
                    Receipt Number: 12299
                  </p> */}
                  <p style={{fontSize: '14px', margin: 0, color: '#333333'}}>
                    Date Issued: April 22, 2021
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
      <table style={{background: '#303574', height: '30px', display: 'table', fontWeight: 'normal', color: '#fff', fontSize: '14px', padding: '0 10px', width: '100%'}}>
        <tbody><tr><th style={{width: '28px', padding: '0 5px 0 0', textAlign: 'left'}}>
              #
            </th>
            <th style={{width: '185px', padding: '0 5px', textAlign: 'left'}}>
              Item
            </th>
            <th style={{width: '80px', padding: '0 5px', textAlign: 'left'}}>
              Qty
            </th>
            <th style={{width: '100px', padding: '0 5px', textAlign: 'right'}}>
              Price
            </th>
            <th style={{width: '150px', padding: '0 0 0 5px', textAlign: 'right'}}>
              Amount
            </th>
          </tr></tbody></table>
      <div style={{padding: 0, fontSize: '12px', lineHeight: '14px'}} id="reciept__table">
        <table style={{width:'100%',padding: '8px 10px 5px'}} id="item-row">
          <tbody><tr style={{width:'100%', height: '30px'}}>
              <td style={{width: '28px', padding: '0 5px 0 0'}}>
                1
              </td>
              <td style={{width: '185px', padding: '0 5px'}}>
                School Fees
              </td>
              <td style={{width: '80px', padding: '0 5px'}}>
               -
              </td>
              <td style={{width: '100px', padding: '0 5px', textAlign: 'right'}}>
                ₦ 5,000
              </td>
              <td style={{width: '150px', padding: '0 0 0 5px', textAlign: 'right'}}>
                ₦ 25,000.00
              </td>
            </tr>
          </tbody></table>
       
        
       
        {/* amount breakdown section */}
        <table style={{margin: '30px 0 0', padding: '5px 10px', background: '#f8f9fa', maxWidth: '60%', marginLeft: 'auto', fontSize: '12px'}}>
          <tbody>
           
            <tr style={{height: '25px', color: '#7c7c7c'}}>
              <td style={{width: '110px', padding: '0 5px'}}>
                VAT
              </td>
              <td style={{width: '160px', padding: '0 0 0 5px', textAlign: 'right'}}>
                ₦ 13,125.00
              </td>
            </tr>
            <tr style={{height: '25px'}}>
              <td style={{width: '110px', padding: '0 5px'}}>
                Total
              </td>
              <td style={{width: '160px', padding: '0 0 0 5px', textAlign: 'right'}}>
                ₦ 188,125.00
              </td>
            </tr>
          </tbody></table>
        {/* amount paid / balance section */}
        <table style={{background: '#edf2f7', padding: '5px 10px', maxWidth: '60%', marginLeft: 'auto', fontSize: '12px'}}>
          <tbody><tr style={{height: '25px'}}>
              <td style={{width: '110px', padding: '0 5px', color: '#7c7c7c'}}>
                Amount Paid
              </td>
              <td style={{width: '160px', padding: '0 0 0 5px', textAlign: 'right'}}>
                ₦ 250,000.00
              </td>
            </tr>
            <tr style={{height: '25px', fontWeight: 600}}>
              <td style={{width: '110px', padding: '0 5px'}}>
                Balance
              </td>
              <td style={{width: '160px', padding: '0 0 0 5px', textAlign: 'right'}}>
                ₦ 45,625.00
              </td>
            </tr>
          </tbody></table>
        <section style={{margin: '0 0 10px', padding: '12px', fontSize: '12px'}}>
          {/* This only applies when it is an invoice */}
          <p style={{fontSize:'10px'}}>
            Kindly make payment to:
            <span style={{fontWeight: 'bold'}}>
              Suntrust Bank Nigeria Ltd. - 0906767676 | Suntrust Bank Nigeria
              Ltd. | 0906767676
            </span>
          </p>
          {/* This is the notes sent with the payload for invoice generation */}
          {/* <p style={{background: 'rgba(237, 242, 247, 0.7)', color: '#4f4f4f', opacity: '0.5', margin: '0 -12px 10px', padding: '12px', fontSize: '12px', whiteSpace: 'pre-line'}}>
            Note as follows: 1. Valid for 30 days only 2. Goods received in
            good condition cannot be returned
          </p> */}
        </section>
        <div style={{textAlign: 'center', padding: '20px 0 5px'}}>
          <span style={{verticalAlign: 'middle'}}>Powered by</span>
          <a href="https://mzuri.ng" target="_blank">
            <img src="./mzuri-logo.svg" style={{marginLeft: '5px', width: '40px', verticalAlign: 'middle'}} />
          </a>
        </div>
      </div>
    </div>
  </div>
  
  
  );
};


export default Invoice;
//render(<App />, document.getElementById("root"));
