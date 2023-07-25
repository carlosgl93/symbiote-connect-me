import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/connection">Connections</Link>
        </li>
      </ul>
    </nav>
  );
};
