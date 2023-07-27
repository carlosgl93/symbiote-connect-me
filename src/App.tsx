import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Connection, Home, NewConnection } from "./pages";
import { Layout } from "./components";
import "./App.css";
import connectionsService from "./services/connections";
import { Connection as ConnectionType, Data } from "./types";
import { useDispatch } from "react-redux";
import { loadInitialState } from "./state/reducers/connectionReducer";

function App() {
  const [error, setError] = useState<Boolean>(false);
  const dispatch = useDispatch();

  // in a real world scenario i would decouple the state management in a redux style
  // i would have a file for the context definition
  // i would have file for the provider with the state, action types and dispatches
  // i would have file for the reducer

  useEffect(() => {
    try {
      connectionsService.getAll().then((res) => {
        dispatch(loadInitialState(res as Data));
      });
    } catch (error) {
      setError(true);
      console.log("error fetching all resources", error);
    }
  }, []);

  if (error)
    return (
      <div>
        <h1>There was an error, please check if the server is running</h1>
      </div>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new-connection" element={<NewConnection />} />
          <Route path="/connection/:id" element={<Connection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
