import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ConnectionsContext } from "./state/ConnectionsContext";
import { Connection, Home, NewConnection } from "./pages";
import { Layout } from "./components";
import "./App.css";
import connectionsService from "./services/connections";
import { Connection as ConnectionType, Data } from "./types";

function App() {
  const [data, setData] = useState<undefined | Data>();

  const [error, setError] = useState<Boolean>(false);

  const [connections, setConnections] = useState<
    undefined | ConnectionType[]
  >();
  // in a real world scenario i would decouple the state management in a redux style
  // i would have a file for the context definition
  // i would have file for the provider with the state, action types and dispatches
  // i would have file for the reducer

  useEffect(() => {
    try {
      connectionsService.getAll().then((res) => {
        setData(res);
      });
    } catch (error) {
      setError(true);
      console.log("error fetching all resources", error);
    }
  }, []);

  useEffect(() => {
    setConnections(() => data?.connections);
  }, [data]);

  if (error)
    return (
      <div>
        <h1>There was an error, please check if the server is running</h1>
      </div>
    );

  return (
    <ConnectionsContext.Provider
      value={{
        connections,
        departures: data?.departures,
        routes: data?.routes,
        stops: data?.stops,
        setConnections,
        // only useState for connections since its the only one that will be updated
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-connection" element={<NewConnection />} />
            <Route path="/connection/:id" element={<Connection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConnectionsContext.Provider>
  );
}

export default App;
