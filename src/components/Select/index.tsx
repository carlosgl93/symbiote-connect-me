import React from "react";
import { Stop } from "../../types";

type Props = {
  value: string;
  stops: Stop[] | undefined;
  setStop: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const Select: React.FC<Props> = ({ value, stops, setStop }) => {
  return (
    <select value={value} onChange={setStop}>
      <option value="">--Please choose an option--</option>
      {stops?.map((s) => (
        <option key={s.id} value={s.id}>
          {s.title}
        </option>
      ))}
    </select>
  );
};
