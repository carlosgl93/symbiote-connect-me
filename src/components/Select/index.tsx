import React from "react";
import { Stop } from "../../types";

type Props = {
  stops: Stop[];
  setStop: (e: any) => void;
};

export const Select: React.FC<Props> = ({ stops, setStop }) => {
  return (
    <select
      onChange={(e) => setStop((prev: string[]) => [...prev, e.target.value])}
    >
      <option value="">--Please choose an option--</option>
      {stops.map((s) => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
    </select>
  );
};
