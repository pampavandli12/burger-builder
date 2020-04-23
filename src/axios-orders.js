import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-acde8.firebaseio.com/",
});

export default instance;
