import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Select } from "../../components";
import axios from "axios";
import { ConnectionsContext } from "../../state/ConnectionsContext";
import {
  checkNameNotNullOrTooShort,
  checkRepeatedStops,
} from "../../validations/newConnection";

export const NewConnection = () => {
  const [name, setName] = useState("");
  const [formStops, setFormStops] = useState<string[]>([]);
  const [renderThirdStop, setRenderThirdStop] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { stops, setConnections } = useContext(ConnectionsContext);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (formStops.find((f) => f === e.target.value)) {
      setError("Make sure to not select the same stop twice");
      return;
    } else {
      setError(null);
      setFormStops((prev) => [...prev, e.target.value]);
    }
  };

  console.log({ error });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // check connection name
    if (checkNameNotNullOrTooShort(name)) {
      setError("Connections must have a name longer than 3 characters.");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }

    // validate correct stops
    // this could be improved by removing the option that has already been selected
    // so the user COUDNT be mistaken and may increase the UX
    if (checkRepeatedStops(formStops)) {
      setError(
        "Connections cant have the same stop more than once in a route."
      );
      setTimeout(() => {
        setError(null);
        setFormStops(() => []);
      }, 5000);
      return;
    }

    const newConnection = {
      title: name,
      stops: formStops,
    };
    console.log(newConnection);

    setLoading(true);

    try {
      const result = await axios.post(
        "http://localhost:3001/connections",
        newConnection
      );
      setLoading(false);
      setFormStops(() => []);
      const newCon = result.data;
      setConnections((prev) => prev?.concat(newCon));
      return navigate(`/connection/${newCon.id}`);
    } catch (error) {
      // setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="mainContainer">
      <div className="titleContainer">
        <h1 className="title">Create a new connection</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {error && <h4>{error}</h4>}

        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <>
            <div className="nameContainer">
              <label htmlFor="title">Name:</label>
              <input
                name="title"
                type="text"
                placeholder="To Work"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="nameInput"
              />
            </div>

            <Select value={formStops[0]} stops={stops} setStop={handleSelect} />
            <Select value={formStops[1]} stops={stops} setStop={handleSelect} />

            {renderThirdStop && (
              <Select
                value={formStops[2]}
                stops={stops}
                setStop={handleSelect}
              />
            )}

            <div className="CTAs">
              <button
                type="button"
                onClick={() => setRenderThirdStop(!renderThirdStop)}
              >
                {renderThirdStop ? "Remove third stop" : "Add another stop"}
              </button>

              <button
                type="submit"
                disabled={
                  name.length === 0 || renderThirdStop
                    ? formStops.length < 3
                    : formStops.length < 2
                }
              >
                Create
              </button>
            </div>
          </>
        )}
      </form>
    </main>
  );
};
