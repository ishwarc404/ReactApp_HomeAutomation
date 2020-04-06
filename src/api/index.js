import axios from "axios";

export default class Api {
  instance = axios.create({
    baseURL: "http://127.0.0.1:3000/"
  });
}
