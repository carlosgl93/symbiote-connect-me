export type Connection = {
  id: string;
  title: string;
  stops: string[];
};

export type NewConnection = Omit<Connection, "id">;
