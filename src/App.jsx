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
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import GbiGubaeLists from "./Pages/GbiGubaeLists";
import Gallary from "./Pages/Gallary";

function App() {
  return (
    <div className="w-screen h-screen flex flex-row  overflow-hidden">
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/teachers" element={<Teachers />} />
          <Route path="/almuni" element={<AlmoniaPage />} />
          <Route path="/staffs" element={<Staffs />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/gbigubae/:id" element={<GbiGubae />} />
          <Route path="/gbiList" element={<GbiGubaeLists />} />
          <Route path="/gbigubae/:id/gallary" element={<Gallary />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
