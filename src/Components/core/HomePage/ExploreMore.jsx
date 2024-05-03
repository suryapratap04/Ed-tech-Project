import React from "react";
import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "../HomePage/CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );
  const setmtCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((item) => item.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="">
      <div className="font-semibold text-4xl  text-center">
        Unlock The
        <HighlightText text={" Power of Code  "} />
      </div>

      <p className=" text-center text-richblack-300 text-lg font-semibold mt-3 ">
        {" "}
        Learn to build anything you can imagine{" "}
      </p>

      <div className="flex  flex-row rounded-full bg-richblack-800 mb-5 border-richblack-100 mt-5 px-1 py-1">
        {tabsName.map((tab, index) => {
          return (
            <div
              key={index}
              onClick={() => setmtCards(tab)}
              className={`${
                tab === currentTab
                  ? "bg-richblack-900 text-white font-medium"
                  : "text-richblack-300 "
              } text-[16px] flex flex-row gap-2 items-center rounded-full transition-all duration-200 hover:bg-richblack-900 hover:text-white px-7 py-2`}
            >
              {tab}
            </div>
          );
        })}
      </div>
      <div className="lg:h-[150px]"></div>

      {/** */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {courses.map((ele, index) => {
          return (
            <CourseCard
              key={index}
              cardData={ele}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}
