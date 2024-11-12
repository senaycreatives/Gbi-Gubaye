import { DataGrid } from "@mui/x-data-grid";

export default function StafPage() {
  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "ስም", width: 150 },
    { field: "subject", headerName: "Subject", width: 150 },
    { field: "experience", headerName: "Experience (years)", width: 180 },
  ];

  // Sample data for rows
  const rows = [
    { id: 1, name: "Alice Johnson", subject: "Mathematics", experience: 5 },
    { id: 2, name: "Bob Smith", subject: "Physics", experience: 8 },
    { id: 3, name: "Catherine Brown", subject: "Chemistry", experience: 10 },
    { id: 4, name: "Daniel White", subject: "English", experience: 3 },
    { id: 1, name: "Alice Johnson", subject: "Mathematics", experience: 5 },
    { id: 2, name: "Bob Smith", subject: "Physics", experience: 8 },
    { id: 3, name: "Catherine Brown", subject: "Chemistry", experience: 10 },
    { id: 4, name: "Daniel White", subject: "English", experience: 3 },
  ];

  return (
    <div className="flex flex-1 flex-col p-5 overflow-hidden">
      <div className="w-full h-[50px] bg-white flex items-center justify-start mb-5">
        <p className="text-[30px] font-bold text-center">የ ስታፍ ዝርዝር</p>
      </div>
      <div style={{ height: 450, width: "100%" }} className="bg-white">
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
