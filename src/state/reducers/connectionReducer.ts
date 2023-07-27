import { Data, Connection, NewConnection } from "../../types";

const initialState: Data = {
  connections: [],
  departures: [],
  routes: [],
  stops: [],
};

type Action =
  | {
      type: "CREATE_CONNECTION";
      payload: Connection;
    }
  | {
      type: "LOAD_STATE";
      payload: Data;
    };

const connectionReducer = (state = initialState, action: Action) => {
  console.log("reducer state", state);
  switch (action.type) {
    case "CREATE_CONNECTION":
      return (state = {
        ...state,
        connections: [...state.connections, action.payload],
      });
    case "LOAD_STATE":
      return (state = action.payload);
    default:
      return state;
  }
};

// action creators

export const createConnection = (newConnection: Connection) => {
  return {
    type: "CREATE_CONNECTION",
    payload: newConnection,
  };
};

export const loadInitialState = (initialData: Data) => {
  return {
    type: "LOAD_STATE",
    payload: initialData,
  };
};

export default connectionReducer;
