import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../Auxiliary/Auxiliary";

//Global Error Handling using axios interceptors
const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };
    componentWillMount() {
      this.reqInterceptos = axios.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });
      this.respInterceptors = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }
    componentWillUnmount() {
      // Clearing old Interceptors
      axios.interceptors.request.eject(this.reqInterceptos);
      axios.interceptors.response.eject(this.respInterceptors);
    }
    errorConfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };
    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            <p style={{ textAlign: "center" }}>
              {this.state.error ? this.state.error.message : null}
            </p>
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxiliary>
      );
    }
  };
};

export default withErrorHandler;
