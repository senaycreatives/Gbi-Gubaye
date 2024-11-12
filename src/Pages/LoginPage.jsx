import tsega from "../assets/tsga.jpg";
import { Button, TextField } from "@mui/material";
import IsLoading from "../Components/IsLoading";
import { useState } from "react";

function Login() {
  const [isloading, setisloading] = useState(false);
  return (
    <div className="relative z-[1] w-screen h-screen bg-white overflow-hidden">
      <div className="flex flex-row absolute z-40 justify-between items-center h-screen w-screen px-4">
        <div className="w-1/2 h-full flex flex-col items-center justify-center z-[32]">
          <img
            src="https://eotcmk.org/a/wp-content/uploads/mk-logo-300.png"
            alt="Logo"
            className="w-[200px] h-[200px] object-cover"
          />
          <p className="font-extrabold mt-7 text-center text-4xl text-white">
            በኢ/ኦ/ተ/ቤ/ክ በሰ/ት/ቤቶች ማ/መ የማኅበረ ቅዱሳን ስብከተ ወንጌል ማስፋፊያ
          </p>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-center z-[32]">
          <div className="w-[500px] h-[400px] flex items-center flex-col p-6 rounded-[30px] bg-white shadow-md shadow-white">
            <p className="text-[40px] font-bold text-center">Login</p>
            <form noValidate className="w-[400px] mt-10" autoComplete="off">
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  setisloading(true);
                  setTimeout(() => {
                    setisloading(false);
                  }, 3000);
                }}
                sx={{
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#0056b3", // Darker shade on hover
                  },
                }}
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="absolute z-20 w-screen h-screen bg-black opacity-50"></div>
      <img
        src={tsega}
        alt="Background"
        className="h-full w-full object-cover absolute z-10 left-0 top-0 grayscale"
      />
      <div className="w-[300px] h-[300px] z-30 absolute -top-[150px] -right-[150px] rotate-45 bg-blue-800 "></div>
      <div className="w-[300px] h-[300px] z-30 absolute -bottom-[150px] -left-[150px] rotate-45 bg-blue-800 "></div>
      {isloading && <IsLoading />}
    </div>
  );
}

export default Login;
