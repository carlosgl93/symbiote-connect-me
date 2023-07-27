import { useParams } from "react-router-dom";
import { Stop } from "../../components/Stop";
import { Connection as ConnectionType, Data } from "../../types";
import { useSelector } from "react-redux";
import "./styles.css";

export const Connection = () => {
  const { id } = useParams();
  const connections = useSelector((state: Data) => state.connections);
  const stops = useSelector((state: Data) => state.stops);
  const departures = useSelector((state: Data) => state.departures);
  const routes = useSelector((state: Data) => state.routes);

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
