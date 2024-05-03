import { Link } from "react-router-dom";

export default function CtaButton({ children, active, linkto }) {
  return (
    <div
      className={`text-center text-[18px] px-6 py-3  rounded-md font-bold ${
        active ? "bg-yellow-500 text-richblack-800" : "bg-richblack-800"
      } hover:scale-95 transition-all duration-200 `}
    >
      <Link to={linkto}>
        <div>{children}</div>
      </Link>
    </div>
  );
}
