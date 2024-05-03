import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo1.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    logo: Logo1,
    heading: "Leadership",
    Description: "Fully Commited to success company ",
  },
  {
    logo: Logo2,
    heading: "Leadership",
    Description: "Fully Commited to success company ",
  },
  {
    logo: Logo3,
    heading: "Leadership",
    Description: "Fully Commited to success company ",
  },
  {
    logo: Logo4,
    heading: "Leadership",
    Description: "Fully Commited to success company ",
  },
];
export default function TimelineSection() {
  return (
    <div>
      <div className="flex flex-row gap-15 items-center ">
        <div className="w-[45%] flex flex-col gap-5">
          {timeline.map((item, index) => {
            return (
              <div key={index} className="flex flex-row gap-6 ">
                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                  <img src={item.logo} alt="logo" />
                </div>
                <div>
                  <h2 className="text-[18px] font-semibold">{item.heading}</h2>
                  <p className="text-base">{item.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="   relative shadow-blue-200 ">
          <img
            src={timelineImage}
            alt="Timeline Image"
            className="shadow-white object-cover h-fit"
          />

          <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10  left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <div className="flex flex-row items-center gap-5 border-r border-caribbeangreen-300 px-7">
              <p className="text-3xl font-bold ">10</p>
              <p className="text-caribbeangreen-300 text-sm">
                Years Of Experience
              </p>
            </div>
            <div className="flex flex-row items-center gap-5  px-7">
              <p className="text-3xl font-bold ">100</p>
              <p className="text-caribbeangreen-300 text-sm">
                Types OF Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
