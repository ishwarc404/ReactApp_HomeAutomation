import React, { Component } from "react";
import Temperature from "./Temperature.png";
import Motion from "./Motion.png";

class SensorData extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    let centre_class = "d-flex justify-content-center";
    return (
      <React.Fragment>
        <div className={centre_class}>
          <div class="card text-black bg-light mb-3" style={{ maxWidth: 300 }}>
            <div class="card-body">
              <h5 class="card-title">{this.props.sensor_name}</h5>
              <p class="card-text">
                <h3>
                  <img
                    src={require("./assets/images/" +
                      this.props.sensor_name +
                      ".png")}
                    style={{ height: 90 }}
                  />
                  &nbsp; &nbsp;
                  {this.props.sensor_value}
                </h3>
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SensorData;
