// hooks/useFetchGbiGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api) => {
  const response = await api.get(`/api/role`);
  return response.data;
};

const useFetchRoles = () => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["fechrole"],
    queryFn: () => fetchGubae(api), // Pass the API instance to the fetch function
  });
};

export default useFetchRoles;
