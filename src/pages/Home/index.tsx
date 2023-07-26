import React, { useContext } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { ConnectionsContext } from "../../state/ConnectionsContext";

export const Home = () => {
  const { connections } = useContext(ConnectionsContext);

  return (
    <main>
      <div className="title">
        <h1>My Connections</h1>
      </div>

      <div>
        {connections?.length ? (
          connections.map((c) => (
            <div key={c.id}>
              <Link to={`/connection/${c.id}`}>{c.title}</Link>
            </div>
          ))
        ) : (
          <h3>Start adding your connections:</h3>
        )}
      </div>

      <div className="ctaContainer">
        <Link to="/new-connection">Add New</Link>
      </div>
    </main>
  );
};
