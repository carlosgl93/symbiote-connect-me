import axios from "axios";
import { Connection, Stop } from "../types";
import { Data } from "../types/data";

// normally if the api requires some kind of auth like an api key
// this would be defined from process.env.STOPS_API_URL
const baseUrl = "http://localhost:3001";
const connectionsEndpoint = `${baseUrl}/connections`;

const getAll = async () => {
  try {
    const res = await Promise.all([
      axios.get(`${baseUrl}/stops`),
      axios.get(`${baseUrl}/routes`),
      axios.get(`${baseUrl}/departures`),
      axios.get(connectionsEndpoint),
    ]);
    const normalizedData: Data = {
      stops: res[0].data,
      routes: res[1].data,
      departures: res[2].data,
      connections: res[3].data,
    };
    return normalizedData;
    // const data = res.map((res) => res.data);
    // return data.flat();
  } catch (error) {
    console.log("error fetching all resources", error);
  }
};

const getAllConnections = async () => {
  try {
    const res = await axios.get(connectionsEndpoint);
    return res.data;
  } catch (error) {
    console.log("there was an error fetching all", error);
  }
};

const getConnectionById = async (id: string) => {
  try {
    const res = await axios.get(`${connectionsEndpoint}/:${id}`);
    return res.data;
  } catch (error) {
    console.log(`there was an error fetching id: ${id} `, error);
  }
};

const createConnection = async (newConnection: Connection) => {
  try {
    const res = await axios.post<Stop>(connectionsEndpoint, newConnection);
    return res.data;
  } catch (error) {
    console.log("there was an error fetching all stops", error);
  }
};

export default {
  getAll,
  getAllConnections,
  getConnectionById,
  createConnection,
};
