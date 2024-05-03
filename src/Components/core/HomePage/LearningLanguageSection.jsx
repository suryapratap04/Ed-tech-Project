import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CtaButton from "./CtaButton";
import { FaArrowRight } from "react-icons/fa";

export default function LearningLanguageSection() {
  return (
    <div className=" mt-[150px] mb-[100px]">
      <div className="flex flex-col gap-5 items-center">
        <div className="text-4xl font-semibold text-center">
          Your Swis Knife For
          <HighlightText text={"Learning any Languages"} />
        </div>

        <div className="text-center text-richblack-600 mx-auto text-base mt-3 font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className=" flex flex-row items-center justify-center mt-5 ">
          <img
            src={know_your_progress}
            alt="progress"
            className="object-contain -mr-32"
          />
          <img
            src={compare_with_others}
            alt="compare"
            className="object-contain"
          />
          <img
            src={plan_your_lessons}
            alt="plan"
            className=" object-contain -ml-36"
          />
        </div>

        <div className="w-fit">
          <CtaButton active={true} linkto={"/signup"} >
            <div className="flex items-center gap-2">
              Learn More
              <FaArrowRight />
            </div>
          </CtaButton>
        </div>
      </div>
    </div>
  );
}
