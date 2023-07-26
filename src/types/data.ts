import { Connection, Route, Stop, Departure } from "./";

export interface Data {
  connections: Connection[];
  stops: Stop[];
  routes: Route[];
  departures: Departure[];
}
