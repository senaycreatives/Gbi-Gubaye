/* eslint-disable react/prop-types */

export default function ResponsePopup({ type, message }) {
  // Determine the background color and title based on the type
  const isSuccess = type === "success";
  const backgroundColor = isSuccess ? "bg-green-400" : "bg-red-400";
  const title = isSuccess ? "success" : "Error";
  const defaultMessage = isSuccess
    ? "Operation completed successfully."
    : "An error occurred while fetching data.";

  return (
    <div className="absolute top-0 right-0 z-500 w-full h-screen flex justify-end overflow-hidden bg-opacity-5">
      <div
        className={`w-[300px] h-[100px] ${backgroundColor} rounded-md p-4 flex flex-col z-50 `}
      >
        <p className="text-[24px] text-white font-bold">{title}</p>
        <p className="text-[14px] text-white font-normal">
          {message || defaultMessage}
        </p>
      </div>
    </div>
  );
}
