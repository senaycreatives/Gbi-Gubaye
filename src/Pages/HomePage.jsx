import { useState } from "react";
import Modal from "../Components/Modal";
import Carousel from "../Components/Carousel";

export default function HomePage() {
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [isAddRoleOpen, setAddRoleOpen] = useState(false);
  const [isAddStaffOpen, setAddStaffOpen] = useState(false);
  const [isAddTeacherOpen, setAddTeacherOpen] = useState(false);
  const [isAddGbigubaeOpen, setAddGbigubaeOpen] = useState(false);
  const [gbigubaeOptions] = useState(["ግቢ 1", "ግቢ 2", "ግቢ 3"]); // Example options for group events
  const [roleOptions] = useState(["መምህር", "ስታፍ", "ተጠቃሚ"]); // Example roles

  const handleAddUser = () => {
    // Handle user addition logic here
    console.log("User added");
    setAddUserOpen(false);
  };

  const handleAddRole = () => {
    // Handle role addition logic here
    console.log("Role added");
    setAddRoleOpen(false);
  };

  const handleAddStaff = () => {
    // Handle staff addition logic here
    console.log("Staff added");
    setAddStaffOpen(false);
  };

  const handleAddTeacher = () => {
    // Handle teacher addition logic here
    console.log("Teacher added");
    setAddTeacherOpen(false);
  };

  const handleAddGbigubae = () => {
    // Handle gbigubae addition logic here
    console.log("Gbigubae added");
    setAddGbigubaeOpen(false);
  };

  return (
    <div className="flex flex-1 flex-col p-5 overflow-hidden">
      <div className="w-full h-[70px] bg-white flex items-center justify-start">
        <p className="text-[30px] font-bold text-center">የ ግቢ ጉባያት ዝርዝር</p>
      </div>
      <Carousel />
      <div className="w-full h-[70px] bg-white flex items-center justify-start">
        <p className="text-[30px] font-bold text-center">ግቢ ጉባኤ ተግባራት</p>
      </div>
      <div className="w-full ">
        <div className="flex flex-wrap flex-row shadow-sm shadow-zinc-400 pb-[10px]">
          <p
            className="text-white flex-shrink-0 mx-[20px] w-[400px] rounded-md mt-2 bg-blue-500 hover:text-white hover:bg-blue-900 cursor-pointer h-[50px] flex items-center justify-center"
            onClick={() => setAddGbigubaeOpen(true)}
          >
            አዲስ ግቢጉባኤ ፍጠር
          </p>
          <p
            className="text-white mx-[20px] w-[400px] rounded-md mt-2 bg-blue-500 hover:text-white hover:bg-blue-900 cursor-pointer h-[50px] flex items-center justify-center"
            onClick={() => setAddUserOpen(true)}
          >
            አዲስ አባል ፍጠር
          </p>
          <p
            className="text-white mx-[20px] w-[400px] rounded-md mt-2 bg-blue-500 hover:text-white hover:bg-blue-900 cursor-pointer h-[50px] flex items-center justify-center"
            onClick={() => setAddTeacherOpen(true)}
          >
            አዲስ መምህር ፍጠር
          </p>
          <p
            className="text-white mx-[20px] w-[400px] rounded-md mt-2 bg-blue-500 hover:text-white hover:bg-blue-900 cursor-pointer h-[50px] flex items-center justify-center"
            onClick={() => setAddStaffOpen(true)}
          >
            አዲስ ስታፍ ፍጠር
          </p>
          <p
            className="text-white mx-[20px] w-[400px] rounded-md mt-2 bg-blue-500 hover:text-white hover:bg-blue-900 cursor-pointer h-[50px] flex items-center justify-center"
            onClick={() => setAddRoleOpen(true)}
          >
            አዲስ ሚና ፍጠር
          </p>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setAddUserOpen(false)}
        title="አዲስ አባል መግኘት"
        onSubmit={handleAddUser}
      >
        <input
          type="text"
          placeholder="ሙሉ ስም"
          className="border rounded w-full p-2 mb-4"
        />

        <input
          type="email"
          placeholder="ኢሜል"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="tel"
          placeholder="የስልክ ቁጥር"
          className="border rounded w-full p-2 mb-4"
        />
        <select className="border rounded w-full p-2 mb-4">
          <option value="" disabled selected>
            የግቢ ጉባኤ ይምረጡ
          </option>
          {gbigubaeOptions.map((gbigubae, index) => (
            <option key={index} value={gbigubae}>
              {gbigubae}
            </option>
          ))}
        </select>
        <select className="border rounded w-full p-2 mb-4">
          <option value="" disabled selected>
            ሚና ይምረጡ
          </option>
          {roleOptions.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </Modal>
      <Modal
        isOpen={isAddRoleOpen}
        onClose={() => setAddRoleOpen(false)}
        title="አዲስ ሚና መግኘት"
        onSubmit={handleAddRole}
      >
        <input
          type="text"
          placeholder="የሚና ስም"
          className="border rounded w-full p-2 mb-4"
        />
      </Modal>
      <Modal
        isOpen={isAddStaffOpen}
        onClose={() => setAddStaffOpen(false)}
        title="አዲስ ስታፍ መግኘት"
        onSubmit={handleAddStaff}
      >
        <input
          type="text"
          placeholder="የስታፍ ስም"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="phone"
          placeholder="የስታፍ ስልክ ቁጥር"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="email"
          placeholder="ኢሜል"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="text"
          placeholder="የስራ አይነት"
          className="border rounded w-full p-2 mb-4"
        />
      </Modal>
      <Modal
        isOpen={isAddTeacherOpen}
        onClose={() => setAddTeacherOpen(false)}
        title="አዲስ መምህር "
        onSubmit={handleAddTeacher}
      >
        <input
          type="text"
          placeholder="የመምህር ስም"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="phone"
          placeholder="የመምህር ስልክ ቁጥር"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="email"
          placeholder="ኢሜል"
          className="border rounded w-full p-2 mb-4"
        />

        <input
          type="text"
          placeholder="ትምህርት አይነት"
          className="border rounded w-full p-2 mb-4"
        />
      </Modal>
      <Modal
        isOpen={isAddGbigubaeOpen}
        onClose={() => setAddGbigubaeOpen(false)}
        title="አዲስ ግቢጉባኤ "
        onSubmit={handleAddGbigubae}
      >
        <input
          type="text"
          placeholder="ግቢጉባኤ ስም"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="date"
          placeholder="ቀን"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="text"
          placeholder="ቦታ"
          className="border rounded w-full p-2 mb-4"
        />
      </Modal>
    </div>
  );
}
