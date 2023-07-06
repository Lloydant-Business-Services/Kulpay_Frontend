import React, { Component, useContext } from "react";
import {Context} from "../components/TestContext";

const Movie = () => {
    const value = useContext(Context);

    return(
        <div>
            <h1>Context value is {value}</h1>
        </div>
    )
}

export default Movie;
