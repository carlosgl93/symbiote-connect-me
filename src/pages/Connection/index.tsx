import React, { useContext } from "react";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Stop } from "../../components/Stop";
import { ConnectionsContext } from "../../state/ConnectionsContext";
import { Connection as ConnectionType } from "../../types";

export const Connection = () => {
  const { id } = useParams();

  console.log("id", id);
  const { connections, stops, routes, departures } =
    useContext(ConnectionsContext);

  console.log("connections", connections);

  const conToRender: ConnectionType | undefined = connections?.find(
    (c) => String(c.id) === id
  );

  if (!conToRender)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  // const { title, stops } = conToRender;

  return (
    <div>
      <div>
        <h1 className="title">Connection {conToRender?.title}</h1>
      </div>
      {conToRender.stops.map((s) => {
        const stop = stops?.find((_s) => _s.id === s);
        const route = routes?.find((r) => r.mode === stop?.mode);
        const deps = departures!.filter((d) => route?.directions[d.direction]);
        return <Stop key={stop?.id} deps={deps} route={route} stop={stop} />;
      })}
    </div>
  );
};
