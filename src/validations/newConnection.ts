export const checkNameNotNullOrTooShort = (name: string | null) =>
  name === null ? true : name.length < 3 ? true : false;

export const checkRepeatedStops = (
  fStop: string,
  sStop: string,
  tStop: string | null
  // since i disabled the submit button based on the value of
  // firstStop and secondstop, the only nullable stop is the third one
) =>
  fStop === sStop
    ? true
    : fStop === tStop
    ? true
    : sStop === tStop
    ? true
    : false;
