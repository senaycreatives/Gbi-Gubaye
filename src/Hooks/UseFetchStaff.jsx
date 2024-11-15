// hooks/useFetchGbistaffGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api) => {
  const response = await api.get(`/api/staff/`);
  return response.data;
};

const useFetchGbistaff = () => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["gbigubaestaff"],
    queryFn: () => fetchGubae(api), // Pass the API instance to the fetch function
  });
};

export default useFetchGbistaff;
