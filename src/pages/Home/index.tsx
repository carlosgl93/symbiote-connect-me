import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Data } from "../../types";
import "./styles.css";

export const Home = () => {
  const connections = useSelector((state: Data) => state.connections);

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
