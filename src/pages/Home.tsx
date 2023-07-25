import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <main>
      <div>
        <h1>My Connections</h1>
      </div>
      <div>{/* TODO RENDER CONNECTIONS */}</div>
      <div>
        <button type="button">
          <Link to="/new-connection">Add New</Link>{" "}
        </button>
      </div>
    </main>
  );
};
