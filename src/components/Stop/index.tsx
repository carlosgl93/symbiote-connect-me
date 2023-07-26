import React, { FC } from "react";
import "./styles.css";
import { Tram, Bus, Train } from "../../svgs/";
import { Departure, Route, Stop as StopType } from "../../types";

type Props = {
  stop: StopType | undefined;
  route: Route | undefined;
  deps: Departure[];
};

export const Stop: FC<Props> = ({ stop, route, deps }) => {
  return (
    <div className="stopContainer">
      <div className="icon">
        {/* icon */}
        {route?.mode === "tram" ? (
          <Tram />
        ) : route?.mode === "bus" ? (
          <Bus />
        ) : (
          <Train />
        )}
      </div>
      <div className="left">
        <h5>{stop!.title}</h5>
        <p>Towards: {route?.title}</p>
      </div>
      <div className="right">
        {deps.map((d) => {
          const dateParsed = new Date(
            Date.parse(d.departure_time_utc)
          ).toLocaleTimeString("en-AU");

          return <span key={dateParsed}>{`${dateParsed} `}</span>;
        })}
      </div>
    </div>
  );
};
