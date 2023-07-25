import React from "react";
import { Stop } from "../../types";

type Props = {
  stops: Stop[];
  setStop: React.Dispatch<React.SetStateAction<string | null>>;
};

export const Select: React.FC<Props> = ({ stops, setStop }) => {
  return (
    <select onChange={(e) => setStop(e.target.value)}>
      <option value="">--Please choose an option--</option>

      {stops.map((s) => (
        // here i set the valeu to the id because of the posibility of having the same stop but with different 'mode'
        <option
          key={s.id}
          value={s.id}
          onSelect={(e) => {
            console.log(e.target);
            // setStop(e.target);
          }}
        >
          {s.title}
        </option>
      ))}
    </select>
  );
};
