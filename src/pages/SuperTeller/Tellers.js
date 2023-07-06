import React, { Component } from 'react'
import { enquireScreen } from "enquire-js";
import badge from "../../assets/images/Label.svg";
import activeBadge from "../../assets/images/activeBadge.svg";
import inactiveBadge from "../../assets/images/inactiveBadge.svg";
import pendingBadge from "../../assets/images/pending.svg";
import AddTeller from "./AddTeller"
import {Fade} from "reactstrap"
import ic_up from "../../assets/images/ic_up.png";
import ic_down from "../../assets/images/ic_down.png";






import { Table } from 'antd';

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Collections', dataIndex: 'collections', key: 'collections' },
  { title: 'Inflow', dataIndex: 'inflow', key: 'inflow' },
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
    id: 'Teller 1',
    name: ' Sandra Okoro',
    collections: '53,628',
    inflow: '₦ 2,250.000',
    status:<div><img src={activeBadge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>Sandra Okoro</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is paid for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL COLLECTION</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>24,212</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
       
        </div>
           
        </div>,
  },
  {
    key: 2,
    id: 'Teller 1',
    name: ' Sandra Okoro',
    collections: '53,628',
    inflow: '₦ 2,250.000',
    status:<div><img src={inactiveBadge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>Sandra Okoro</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is paid for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL COLLECTION</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>24,212</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
       
        </div>
           
        </div>,
  },
  {
    key: 3,
    id: 'Teller 1',
    name: ' Sandra Okoro',
    collections: '53,628',
    inflow: '₦ 2,250.000',
    status:<div><img src={activeBadge}/></div>,
    description: <div className="container">
   
        <div className="row" style={{paddingTop:'10px'}}>
        <div className="col-sm-6">
                <p className="manrope-text" style={{fontSize:'20px'}}>Sandra Okoro</p>
                <p className="manrope-text-light" style={{fontSize:'14px', color:'#84818A', marginTop:'-20px'}}>Your payment status for this month is paid for <span style={{color:'#FFA043'}}>65%</span></p>
        </div>
       
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>TOTAL COLLECTION</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>24,212</p>
                
              
        </div>
        <div className="col-sm-2">
                <p className="manrope-text" style={{fontSize:'12px', color:'#84818A'}}>EXPECTED INFLOW</p>
                <p className="manrope-text drk-text" style={{fontSize:'20px', color:'#84818A', marginTop:'-10px'}}>₦120,630</p>
                
              
        </div>
       
        </div>
           
        </div>,
  },
  
];
class Tellers extends Component{
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
                    <div className="row">
                        <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0">
                            {/* <h1 className="manrope-text" style={!isMobile ? { fontSize: "36px", color: "#2E2C34" } : { fontSize: "24px", color: "#2E2C34" }}>
                                <Unicons.UilApps size="24" className="mr-2"/>
                                Tellers
                            </h1> */}
                            {/* <p className="manrope-text-light" style={{ fontSize: "14px", marginTop: "-16px" }}>
                                Here’s what’s going on with your fee collections
                            </p> */}
                        </div>
                        {/* <div className="col-12 col-sm-12 col-xl-6 mt-2 mt-xl-0" style={{ textAlign: "right" }}>
                            <button className="btn btn-secondary manrope-text-light" style={{ marginTop: "20px" }}>
                                <i className="fa fa-filter"/> Filter
                            </button>
                            <button className="btn btn-primary manrope-text-light" style={{ marginTop: "20px", fontSize:'14px' }} onClick={this.showModal}>
                                <i className="fa fa-plus"/> &nbsp; Teller
                            </button>
                        </div> */}
                    </div>
                    <AddTeller/>

                    <div className="row" style={!isMobile ? { marginTop: "5vh", marginBottom:'6vh' } : null}>
                       
                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                               Total inflow
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               ₦3,356,000
                                           </p>
                                       </div>

                                       <div className="mt-2">
                                           <div className="" style={{ marginTop: "40px" }}>
                                               {/* <Unicons.UilBuilding size="20"/> */}
                                               <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                               Total outflows
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               ₦67,083,000
                                           </p>
                                       </div>

                                       <div className="mt-2">
                                           <div className="" style={{ marginTop: "40px" }}>
                                               {/* <Unicons.UilBuilding size="20"/> */}
                                               <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>

                       <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                               Active Collections
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               1,344
                                           </p>
                                       </div>

                                       <div className="mt-2">
                                           <div className="" style={{ marginTop: "40px" }}>
                                               {/* <Unicons.UilBuilding size="20"/> */}
                                               <img src={ic_down} style={{ width: "16px", height: "16px" }} />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                       
                   <div className="col-12 col-sm-6 col-xl-3 mt-2 mt-xl-0">
                           <div className="card-dash flex-fill">
                               <div className="card-body p-3">
                                   <div className="media">
                                       <div className="media-body">
                                           <p className="manrope-text" style={{ fontSize: "12px", color: "#84818A" }}>
                                              Active Vendors
                                           </p>
                                           <p className="mb-0 manrope drk-text" style={{ fontSize: "24px" }}>
                                               45
                                           </p>
                                       </div>

                                       <div className="mt-2">
                                           <div className="" style={{ marginTop: "40px" }}>
                                               {/* <Unicons.UilBuilding size="20"/> */}
                                               <img src={ic_up} style={{ width: "16px", height: "16px" }} />
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>

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

export default Tellers;