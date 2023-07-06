import React, { useState } from 'react';
import { Component } from 'react';
import $ from "jquery";
import Endpoint from "../utils/endpoint";
export const UserContext = React.createContext();

// export const UserProvider = (props) => {
// const [cart, setCart] = useState([]);

//     return(
//         <UserContext.Provider value="Parsed Value">
//             {props.children }
//         </UserContext.Provider>
//     )
// }


export class UserProvider extends Component{ 
    constructor(props) {
        super(props)
        this.state = {
          testName: "Miracle...",
          user_info: JSON.parse(localStorage.getItem("_IDENTITY_")),

        }
      }
      loadDataFromServer = () => {
        
        Endpoint.getPersonDetails(this.state.user_info?.personId)
            .then((res) => {
                console.log(res, "From Context")
                this.setState({
                    personDetails: res.data
                });
                               
                    $("#preloader").delay(450).fadeOut("slow");
             

            })
            .catch((error) => {
                //loadDataError(error, this);
                //this.setState({ pageLoading: false });
            });
    };
  

      componentDidMount(){
        this.loadDataFromServer()
      }
      render(){
          const {personDetails, testName} = this.state; 
          return(
            <UserContext.Provider value={{
               
                testName
               
            }}>
                {this.props.children }
            </UserContext.Provider>
          )
      }
}

export default UserProvider;