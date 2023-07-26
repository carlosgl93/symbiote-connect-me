import React from "react";
import { useParams } from "react-router-dom";
export const Connection = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Connection {id}</h2>
    </div>
  );
};
