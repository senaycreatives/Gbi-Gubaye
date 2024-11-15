import { DataGrid } from "@mui/x-data-grid";
import useFetchGbiTeachers from "../Hooks/UseFechTeachers";
import { useMutation } from "@tanstack/react-query";

import IsLoading from "../Components/IsLoading";
import ResponsePopup from "../Components/ResponsePopup";
import { useState } from "react";
import useAuthApi from "../Hooks/useAuthApi";

export default function Teachers() {
  const { data, isLoading, isError, error } = useFetchGbiTeachers();
  const [response, setResponse] = useState(null);
  const api = useAuthApi();
  const mutation = useMutation({
    mutationFn: (id) => {
      console.log(id);
      return api.delete(`/api/teacher/${id}`);
    },
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Teacher deleted successfully",
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
    },
    onError: (error) => {
      setResponse({
        type: "Error",
        message: error.response.data.message,
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      mutation.mutate(id);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "iD", width: 90 },
    { field: "fullName", headerName: "ስም", width: 150 },
    { field: "email", headerName: "ኢሜይል", width: 200 },
    { field: "phoneNo", headerName: "የስልክ ቁጥር", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDelete(params.row.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  // Map fetched data to rows
  const rows =
    data?.map((teacher) => ({
      id: teacher._id,
      fullName: teacher.fullName,
      email: teacher.email,
      phoneNo: teacher.phoneNo,
      subject: teacher.subject,
    })) || []; // Fallback to empty array if data is not available

  return (
    <div className="flex flex-1 relative flex-col overflow-hidden">
      {(isLoading || mutation.isLoading) && <IsLoading />}
      {isError && <ResponsePopup type={"Error"} message={error?.message} />}
      {response && (
        <ResponsePopup type={response.type} message={response.message} />
      )}
      <div className="w-full h-[50px] p-5 bg-white flex items-center justify-start mb-5">
        <p className="text-[30px] font-bold text-center">የ መምህራን ዝርዝር</p>
      </div>
      <div style={{ height: 450, width: "100%" }} className="bg-white p-5">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
