import React, { Component } from "react";
class DevicesConnected extends Component {
  state = { data: [] };

  constructor() {
    super();
    this.onClickOn = this.onClickOn.bind(this);
    this.onClickOff = this.onClickOff.bind(this);
  }

  render() {
    let centre_class = "d-flex justify-content-center";
    let badge1_class = "badge m-2 badge-dark ";
    let button1_class = "btn  m-2 btn-success";
    let button2_class = "btn m-2 btn-danger";
    return (
      <React.Fragment>
        <div className={centre_class}>
          <span style={{ width: 200 }} className={badge1_class}>
            <h3>{this.props.name}</h3>
          </span>
          <button
            style={{ fontSize: 20 }}
            className={button1_class}
            id={this.props.devicecode}
            onClick={this.onClickOn}
          >
            ON
          </button>
          <button
            style={{ fontSize: 20 }}
            className={button2_class}
            id={this.props.devicecode}
            onClick={this.onClickOff}
          >
            OFF
          </button>
        </div>
      </React.Fragment>
    );
  }

  async onClickOn() {
    console.log(this.props.devicecode);
    console.log("Clicked On");
    //let's ping the flask server from here
    var targetUrl = "127.0.0.1:5000/led_on";
    let data_retrtieved;
    await fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  }

  async onClickOff() {
    console.log(this.props.devicecode);
    console.log("Clicked Off");
    //let's ping the flask server from here

    var targetUrl = "127.0.0.1:5000/led_off";
    let data_retrtieved;
    await fetch(targetUrl).then(response =>
      response.json().then(data => (data_retrtieved = data))
    );

    //we use await or else it will be an async call
    console.log(data_retrtieved);
  }
}

export default DevicesConnected;
