export const formatTime = (timeInMs: number) => {
  const hours = timeInMs / 3600000;
  const mins = (timeInMs - Math.trunc(hours) * 3600000) / 60000;
  const secs =
    (timeInMs - Math.trunc(hours) * 3600000 - Math.trunc(mins) * 60000) / 1000;
  return { h: Math.floor(hours), m: Math.floor(mins), s: Math.floor(secs) };
};
