import CtaButton from "./CtaButton";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

export default function CodeBlock({
  heading,
  position,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 `}>
      {/* section 1 */}
      <div className="w-[50%] flex flex-col gap-8 ">
        <div className="text-4xl font-semibold">{heading}</div>
        <div className="text-lg font-bold mt-4 text-richblack-300">
          {subheading}
        </div>
        <div className="flex flex-row gap-7 mt-8">
          <CtaButton linkto={ctabtn1.linkto} active={ctabtn1.active}>
            <div className="flex gap-2 items-center">
              <p>{ctabtn1.text}</p>
              <FaArrowRight />
            </div>
          </CtaButton>
          <CtaButton linkto={ctabtn2.linkto} active={ctabtn2.active}>
            {ctabtn2.text}
          </CtaButton>
        </div>
      </div>

      {/* section 2 */}
      <div className="flex h-fit flex-row text-10[px] w-[100%] py-4 lg:w-[500px]">
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold ">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
        </div>
        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}
