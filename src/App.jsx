import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Teachers from "./Pages/Teachers";
import Header from "./Components/Header";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row  overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />\
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
    </div>
  );
}

export default App;
