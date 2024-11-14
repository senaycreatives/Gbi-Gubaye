import { useState } from "react";
import { useNavigate } from "react-router-dom";
import metro from "../assets/Meteor.svg";
import useFetchGbiGubae from "../Hooks/UseFetchGbiGubae";

const Carousel = () => {
  const navigate = useNavigate();
  const { data } = useFetchGbiGubae();

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % Math.ceil(data?.length / itemsPerView)
    );
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + Math.ceil(data?.length / itemsPerView)) %
        Math.ceil(data?.length / itemsPerView)
    );
  };
  console.log(data);
  return (
    <div className="relative w-full">
      <div className="flex flex-row items-center justify-center overflow-hidden">
        {data
          ?.slice(
            currentIndex * itemsPerView,
            (currentIndex + 1) * itemsPerView
          )
          .map((item) => (
            <div
              key={item}
              onClick={() => navigate("/gbigubae/" + item._id)}
              className="w-[300px] shrink-0 m-[5px] hover:scale-105 hover:bg-blue-900 transform duration-300 h-[200px] relative bg-blue-500 p-5 rounded-[10px] shadow-md flex flex-col items-center justify-center"
            >
              <p className="text-white text-[20px] font-bold">{item.name}</p>
              <div className="w-full flex-col flex items-center justify-center">
                <div className="flex text-[20px] flex-row text-orange-200 font-bold">
                  {item.abalCount} አባላት
                </div>
              </div>
              <img
                src={metro}
                alt="Metro"
                className="w-full absolute top-0 left-0 opacity-20 h-full object-cover"
              />
            </div>
          ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-4 py-2 rounded"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-700 text-white px-4 py-2 rounded"
      >
        →
      </button>
    </div>
  );
};

export default Carousel;
