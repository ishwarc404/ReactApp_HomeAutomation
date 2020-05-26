import axios from "axios";

export default class FlaskApi {
  instance = axios.create({
    baseURL: "http://127.0.0.1:8000/"
  });
}
