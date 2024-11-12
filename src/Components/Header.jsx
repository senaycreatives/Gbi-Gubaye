import { useLocation, useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const path = useLocation().pathname;
  if (path !== "/login") {
    return (
      <div className="w-[300px] p-[20px] relative h-full  bg-gradient-to-r from-blue-600 to-blue-600">
        <div className="flex flex-row items-center justify-between">
          <img
            src="https://eotcmk.org/a/wp-content/uploads/mk-logo-300.png"
            alt="Logo"
            className="w-[50px] h-[50px] object-cover"
          />
          <p className="text-white px-2">
            በኢ/ኦ/ተ/ቤ/ክ በሰ/ት/ቤቶች ማ/መ የማኅበረ ቅዱሳን ስብከተ ወንጌል ማስፋፊያ
          </p>
        </div>
        <div className="w-full ">
          <ul className="mt-10">
            <li
              onClick={() => navigate("/")}
              className="text-white mt-2 w-full hover:bg-blue-900 cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              ግቢ ጉባያት
            </li>
            <li
              onClick={() => navigate("/teachers")}
              className="text-white mt-2 w-full hover:bg-blue-900  cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              መምህራን
            </li>
            <li
              onClick={() => navigate("/almuni")}
              className="text-white mt-2 w-full hover:bg-blue-900  cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              ኣልሙናይ
            </li>
            <li
              onClick={() => navigate("/staffs")}
              className="text-white mt-2 w-full hover:bg-blue-900  cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              ስታፍ
            </li>
            <li
              onClick={() => navigate("/services")}
              className="text-white mt-2 w-full hover:bg-blue-900  cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              አገልግሎቶች
            </li>
            <li
              onClick={() => navigate("/login")}
              className="text-white mt-2 w-full hover:bg-blue-900  cursor-pointer bg-zinc-300 bg-opacity-10 h-[50px] flex items-center justify-center"
            >
              ውጣ
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
