// hooks/useFetchAlmuniGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api) => {
  const response = await api.get(`api/abal/all/Almuni`);
  return response.data;
};

const useFetchAlmuni = () => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["gbigubaeAlmuni"],
    queryFn: () => fetchGubae(api), // Pass the API instance to the fetch function
  });
};

export default useFetchAlmuni;
