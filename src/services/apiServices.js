import Api from "../api/index";
let apiInstance = new Api();

export default class ApiServices {
  async readFromDatabase(type) {
    let returnedData;
    returnedData = await apiInstance.instance.get(`${type}`);

    return returnedData.data;
  }

  async writeToDatabase(data, type) {
    let returnedData;
    returnedData = await apiInstance.instance.post(`${type}`, data);

    return returnedData;
  }

  async updateDatabase(data, type) {
    let returnedData;
    returnedData = await apiInstance.instance.put(`${type}/${data.id}`, data);

    return returnedData;
  }

  async validateCredentials(type, username, password) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}&&password=${password}`
    );

    console.log(returnedData.data);
    if (returnedData.data.length == 1) {
      return true;
    } else {
      return false;
    }
  }

  async getUserDevices(type, username) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}`
    );
    return returnedData.data[0].devices;
  }

  async getUserSensors(type, username) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}`
    );
    console.log("SENSOR DATA:", returnedData.data[0].sensors);
    return returnedData.data[0].sensors;
  }

  async getDeviceData(type, username) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}`
    );
    return returnedData.data[0].devices;
  }

  async getusageData(type, username) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}`
    );
    return returnedData.data[0].usageData;
  }

  async getElectricityData(type, username) {
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `${type}?username=${username}`
    );
    return returnedData.data[0].electricity_usage;
  }

  async addUserToDatabase(data) {
    //we need to make sure that username does not already exist
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `loginAuthentication?username=${data.username}`
    );
    console.log(returnedData.data)
    if (returnedData.data.length != 0) {
      return false;
    } else {
      returnedData = await apiInstance.instance.post(
        "loginAuthentication",
        data
      );
      //we now need to add devices and stuff too
      let tempdata = {
        username: data.username,
        devices:{
          device_name:[],
          device_ID:[]
        },
        sensors:{
          sensor_name:[],
          sensor_ID:[],
          sensor_value:[]
        },
        usageData:[]
      }

      //we need to post this too
      await apiInstance.instance.post(
        "deviceData",
        tempdata
      );
      return true;
    }
  }

  async addDeviceToDatabase(newData) {
    //we need to make sure that username does not already exist
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `deviceData?username=${newData.username}`
    );
    if (returnedData.data.length == 0) {
      return false;
    } else {
      //lets modify the returneddata
      let data = returnedData.data[0];
      // console.log(data);
      data.devices.device_name.push(newData.device_name)
      data.devices.device_ID.push(newData.device_ID)
      returnedData = await apiInstance.instance.put(`deviceData/${data.id}`, data);
      return true;
    }
  }

  async addSensorToDatabase(newData) {
    //we need to make sure that username does not already exist
    let returnedData;
    returnedData = await apiInstance.instance.get(
      `deviceData?username=${newData.username}`
    );
    if (returnedData.data.length == 0) {
      return false;
    } else {
      //lets modify the returneddata
      let data = returnedData.data[0];
      // console.log(data);
      data.sensors.sensor_name.push(newData.sensor_name)
      data.sensors.sensor_ID.push(newData.sensor_ID)
      returnedData = await apiInstance.instance.put(`deviceData/${data.id}`, data);
      return true;
    }
  }
}
