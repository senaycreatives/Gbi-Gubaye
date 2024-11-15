import { DataGrid } from "@mui/x-data-grid";
import useFetchGbistaff from "../Hooks/UseFetchStaff";
import IsLoading from "../Components/IsLoading";
import ResponsePopup from "../Components/ResponsePopup";
import { useMutation } from "@tanstack/react-query";
import useAuthApi from "../Hooks/useAuthApi"; // Assuming you have this hook for API calls
import { useState } from "react";

export default function StafPage() {
  const { data: staff, isLoading, isError, error } = useFetchGbistaff();
  const [response, setResponse] = useState(null);
  const api = useAuthApi();

  const mutation = useMutation({
    mutationFn: (id) => api.delete(`/api/staff/${id}`),
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Staff member deleted successfully",
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
      // Optionally, you can refetch the staff data here
    },
    onError: (error) => {
      setResponse({
        type: "Error",
        message: error.response?.data?.message || "An error occurred",
      });
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      mutation.mutate(id);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "ስም", width: 150 },
    { field: "email", headerName: "ኢሜይል", width: 200 },
    { field: "phoneNo", headerName: "የስልክ ቁጥር", width: 150 },
    { field: "jobType", headerName: "የስራ አይነት", width: 150 },
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
    staff?.map((staffMember) => {
      return {
        id: staffMember._id,
        fullName: staffMember.fullName,
        email: staffMember.email,
        phoneNo: staffMember.phoneNo,
        jobType: staffMember.jobType,
      };
    }) || []; // Fallback to empty array if data is not available

  return (
    <div className="flex relative flex-1 flex-col overflow-hidden">
      {isLoading && <IsLoading />}
      {isError && <ResponsePopup type={"Error"} message={error?.message} />}
      {response && (
        <ResponsePopup type={response.type} message={response.message} />
      )}
      <div className="w-full p-5 h-[50px] bg-white flex items-center justify-start mb-5">
        <p className="text-[30px] font-bold text-center">የ ስታፍ ዝርዝር</p>
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
