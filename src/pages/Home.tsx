import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Connection } from "../types";

export const Home = () => {
  const [connections, setConnections] = useState<null | Connection[]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:3001/connections").then((res) => {
      setConnections(res.data);
      setLoading(false);
    });
  }, []);

  console.log(connections);

  return (
    <main>
      <div>
        <h1>My Connections</h1>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {connections && connections.length > 0 ? (
          connections.map((c) => <div key={c.id}>{c.title}</div>)
        ) : (
          <h3>Start adding your connections:</h3>
        )}
        {/* TODO RENDER CONNECTIONS */}
      </div>

      <div>
        <button type="button">
          <Link to="/new-connection">Add New</Link>{" "}
        </button>
      </div>
    </main>
  );
};
