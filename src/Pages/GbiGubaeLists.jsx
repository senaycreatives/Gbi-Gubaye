import { DataGrid } from "@mui/x-data-grid";
import useFetchGbiGubae from "../Hooks/UseFetchGbiGubae"; // Fetch Gubae data
import useFetchRoles from "../Hooks/UseFetchRoles"; // Fetch roles data
import { useMutation } from "@tanstack/react-query";
import IsLoading from "../Components/IsLoading";
import ResponsePopup from "../Components/ResponsePopup";
import { useState } from "react";
import useAuthApi from "../Hooks/useAuthApi";

export default function GbiGubaeLists() {
  const {
    data: gubaeData,
    isLoading: isLoadingGubae,
    isError: isErrorGubae,
    error: errorGubae,
  } = useFetchGbiGubae();
  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
    error: errorRoles,
  } = useFetchRoles();
  const [response, setResponse] = useState(null);
  const api = useAuthApi();

  const gubaeMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/gbigubae/${id}`),
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Gubae deleted successfully",
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

  const roleMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/role/${id}`), // Update this endpoint as necessary
    onSuccess: () => {
      setResponse({
        type: "success",
        message: "Role deleted successfully",
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

  const handleDeleteGubae = (id) => {
    if (window.confirm("Are you sure you want to delete this Gubae?")) {
      gubaeMutation.mutate(id);
    }
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      roleMutation.mutate(id);
    }
  };

  // Define columns for the Gubae DataGrid
  const gubaeColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "ስም", width: 150 },
    { field: "place", headerName: "ቦታ", width: 200 },
    {
      field: "creations",
      headerName: "የተፈጠረበት ቀን",
      width: 180,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: "abalCount", headerName: "አባላት ቁጥር", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDeleteGubae(params.row.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  // Map fetched Gubae data to rows
  const gubaeRows =
    gubaeData?.map((gubae) => ({
      id: gubae._id,
      name: gubae.name,
      place: gubae.place,
      creations: gubae.creations,
      abalCount: gubae.abalCount,
    })) || []; // Fallback to empty array if data is not available

  // Define columns for the roles DataGrid
  const roleColumns = [
    { field: "_id", headerName: "ID", width: 90 },
    { field: "name", headerName: "ስም", width: 150 },
    { field: "permissions", headerName: "Permissions", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleDeleteRole(params.row.id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  // Map fetched roles data to rows
  const roleRows =
    rolesData?.map((role) => ({
      id: role._id,
      name: role.name,
      permissions: role.permissions.join(", ") || "No permissions",
    })) || []; // Fallback to empty array if data is not available

  return (
    <div className="flex flex-1 relative flex-col overflow-hidden">
      {(isLoadingGubae ||
        isLoadingRoles ||
        gubaeMutation.isLoading ||
        roleMutation.isLoading) && <IsLoading />}
      {isErrorGubae && (
        <ResponsePopup type={"Error"} message={errorGubae?.message} />
      )}
      {isErrorRoles && (
        <ResponsePopup type={"Error"} message={errorRoles?.message} />
      )}
      {response && (
        <ResponsePopup type={response.type} message={response.message} />
      )}

      <div className="w-full h-[0px] p-5 bg-white flex items-center justify-start mb-5">
        <p className="text-[30px] font-bold text-center">የ GBI ጉባኤ ዝርዝር</p>
      </div>
      <div style={{ height: 250, width: "100%" }} className="bg-white p-5">
        <DataGrid
          rows={gubaeRows}
          columns={gubaeColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>

      <div className="w-full h-[0px] p-5 bg-white flex items-center justify-start mb-5">
        <p className="text-[30px] font-bold text-center">የ Roles ዝርዝር</p>
      </div>
      <div style={{ height: 250, width: "100%" }} className="bg-white p-5">
        <DataGrid
          rows={roleRows}
          columns={roleColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}
