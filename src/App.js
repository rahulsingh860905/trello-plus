import React, { Component } from "react";
import NetworkDetector from "./hoc/NetworkDetector/NetworkDetector";
import Board from "./containers/Board/Board";

class App extends Component {
  render() {
    return <Board />;
  }
}

export default NetworkDetector(App);
