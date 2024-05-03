import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../Components/core/HomePage/HighlightText";
import CtaButton from "../Components/core/HomePage/CtaButton";
import banner from "../assets/Images/banner.mp4";
import CodeBlock from "../Components/core/HomePage/CodeBlock";
import TimelineSection from "../Components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../Components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/core/HomePage/InstructorSection";
import Footer from "../Components/Common/Footer";
import ExploreMore from "../Components/core/HomePage/ExploreMore";


export default function Home() {
  return (
    <div>
      {/* Section 1 */}

      <div className="flex relative mx-auto flex-col w-11/12 text-white items-center justify-between max-w-maxContent">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto  rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit">
            <div className="flex flex-row items-center gap-3 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl mt-6 font-semibold">
          Empower your Future with <HighlightText text={" Coding Skills"} />
        </div>

        <div className="w-[90%] text-center text-lg font-bold  mt-4 text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CtaButton linkto={"/signup"} active={true}>
            Learn More
          </CtaButton>
          <CtaButton linkto={"/login"} active={false}>
            Book Demo
          </CtaButton>
        </div>

        <div className=" shadow-blue-200 mx-3 my-12">
          <video muted loop autoPlay>
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section 1 */}
        <div>
          <CodeBlock
            position={"lg:flex-row"}
            heading={
              <div>
                Unlock Your
                <HighlightText text={" Coding Potential "} /> with our online
                Courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctabtn1={{
              text: "try it yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<Doctype html> \n<html> \n<head> \n<title> Coding School </title> \n<linkrel="stylesheet"href="styles.css">\n</head> \n<body> \n<h1> Welcome to Coding School </h1> \n<p> Learn to code </p> \n<button> Get Started </button> \n</body> \n </html>`}
            codeColor={"text-yellow-500"}
          />
        </div>
        {/* codeSection 2 */}
        <div>
          <CodeBlock
            position={"lg:flex-row-reverse"}
            heading={
              <div>
                Start
                <HighlightText text={" coding in seconds "} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.."
            }
            ctabtn1={{
              text: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              text: "learn more",
              linkto: "/login",
              active: false,
            }}
            codeblock={`import React from "react"; \nimport CTAButton from "./Button"; \nimport TypeAnimation from "react-type"; \nimport { FaArrowRight } from "react-icons/fa"; \n \nconst Home = () => { \nreturn ( \n<div>\n<h1>Home Section</h1> \n</div> \n)} \nexport default Home;`}
            codeColor={"text-yellow-500"}
          />
        </div>

        <ExploreMore />
      </div>

      {/* Section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CtaButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CtaButton>
              <CtaButton active={false} linkto={"/login"}>
                Learn More
              </CtaButton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>

            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className="text-[16px]">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CtaButton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CtaButton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-10">
          Reviews from other learners
        </h1>
        {/* <ReviewSlider /> */}
      </div>

      {/* Footer */}

      <Footer />
    </div>
  );
}
