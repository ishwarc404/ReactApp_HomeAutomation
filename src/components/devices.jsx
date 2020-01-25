import React, { Component } from "react";
class DevicesConnected extends Component {
  render() {
    let centre_class = "d-flex justify-content-center";
    let badge1_class = "badge m-2 badge-dark ";
    let button1_class = "btn  m-2 btn-success";
    let button2_class = "btn m-2 btn-danger";
    return (
      <React.Fragment>
        <div className={centre_class}>
    <span style={{ width: 200 }} className={badge1_class}><h3>{this.props.name}</h3></span>
          <button style={{ fontSize: 20 }} className={button1_class} id={this.props.name}>
            ON
          </button>
          <button style={{ fontSize: 20 }} className={button2_class} id={this.props.name} >
            OFF
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default DevicesConnected;
