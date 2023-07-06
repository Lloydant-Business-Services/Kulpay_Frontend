import React from 'react';
import ScrollAnim from 'rc-scroll-anim';
//import "../../assets/css/style/sb-admin-2.css"
import { TweenOneGroup } from 'rc-tween-one';
import logo from "../../assets/images/17.png"

import $ from 'jquery'

const { Link } = ScrollAnim;

export default class Header extends React.PureComponent {
  getHeaderChildToRender = () => (
    [
       
    //   <Link className="logo" to="screen0" toHash={false} key="logo">
          
    //       </Link>,
    //   <nav key="nav">
    //     {!this.props.isMobile && (
    //       <ul>
    //         <li><Link to="screen1" toHash={false}>特邀嘉宾</Link></li>
    //         <li><Link to="screen2" toHash={false}>会议日程</Link></li>
    //         <li><Link to="screen3" toHash={false}>地点</Link></li>
    //         <li><Link to="screen4" toHash={false}>赞助商</Link></li>
    //       </ul>)}
    //   </nav>,
    //    <nav key="nav" className="">
    //    {!this.props.isMobile && (
    //      <ul>
    //        <li><Link to="screen1" toHash={false}>特邀嘉宾</Link></li>
    //        <li><Link to="screen2" toHash={false}>会议日程</Link></li>
    //        <li><Link to="screen3" toHash={false}>地点</Link></li>
    //        <li><Link to="screen4" toHash={false}>赞助商</Link></li>
    //      </ul>)}
    //  </nav>,
      <nav key="nav" className="">
      {!this.props.isMobile && (
       <div className="col-sm-2">

       </div>)}
    </nav>

      
     ,
    ]);
  render() {
    let screen_width = $(window).width();
    const { noTop, isMobile } = this.props;
    const header = this.getHeaderChildToRender();
    const headerFix = this.getHeaderChildToRender();
    return (
        <div>
      {!this.props.isMobile ? <header key="nav"  style={{paddingLeft:'0px'}}>

        <div className="site-top" >
        <Link className="logo" to="screen0" toHash={false} key="logo">
        <img src={logo} style={{left:'0rem', top:'0rem', width:'95px', height:'28.96px'}}/>
          </Link>
      <nav key="nav">
        {!this.props.isMobile && (
          <ul>
            <li><Link to="screen1" toHash={false}>Product</Link></li>
            <li><Link to="screen2" toHash={false}>Services</Link></li>
            <li><Link to="screen3" toHash={false}>Contact us</Link></li>
            {/* <li><Link to="screen4" toHash={false}>赞助商</Link></li> */}
          </ul>)}
      </nav>
       <nav key="nav" className="" style={{marginLeft:'400px'}}>
       {!this.props.isMobile ?
         <ul>
           <li>
               <button className="btn btn-outline-dove manrope" style={{fontSize:'14px', fontWeight:'700'}}>Sign in</button>
           </li>
           <li>
               <button className="btn btn-dove manrope" style={{fontSize:'14px', fontWeight:'700'}}>Create free account</button>
           </li>
           
         </ul> : null}
     </nav>
          {/* {header} */}

          
        </div>
        <TweenOneGroup
          component=""
          enter={{ y: -80, opacity: 0, type: 'from' }}
          leave={{ y: -80, opacity: 0 }}
        >
          {!noTop && !isMobile && (
            <div className="site-top no-banner" key="nav">
              {headerFix}
            </div>)}
        </TweenOneGroup>
      </header> : <header key="nav" >

<div className="site-top">
<Link className="logo" to="screen0" toHash={false} key="logo">
<img src={logo} style={{left:'0rem', top:'0rem', width:'95px', height:'28.96px'}}/>
  </Link>
<nav key="nav">
{!this.props.isMobile && (
  <ul>
    <li><Link to="screen1" toHash={false}>Product</Link></li>
    <li><Link to="screen2" toHash={false}>Services</Link></li>
    <li><Link to="screen3" toHash={false}>Contact us</Link></li>
    {/* <li><Link to="screen4" toHash={false}>赞助商</Link></li> */}
  </ul>)}
</nav>
<nav key="nav" className="">
{!this.props.isMobile ?
 <ul>
   <li>
       <button className="btn btn-outline-dove manrope" style={{fontSize:'13px', fontWeight:'700'}}>Sign in</button>
   </li>
   <li>
       <button className="btn btn-dove manrope" style={{fontSize:'13px', fontWeight:'700'}}>Create free account</button>
   </li>
   
 </ul> : null}
</nav>
  {/* {header} */}

  
</div>
<TweenOneGroup
  component=""
  enter={{ y: -80, opacity: 0, type: 'from' }}
  leave={{ y: -80, opacity: 0 }}
>
  {!noTop && !isMobile && (
    <div className="site-top no-banner" key="nav">
      {headerFix}
    </div>)}
</TweenOneGroup>
</header>}
      </div>
    );
  }
}
