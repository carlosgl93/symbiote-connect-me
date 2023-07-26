export const checkNameNotNullOrTooShort = (name: string | null) =>
  name === null ? true : name.length < 3 ? true : false;

export const checkRepeatedStops = (stops: string[]) => {
  console.log(stops);

  return stops[0] === stops[1]
    ? true
    : stops[0] === stops[2]
    ? true
    : stops[1] === stops[2]
    ? true
    : false;
};
