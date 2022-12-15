export const useGetDate = (seconds: number) => {
   return new Date(seconds * 1000).toLocaleDateString()
};
