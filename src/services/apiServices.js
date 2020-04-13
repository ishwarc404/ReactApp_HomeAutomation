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
}
