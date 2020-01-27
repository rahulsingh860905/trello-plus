import axios from "axios";

const databaseURL = "https://todo-64f48.firebaseio.com";
const project = "trello";
const defaultBoard = "board";

const getInstance = () => {
  const baseURL = databaseURL + "/" + project + "/" + defaultBoard + "/";
  const instance = axios.create({
    baseURL: baseURL
  });
  return instance;
};

export default getInstance();
