import { DataGrid } from "@mui/x-data-grid";
import useFetchGbiGubaeMemebers from "../Hooks/UseFetchgbigubaeMembers";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import IsLoading from "../Components/IsLoading";
import ResponsePopup from "../Components/ResponsePopup";
import { useMutation } from "@tanstack/react-query";
import useAuthApi from "../Hooks/useAuthApi";
import { Button } from "@mui/material";

export default function GbiGubae() {
  const { id } = useParams();
  const { data, isLoading, error, isError, refetch } = useFetchGbiGubaeMemebers(
    { id }
  );
  const [response, setResponse] = useState(null);
  const api = useAuthApi();
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [id]);

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

  const transferMutation = useMutation({
    mutationFn: (memberIds) =>
      api.put(`/api/abal/transferGroupToAlmuni`, { abalids: memberIds }),
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Members transferred to alumni successfully",
      });
      setTimeout(() => {
        setResponse(null);
      }, 3000);
      refetch(); // Refetch the members after transfer
      setSelectedIds([]); // Clear selection after transfer
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

  const handleTransfer = () => {
    if (selectedIds.length === 0) {
      alert("Please select at least one member to transfer.");
      return;
    }
    if (
      window.confirm(
        "Are you sure you want to transfer the selected members to alumni?"
      )
    ) {
      transferMutation.mutate(selectedIds);
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullname", headerName: "ስም", width: 150 },
    { field: "email", headerName: "ኢሜይል", width: 200 },
    { field: "phone", headerName: "የስልክ ቁጥር", width: 150 },

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
    data?.map((item) => ({
      id: item._id,
      fullname: item.fullname,
      email: item.email,
      phone: item.phone,
      Date: item.Date,
      role: item.role,
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
        <Button
          onClick={() => navigate("/gbigubae/" + id + "/gallery")}
          sx={{ marginLeft: "auto" }}
          variant="contained"
        >
          View Gallary
        </Button>
      </div>

      <button
        onClick={handleTransfer}
        disabled={selectedIds.length === 0}
        className={`mb-4 p-2 ${
          selectedIds?.length == 0
            ? "bg-zinc-100"
            : "bg-blue-400 hover:bg-blue-600 "
        } text-white rounded w-[300px] mx-[10px] `}
      >
        Transfer Selected to Alumni
      </button>

      <div style={{ height: 450, width: "100%" }} className="bg-white p-5">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowSelectionModelChange={(data) => {
            console.log(data);
            setSelectedIds(data);
          }}
        />
      </div>
    </div>
  );
}
