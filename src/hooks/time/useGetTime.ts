export const useGetTime = (seconds: number) => {
  return new Date(seconds * 1000)
    .toTimeString()
    .split(" ")[0]
    .split(":")
    .slice(0, 2)
    .join(":");
};
