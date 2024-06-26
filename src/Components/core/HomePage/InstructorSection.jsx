import Instructor from "../../../assets/Images/Instructor.png";
import CtaButton from "./CtaButton";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";

export default function InstructorSection() {
  return (
    <div className="mt-16">
      <div className="flex flex-row gap-20 items-center ">
        <div className="w-[50%] ">
          <img src={Instructor} alt="" className="shadow-white" />
        </div>
        <div className="w-[50%] flex flex-col gap-10 ">
          <div className="text-4xl font-semibold w-[50%]">
            Become an
            <HighlightText text={" Instructor"} />
          </div>
          <p className="font-medium text-[16px] w-[80%] text-richblack-300">
            nstructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          <div className="w-fit">
            <CtaButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CtaButton>
          </div>
        </div>
      </div>
    </div>
  );
}
