import React, { useState } from "react";
import "./styles.css";
import { Select } from "../../components";
import dataSet from "../../dataSet";
import {
  checkNameNotNullOrTooShort,
  checkRepeatedStops,
} from "../../validations/newConnection";

export const NewConnection = () => {
  const [name, setName] = useState("");
  const [firstStop, setFirstStop] = useState<null | string>(null);
  const [secondStop, setSecondStop] = useState<null | string>(null);
  const [thirdStop, setThirdStop] = useState<null | string>(null);
  const [renderThirdStop, setRenderThirdStop] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const { stops } = dataSet;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!firstStop || !secondStop) {
      // this will never happen but...
      // on the backedn it must be validated anyway.
      // its always worth to validate in the front and back
      // since:
      // 1. better safe than sorry
      // 2. if validations fail in the front that is one server
      // req less == less cost per server
      setError("A connection needs at least two stops");
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
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
    if (checkRepeatedStops(firstStop!, secondStop!, thirdStop)) {
      setError(
        "Connections cant have the same stop more than once in a route."
      );
      setTimeout(() => {
        setError(null);
      }, 5000);
      return;
    }
  };

  return (
    <main className="mainContainer">
      <div className="titleContainer">
        <h1 className="title">Create a new connection</h1>
      </div>
      <form onSubmit={handleSubmit} className="form">
        {error && <h2>{error}</h2>}

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

        <Select stops={stops} setStop={setFirstStop} />
        <Select stops={stops} setStop={setSecondStop} />

        {renderThirdStop && <Select stops={stops} setStop={setThirdStop} />}

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
              name.length === 0 || firstStop === null || secondStop === null
            }
          >
            Create
          </button>
        </div>
      </form>
    </main>
  );
};
