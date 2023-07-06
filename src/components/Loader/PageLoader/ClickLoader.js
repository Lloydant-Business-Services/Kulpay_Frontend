import React from 'react'
import './PageLoader.css'
import loader from './loader.gif';
import logo from "../../../assets/images/17.png"
import $ from "jquery"
import { enquireScreen } from 'enquire-js';



import { WhisperSpinner, RainbowSpinner, SwapSpinner, StageSpinner, ImpulseSpinner } from "react-spinners-kit";
import { Component } from 'react';


class ClickLoader extends Component {
    
    

    render(){
       
    return (
        <div>
            <ImpulseSpinner size={50} backColor={"#1B52C4"} frontColor={"#FFF"}/>
      </div>
    )
}
}

export default ClickLoader
