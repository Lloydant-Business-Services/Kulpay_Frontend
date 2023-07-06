import React from 'react'
import './PageLoader.css'
import loader from './loader.gif';
import logo from "../../../assets/images/17.png"
import $ from "jquery"
import { enquireScreen } from 'enquire-js';



import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner } from "react-spinners-kit";
import { Component } from 'react';


class KulLoader extends Component {
    isLoadedFunc = () => {
        var image = document.querySelector('img');
        var isLoaded = image.complete && image.naturalHeight !== 0;
        if(isLoaded){
            setTimeout(() => {
                $('#preloader').delay(450).fadeOut('slow');
            }, 3000);
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.isLoadedFunc();
        }, 1000);
        enquireScreen((b) => {
            this.setState({
              isMobile: b,
            });
          });
    }

    render(){
       
    return (
        <div id="preloader">
            <div id="status">
                
                <img src={logo} style={{left:'-3rem', top:'-3rem', width:'140px',marginTop:'10px', position:'absolute'}}/>
                <StageSpinner color="#05EEC0" backColor="#FFF" frontColor="#FFF" size={60}/>


            </div>
      </div>
    )
}
}

export default KulLoader
