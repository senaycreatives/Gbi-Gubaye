// hooks/useFetchGbiTeachersGubae.js
import { useQuery } from "@tanstack/react-query";
import useAuthApi from "./useAuthApi";

const fetchGubae = async (api) => {
  const response = await api.get(`/api/teacher/`);
  return response.data;
};

const useFetchGbiTeachers = () => {
  const api = useAuthApi();

  return useQuery({
    queryKey: ["gbigubaeTeachers"],
    queryFn: () => fetchGubae(api), // Pass the API instance to the fetch function
  });
};

export default useFetchGbiTeachers;
