import React, { Component } from "react";

export const Context = React.createContext();

export class LanguageStore extends Component {
  state = { language: "english" };

  onLanguageChange = language => {
    this.setState({ language });
  };

  render() {
    return (
      <Context.Provider
        value={"Miracle" }
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

//export default Context;
