import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Select } from "../../components";
import dataSet from "../../dataSet";
import axios from "axios";
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

  const { stops } = dataSet;

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // if (!firstStop || !secondStop) {
    //   // this will never happen but...
    //   // on the backedn it must be validated anyway.
    //   // its always worth to validate in the front and back
    //   // since:
    //   // 1. better safe than sorry
    //   // 2. if validations fail in the front that is one server
    //   // req less == less cost per server
    //   setError("A connection needs at least two stops");
    //   setTimeout(() => {
    //     setError(null);
    //   }, 5000);
    //   return;
    // }
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
    // if (checkRepeatedStops(firstStop!, secondStop!, thirdStop)) {
    //   setError(
    //     "Connections cant have the same stop more than once in a route."
    //   );
    //   setTimeout(() => {
    //     setError(null);
    //   }, 5000);
    //   return;
    // }

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
      console.log(result, "result");
      setLoading(false);
      setFormStops([]);
      return navigate(`/connection/${result.data.id}`);
    } catch (error) {
      // setError(error);
      setLoading(false);
    }
  };

  return (
    <main className="mainContainer">
      <div className="titleContainer">
        <h1 className="title">Create a new connection</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {error && <h2>{error}</h2>}

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

            <Select stops={stops} setStop={setFormStops} />
            <Select stops={stops} setStop={setFormStops} />

            {renderThirdStop && <Select stops={stops} setStop={setFormStops} />}

            <div className="CTAs">
              <button
                type="button"
                onClick={() => setRenderThirdStop(!renderThirdStop)}
              >
                {renderThirdStop ? "Remove third stop" : "Add another stop"}
              </button>

              <button
                type="submit"
                disabled={name.length === 0 || formStops.length < 2}
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
