import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { Connection, Home, NewConnection } from "./pages";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/new-connection" element={<NewConnection />} />
            <Route path="/connection" element={<Connection />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
