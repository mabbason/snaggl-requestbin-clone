import axios from "axios";
const root = "https://snaggl.corkboard.dev";

const createBin = () => {
  let request = axios.post(`${root}/api/bins`);
  return request.then(response => response.data);
};

const getRequests = (path) => {
  let request = axios.get(`${root}/api/bins/${path}?inspect`);
  return request.then(response => response.data);
}

const dbOps = {
  createBin,
  getRequests
};

export default dbOps;