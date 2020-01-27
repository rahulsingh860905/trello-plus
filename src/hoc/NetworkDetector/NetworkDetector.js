import React, { Component } from "react";
import Helmet from "react-helmet";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

export default function(ComposedComponent) {
  class NetworkDetector extends Component {
    state = {
      isDisconnected: false,
      modalStatus: true
    };

    componentDidMount() {
      this.handleConnectionChange();
      window.addEventListener("online", this.handleConnectionChange);
      window.addEventListener("offline", this.handleConnectionChange);
    }

    componentWillUnmount() {
      window.removeEventListener("online", this.handleConnectionChange);
      window.removeEventListener("offline", this.handleConnectionChange);
    }

    handleConnectionChange = () => {
      const condition = navigator.onLine ? "online" : "offline";
      if (condition === "offline") {
        return this.setState({ isDisconnected: true, modalStatus: true });
      } else {
        return this.setState({ isDisconnected: false });
      }
    };

    render() {
      const { isDisconnected } = this.state;
      return (
        <Aux>
          <Modal
            show={this.state.isDisconnected && this.state.modalStatus}
            modalClosed={() => this.setState({ modalStatus: false })}
          >
            <h2>
              Application is Offline. But you can continue using it. It will
              sync automatically once application is online.
            </h2>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          {isDisconnected && (
            <Helmet bodyAttributes={{ style: "background-color : #eee" }} />
          )}
          <ComposedComponent {...this.props} />
        </Aux>
      );
    }
  }

  return NetworkDetector;
}
