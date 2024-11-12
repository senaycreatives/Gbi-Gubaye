import { CircularProgress, Typography } from "@mui/material";

export default function IsLoading() {
  return (
    <div className="absolute z-50 w-full  h-full flex flex-col items-center justify-center bg-black bg-opacity-40">
      <CircularProgress
        color="primary"
        sx={{
          color: "#fff",
        }}
        size={100}
      />
      <Typography variant="h6" component="p" className="mt-2 text-white">
        Loading, please wait...
      </Typography>
    </div>
  );
}
