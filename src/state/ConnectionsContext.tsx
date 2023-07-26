import { createContext } from "react";
import { Connection, Departure, Route, Stop } from "../types";

interface ContextProps {
  connections: Connection[] | undefined;
  stops: Stop[] | undefined;
  routes: Route[] | undefined;
  departures: Departure[] | undefined;
}
export const ConnectionsContext = createContext({} as ContextProps);
