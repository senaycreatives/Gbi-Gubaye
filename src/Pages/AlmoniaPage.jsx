import { DataGrid } from "@mui/x-data-grid";

import { useState } from "react";
import IsLoading from "../Components/IsLoading";
import ResponsePopup from "../Components/ResponsePopup";
import { useMutation } from "@tanstack/react-query";
import useAuthApi from "../Hooks/useAuthApi";
import useFetchAlmuni from "../Hooks/UseFetchAmuni";

export default function AlmoniaPage() {
  const { data, isLoading, error, isError, refetch } = useFetchAlmuni();

  const [response, setResponse] = useState(null);
  const api = useAuthApi();

  const deleteMutation = useMutation({
    mutationFn: (memberId) => api.delete(`/api/abal/${memberId}`),
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Member deleted successfully",
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
      refetch(); // Refetch the members after deletion
    },
    onError: (error) => {
      setResponse({
        type: "Error",
        message: error.response?.data?.message || "An error occurred",
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
    },
  });

  const handleDelete = (memberId) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      deleteMutation.mutate(memberId);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "number", headerName: "no", width: 90 },
    { field: "fullname", headerName: "ስም", width: 150 },
    { field: "email", headerName: "ኢሜይል", width: 200 },
    { field: "phone", headerName: "የስልክ ቁጥር", width: 150 },
    { field: "role", headerName: "አባላት role", width: 150 },
    {
      field: "Date",
      headerName: "የተመዘገበ ቀን",
      width: 180,
      valueFormatter: (params) => new Date(params).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 250,
      renderCell: (params) => (
        <>
          <button
            onClick={() => handleDelete(params.row.id)}
            className="text-red-500 hover:text-red-700 mr-2"
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  // Map data to rows for the DataGrid
  const rows =
    data?.map((item, index) => ({
      number: index + 1,
      id: item._id,
      fullname: item.fullname,
      email: item.email,
      phone: item.phone,
      role: item.role.name,
      Date: item.Date,
    })) || []; // Use an empty array if data is not available

  return (
    <div className="flex flex-1 flex-col relative overflow-hidden">
      {isLoading && <IsLoading />}
      {isError && <ResponsePopup type={"Error"} message={error?.message} />}
      {response && (
        <ResponsePopup type={response.type} message={response.message} />
      )}

      <div className="w-full h-[50px] p-5 bg-white flex items-center justify-start mb-5">
        <div
          onClick={() => window.history.back()}
          className="w-[40px] mr-10 font-bold h-[40px] bg-zinc-200 rounded-full flex items-center justify-center"
        >
          {"<"}
        </div>
        <p className="text-[30px] font-bold text-center">የ አባላት ዝርዝር</p>
      </div>

      <div style={{ height: 450, width: "100%" }} className="bg-white p-5">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}
