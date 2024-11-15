import { useState } from "react";
import Modal from "../Components/Modal";
import Carousel from "../Components/Carousel";
import { useMutation } from "@tanstack/react-query";
import ResponsePopup from "../Components/ResponsePopup";
import useAuthApi from "../Hooks/useAuthApi";
import useFetchRoles from "../Hooks/UseFetchRoles";
import useFetchGbi from "../Hooks/UseFechGebi";

export default function HomePage() {
  const [isAddUserOpen, setAddUserOpen] = useState(false);
  const [isAddRoleOpen, setAddRoleOpen] = useState(false);
  const [isAddStaffOpen, setAddStaffOpen] = useState(false);
  const [isAddTeacherOpen, setAddTeacherOpen] = useState(false);
  const [gbigubaeName, setGbigubaeName] = useState("");
  const [gbigubaeDate, setGbigubaeDate] = useState("");
  const [gbigubaeLocation, setGbigubaeLocation] = useState("");
  const [fullName, setfullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [Role, setRole] = useState("");
  const [staffName, setStaffName] = useState("");
  const [staffPhone, setStaffPhone] = useState("");
  const [staffEmail, setStaffEmail] = useState("");
  const [staffType, setStaffType] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherType, setTeacherType] = useState("");

  const [selectedGubae, setselectedGubae] = useState("");
  const [RoleName, setRoleName] = useState("");

  const [Responsedata, setResponsePopup] = useState(null);
  const [isAddGbigubaeOpen, setAddGbigubaeOpen] = useState(false);

  const { data } = useFetchRoles();
  const { data: gbi } = useFetchGbi();
  const api = useAuthApi();
  const adduser = useMutation({
    mutationFn: async (data) => {
      return await api.post("api/abal", data);
    },
    mutationKey: ["addUser"],
    onSuccess: () => {
      setResponsePopup({
        type: "success",
        message: "User added successfully",
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
      setAddUserOpen(false);
    },
    onError: (error) => {
      setResponsePopup({
        type: "Error",
        message: error.response.data.error,
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
    },
  });
  const handleAddUser = () => {
    // Handle user addition logic here
    adduser.mutate({
      fullname: fullName,
      email: Email,
      phone: Phone,
      role: Role,
      gbigubae: selectedGubae,
    });
  };
  const addRole = useMutation({
    mutationFn: async (data) => {
      return await api.post("api/role", data);
    },
    mutationKey: ["addRole"],
    onSuccess: () => {
      setResponsePopup({
        type: "success",
        message: "Role added successfully",
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
      setAddRoleOpen(false);
    },
    onError: (error) => {
      setResponsePopup({
        type: "error",
        message: error.response.data.error,
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
    },
  });

  const handleAddRole = () => {
    addRole.mutate({
      name: RoleName,
    });
  };
  const addStaff = useMutation({
    mutationFn: async (data) => {
      return await api.post("api/staff", data);
    },
    mutationKey: ["addStaff"],
    onSuccess: () => {
      setResponsePopup({
        type: "success",
        message: "Staff added successfully",
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
      setAddStaffOpen(false);
    },
    onError: (error) => {
      setResponsePopup({
        type: "error",
        message: error.response.data.error,
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
    },
  });
  const handleAddStaff = () => {
    addStaff.mutate({
      fullName: staffName,
      phoneNo: staffPhone,
      email: staffEmail,
      jobType: staffType,
    });
  };
  const addTeacher = useMutation({
    mutationFn: async (data) => {
      return await api.post("api/teacher", data);
    },
    mutationKey: ["addTeacher"],
    onSuccess: () => {
      setResponsePopup({
        type: "success",
        message: "Teacher added successfully",
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
      setAddTeacherOpen(false);
    },
    onError: (error) => {
      setResponsePopup({
        type: "error",
        message: error.response.data.error,
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
    },
  });

  const handleAddTeacher = () => {
    addTeacher.mutate({
      fullName: teacherName,
      phoneNo: teacherPhone,
      email: teacherEmail,
      subject: teacherType,
    });
  };
  const addGbigubae = useMutation({
    mutationFn: async (data) => {
      return await api.post("api/gbigubae", data);
    },
    mutationKey: ["addGbigubae"],
    onSuccess: () => {
      setResponsePopup({
        type: "success",
        message: "Gbigubae added successfully",
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
      setAddGbigubaeOpen(false);
    },
    onError: (error) => {
      setResponsePopup({
        type: "error",
        message: error.response.data.error,
      });
      setTimeout(() => {
        setResponsePopup(null);
      }, 3000);
    },
  });

  const handleAddGbigubae = () => {
    addGbigubae.mutate({
      name: gbigubaeName,
      date: gbigubaeDate,
      place: gbigubaeLocation,
    });
  };
  console.log(data);
  console.log(gbi);

  return (
    <div className="flex flex-1 flex-col p-5 overflow-hidden">
      <div className="w-full h-[70px] bg-white flex items-center justify-start">
        <p className="text-[30px] font-bold text-center">የ ግቢ ጉባያት ዝርዝር</p>
      </div>
      {Responsedata && (
        <ResponsePopup
          message={Responsedata.message}
          type={Responsedata.type}
        />
      )}
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

      <Modal
        isOpen={isAddUserOpen}
        onClose={() => setAddUserOpen(false)}
        title="አዲስ አባል "
        onSubmit={handleAddUser}
      >
        <input
          type="text"
          placeholder="ሙሉ ስም"
          value={fullName}
          onChange={(e) => setfullName(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />

        <input
          type="email"
          placeholder="ኢሜል"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="tel"
          placeholder="የስልክ ቁጥር"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <select
          className="border rounded w-full p-2 mb-4"
          value={selectedGubae}
          onChange={(e) => setselectedGubae(e.target.value)}
        >
          <option value="" disabled selected>
            የግቢ ጉባኤ ይምረጡ
          </option>
          {gbi?.map((gbigubae, index) => (
            <option key={index} value={gbigubae._id}>
              {gbigubae.name}
            </option>
          ))}
        </select>
        <select
          className="border rounded w-full p-2 mb-4"
          value={Role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="" disabled selected>
            ሚና ይምረጡ
          </option>
          {data?.map((role, index) => (
            <option key={index} value={role._id}>
              {role.name}
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
          value={RoleName}
          onChange={(e) => setRoleName(e.target.value)}
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
          onChange={(e) => setStaffName(e.target.value)}
          value={staffName}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="phone"
          onChange={(e) => setStaffPhone(e.target.value)}
          value={staffPhone}
          placeholder="የስታፍ ስልክ ቁጥር"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="email"
          onChange={(e) => setStaffEmail(e.target.value)}
          value={staffEmail}
          placeholder="ኢሜል"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="text"
          placeholder="የስራ አይነት"
          onChange={(e) => setStaffType(e.target.value)}
          value={staffType}
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
          onChange={(e) => setTeacherName(e.target.value)}
          value={teacherName}
          placeholder="የመምህር ስም"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="phone"
          onChange={(e) => setTeacherPhone(e.target.value)}
          value={teacherPhone}
          placeholder="የመምህር ስልክ ቁጥር"
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="email"
          onChange={(e) => setTeacherEmail(e.target.value)}
          value={teacherEmail}
          placeholder="ኢሜል"
          className="border rounded w-full p-2 mb-4"
        />

        <input
          type="text"
          onChange={(e) => setTeacherType(e.target.value)}
          value={teacherType}
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
          onChange={(e) => setGbigubaeName(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="date"
          placeholder="ቀን"
          onChange={(e) => setGbigubaeDate(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="text"
          placeholder="ቦታ"
          onChange={(e) => setGbigubaeLocation(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
      </Modal>
    </div>
  );
}
