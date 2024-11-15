// hooks/useFetchGbiGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api, id) => {
  console.log("fetchGubae", id);
  const response = await api.get(`/api/gbigubae/Abal/` + id);
  return response.data;
};

const useFetchGbiGubaeMemebers = ({ id }) => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["gbigubaeMembers", id],
    queryFn: () => fetchGubae(api, id), // Pass the API instance to the fetch function
  });
};

export default useFetchGbiGubaeMemebers;
