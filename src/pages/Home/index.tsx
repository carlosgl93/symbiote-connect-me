import React, { useState, useEffect } from "react";
import "./styles.css";
import connectionsService from "../../services/connections";
import { Link } from "react-router-dom";

export const Home = () => {
  const [data, setData] = useState<null | any[]>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      connectionsService.getAllConnections().then((res) => {
        setData(() => res);
        setLoading(false);
      });
    } catch (error) {
      console.log(`error fetching connections`, error);
      setLoading(false);
    }
  }, []);

  return (
    <main>
      <div>
        <h1>My Connections</h1>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {data && data.length > 0 ? (
          data.map((c) => (
            <div key={c.id}>
              <Link to={`/connection/${c.id}`}>{c.title}</Link>
            </div>
          ))
        ) : (
          <h3>Start adding your connections:</h3>
        )}
      </div>

      <div className="ctaContainer">
        <button type="button">
          <Link to="/new-connection">Add New</Link>
        </button>
      </div>
    </main>
  );
};
