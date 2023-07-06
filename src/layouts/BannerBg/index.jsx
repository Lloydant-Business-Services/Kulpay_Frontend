import React from 'react';
// import BgCanvas from './bgCanvas';
import oval from "../../assets/images/Oval.png"
import oval2 from "../../assets/images/Oval2.png"
import $ from 'jquery'

export default class BannerBg extends React.PureComponent {
  componentDidMount() {
    //new BgCanvas(this.canvas);
  }
  render() {
    let screen_width = $(window).width();
    return (
      <div className="banner-bg" id="banner">
          <img src={oval2} style={{position:'absolute', left:'0rem', top:'0rem'}}/>
          <img src={oval} style={{position:'absolute', left:'72rem', top:'8rem'}}/>
        {/* <canvas
          ref={(c) => {
            this.canvas = c;
          }}
        /> */}
      </div>);
  }
}
