// hooks/useFetchGbiGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api) => {
  const response = await api.get(`/api/gbigubae/`);
  return response.data;
};

const useFetchGbi = () => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["gbigubae"],
    queryFn: () => fetchGubae(api), // Pass the API instance to the fetch function
  });
};

export default useFetchGbi;
