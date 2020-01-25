import React, { Component } from "react";
import DevicesConnected from "./devices";
import Modal from "react-modal";

class NavigationBar extends Component {
  state = {
    device_counters: []
  };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let badge1_class = "badge m-2 badge-primary ";
    let badge2_class = "badge m-2 badge-dark ";
    let addnewdevicebutton_class = "btn  m-2 btn-warning";
    return (
      <React.Fragment>
        <div className={centre_class}>
          <span style={{ width: 800 }} className={badge1_class}>
            <h2 style={{ fontSize: 50 }} className={centre_class}>
              Home Automation System
            </h2>
          </span>
        </div>
        <div className={centre_class}>
          <span style={{ width: 400 }} className={badge2_class}>
            <h2 style={{ fontSize: 30 }} className={centre_class}>
              Devices Connected
            </h2>
          </span>
        </div>
        <div className={centre_class}>
          <h1></h1>
          <button
            className={addnewdevicebutton_class}
            onClick={this.addnewDevice}
          >
            <h2>+</h2>
          </button>
          <button
            className={addnewdevicebutton_class}
            onClick={this.removeDevice}
          >
            <h2>-</h2>
          </button>
        </div>
        <div>
          {this.state.device_counters.map(counter => (
            <DevicesConnected
              key={counter.id}
              name={counter.name}
            ></DevicesConnected>
          ))}
        </div>
      </React.Fragment>
    );
  }

  addnewDevice() {
    var deviceName = prompt("Enter device name:")
    var deviceCode = prompt("Enter device code:")
    this.state.device_counters.push({ "name": deviceName , "devicecode" : deviceCode}); //these will be used to identify the device
    console.log(this.state.device_counters);
    this.setState({ device_counters: this.state.device_counters });
  }
  removeDevice() {
    
    this.state.device_counters.pop();
    console.log(this.state.device_counters);
    this.setState({ device_counters: this.state.device_counters });
  }
}

export default NavigationBar;
