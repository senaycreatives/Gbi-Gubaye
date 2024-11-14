import tsega from "../assets/tsga.jpg";
import { Button, TextField } from "@mui/material";
import IsLoading from "../Components/IsLoading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ResponsePopup from "../Components/ResponsePopup";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const signIn = useSignIn();

  const login = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        data
      );

      return response;
    },
    onSuccess: (data) => {
      console.log(data);
      if (
        signIn({
          auth: {
            token: data.data.accessToken,
            type: "Bearer",
          },

          userState: {
            name: "React User",
            uid: 123456,
          },
        })
      ) {
        navigate("/");
      }
    },
    onError: (error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error);
      setTimeout(() => {
        setError(null);
      }, 3000);
    },
  });

  return (
    <div className="relative z-[1] w-screen h-screen bg-white overflow-hidden">
      {error && <ResponsePopup type={"Error"} message={error} />}
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                margin="normal"
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                margin="normal"
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  login.mutate({ email, password });
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
      {login.isLoading && <IsLoading />}
    </div>
  );
}

export default Login;
