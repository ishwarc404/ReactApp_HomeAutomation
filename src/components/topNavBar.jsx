import React, { Component } from "react";
import DevicesConnected from "./devices";
import Modal from "react-modal";

class NavigationBar extends Component {
  state = { device_counters: [] };

  constructor() {
    super();
    this.addnewDevice = this.addnewDevice.bind(this);
    this.removeDevice = this.removeDevice.bind(this);
    this.importDevices = this.importDevices.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let badge1_class = "badge m-2 badge-primary ";
    let badge2_class = "badge m-2 badge-dark ";
    let addnewdevicebutton_class = "btn  m-2 btn-dark";
    let importdevicebutton_class = "btn  m-2 btn-dark";
    return (
      <div>
        <div>
            <h2 style={{ fontSize: 50 , color:"white", fontFamily:"Helvetica Neue"}} className={centre_class}>
              Home Automation System
            </h2>
        </div>
        <div>
            <h2 style={{ fontSize: 30 , color:"#e6e6e6", fontFamily:"Helvetica Neue"}} className={centre_class}>
              Devices Connected
            </h2>
        </div>
        <div className={centre_class}>
          <button
            className={importdevicebutton_class}
            onClick={this.importDevices}
          >
            IMPORT DEVICES
          </button>
          {/* </div>
        <div className={centre_class}> */}
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
              device_name={counter.device_name}
              device_ID={counter.device_ID}
            ></DevicesConnected>
          ))}
        </div>
      </div>
    );
  }

  async importDevices() {
    var userName = prompt("Enter username:");
    var userPassword = prompt("Enter password:");

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var targetUrl = "https://api.myjson.com/bins/wx6ee";
    let data_retrtieved;
    this.state.device_counters = [];
    console.log("imported");
    await fetch(proxy + targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );
    for (var i = 0; i < data_retrtieved["device_name"].length; i++) {
      this.state.device_counters.push({
        device_name: data_retrtieved.device_name[i],
        device_ID: data_retrtieved.device_ID[i]
      });
    }
    this.setState({ device_counters: this.state.device_counters });
  }

  addnewDevice() {
    var deviceName = prompt("Enter device name:");
    var deviceID = prompt("Enter device code:");

    if (deviceName === null) {
      return;
    }
    if (deviceID.length === null) {
      return;
    }
    if (deviceName.length === 0) {
      return;
    }
    if (deviceID.length === 0) {
      return;
    }
    this.state.device_counters.push({
      device_name: deviceName,
      device_ID: deviceID
    }); //these will be used to identify the device

    this.setState({ device_counters: this.state.device_counters });
  }

  removeDevice() {
    this.state.device_counters.pop();
    console.log(this.state.device_counters);
    this.setState({ device_counters: this.state.device_counters });
  }
}

export default NavigationBar;
