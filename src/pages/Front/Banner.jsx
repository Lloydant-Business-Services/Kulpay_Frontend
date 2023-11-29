import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Button } from "antd";
import TweenOne from "rc-tween-one";
import BannerBg from "../../layouts/BannerBg";
import { enquireScreen } from "enquire-js";

// import * as pageData from './data';

// const { banner, button } = pageData;

const yAnim = {
    // y: 30,
    // opacity: 0,
    // type: "from",
    // ease: "easeOutCubic",
    // duration: 300,
};

export default class Banner extends Component {
    state = {
        className: "banner",
    };
    componentDidMount() {
        enquireScreen((b) => {
            this.setState({
                isMobile: b,
            });
        });
    }
    onEnd = () => {
        /* this.setState({
      showBg: true,
    }); */
    };
    // getTextToRender = (text, delay) => {
    //     const textArray = text.split("");
    //     return textArray.map((t, i) => (
    //         <TweenOne
    //             key={i.toString()}
    //             component="span"
    //             animation={{
    //                 y: 60,
    //                 opacity: 0,
    //                 type: "from",
    //                 ease: "easeOutQuint",
    //                 delay: delay + i * 50,
    //                 duration: 450,
    //             }}
    //         >
    //             {t === " " ? <span>&nbsp;</span> : t}
    //         </TweenOne>
    //     ));
    // };
    render() {
        const {
            className,
            isMobile, // showModal,
        } = this.state;
        // const titleChild = this.getTextToRender(isMobile ? 'Kul Pay' : banner.title, 600);
        return (
            <div className={className}>
                <BannerBg />
                <div className={`${className}-content`}>
                    {/* <TweenOne component="p" animation={{ ...yAnim, delay: 500 }} title="EXPERIENCE & ENGINEERING" className="en-name">
            {isMobile ? banner.title : banner.enName}
          </TweenOne> */}
                    <TweenOne component="h2" animation={{ ...yAnim, delay: 600 }}>
                        {isMobile ? (
                            <div className="">
                                <h2 className="outfit_head" style={{ fontSize: "40px", color: "white", marginTop: "0px" }}>
                                    Number #1, <br />  Digital Remitance <br />Platform
                                </h2>
                            </div>
                        ) : (
                            <h2 className="outfit_head" style={{ fontSize: "58px", color: "white", lineHeight: '80px' }}>
                                Number #1, Digital <br /> Remitance Platform
                            </h2>
                        )}
                    </TweenOne>
                    {/* <TweenOne component="p" animation={{ ...yAnim, delay: 700 }} className="cn-name">
            {banner.cnName}
          </TweenOne> */}
                    <TweenOne animation={{ ...yAnim, delay: 800 }} className="extra" key="text">
                        {isMobile ? (
                            <div className="">
                                <small className="outfit_text" style={{ fontSize: "16px", color: "#FFF" }}>
                                    We bring the results while helping you achieve cost and time and time savings without taking on risk or management overhead.
                                </small>
                                <br />
                                <br />
                                <small className="outfit_text" style={{ fontSize: "16px", color: "#FFF" }}>
                                  Faster, smater and seamless integration into you applications
                                </small>
                            </div>
                        ) : (
                            <p style={{ fontSize: "18px", color: "#FFF" }} className="outfit_text">
                                We bring the results while helping you achieve cost and time <br />
                                savings without taking on risk or management overhead.
                            </p>
                        )}
                    </TweenOne>
                    {/* <TweenOne animation={[{ ...yAnim, delay: 900, pointerEvents: 'none' }, { pointerEvents: '', duration: 0 }]} className="home-button" key="home-button">
            <Button type="primary">
              button onClick={showModal}
              <a>{button}</a>
            </Button>
          </TweenOne> */}
                </div>
            </div>
        );
    }
}
