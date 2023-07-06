import React, { Component } from 'react'
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/Label.svg";
import pendingBadge from "../../assets/images/pending.svg";
import CallInvoice from "./CallInvoice"
import {Fade} from "reactstrap"






import { Table } from 'antd';

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Collection', dataIndex: 'collection', key: 'collection' },
  { title: 'Department', dataIndex: 'department', key: 'department' },
  { title: 'Pending', dataIndex: 'pending', key: 'pending' },
  { title: 'Total', dataIndex: 'total', key: 'total' },
  { title: 'Status', dataIndex: 'status', key: 'status' },
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
    id: 'ADM221-10',
    collection: 'School of health fees',
    department: 'Admin',
    pending: '0.00',
    total: '₦ 2,250.000',
    status:<div><img src={badge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>School of health fees</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is payed for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>NO OF STUDENTS</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>5632</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦560,630</p>
                
              
        </div>
        </div>
           
        </div>,
  },
  {
    key: 2,
    id: 'ADM221-10',
    collection: 'Hostel B accomodation',
    department: 'Hostel',
    pending: '₦ 500.000',
    total: '₦ 4,250.000',
    status:<div><img src={pendingBadge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>Hostel B accomodation</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is payed for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>NO OF STUDENTS</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>5632</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦560,630</p>
                
              
        </div>
        </div>
           
        </div>,
  },
  {
    key: 3,
    id: 'ADM221-10',
    collection: 'School of health fees',
    department: 'Admin',
    pending: '0.00',
    total: '₦ 2,250.000',
    status:<div><img src={badge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>School of health fees</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is payed for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>NO OF STUDENTS</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>5632</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦560,630</p>
                
              
        </div>
        </div>
           
        </div>,
  },
  {
    key: 4,
    id: 'ADM221-10',
    collection: 'Hostel B accomodation',
    department: 'Hostel',
    pending: '₦ 500.000',
    total: '₦ 4,250.000',
    status:<div><img src={pendingBadge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>Hostel B accomodation</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is payed for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>NO OF STUDENTS</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>5632</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦560,630</p>
                
              
        </div>
        </div>
           
        </div>,
  },
];


class Collections extends Component{
    state={

    }
    showModal = () => {
        this.setState({
            //visible: true,
            ignite:true
        });
    };
    componentDidMount(){
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }

    render(){
        require("antd/dist/reset.css");
        const {isMobile} = this.state;
        return(
            <>
            <Fade>
             <div className="container-fluid py-5">
                    <div className="row" style={{marginBottom:"5vh"}}>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                {/* <Unicons.UilApps size="24" className="mr-2"/> */}
                               Collections
                            </h1>
                            {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                        </div>
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                <i className="fa fa-filter"/> Filter
                            </button>
                            <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px" }} onClick={this.showModal}>
                                Call Invoice
                            </button>
                        </div>
                    </div>
                    {/* <CallInvoice ignite={this.state.ignite}/> */}
                    <Table
    columns={columns}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
      rowExpandable: record => record.name !== 'Not Expandable',
    }}
    dataSource={data}
    className="manrope-text"
  />
                    </div>
                    </Fade>
            </>
        )
    }
}

export default Collections;