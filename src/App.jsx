import "./App.css";

import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import HomePage from "./Pages/HomePage";
import Teachers from "./Pages/Teachers";
import Header from "./Components/Header";
import AlmoniaPage from "./Pages/AlmoniaPage";
import Staffs from "./Pages/StafPage";
import ServicePage from "./Pages/ServicePage";
import GbiGubae from "./Pages/GbiGubae";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row  overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />\
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/almuni" element={<AlmoniaPage />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/gbigubae/:id" element={<GbiGubae />} />
      </Routes>
    </div>
  );
}

export default App;
