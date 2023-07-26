import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ConnectionsContext } from "./state/ConnectionsContext";
import { Connection, Home, NewConnection } from "./pages";
import { Layout } from "./components";
import "./App.css";
import connectionsService from "./services/connections";
import { Data } from "./types";

function App() {
  const [data, setData] = useState<undefined | Data>();

  useEffect(() => {
    connectionsService.getAll().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div>
      <ConnectionsContext.Provider
        value={{
          connections: data?.connections,
          departures: data?.departures,
          routes: data?.routes,
          stops: data?.stops,
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
    </div>
  );
}

export default App;
