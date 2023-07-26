export type Route = {
  id: string;
  mode: string;
  title: string;
  directions: Direction;
};

export type Direction = {
  [key: string]: string;
};
