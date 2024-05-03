import { Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { matchPath } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../Services/apiConnector";
import { categories } from "../../Services/apis";
import { MdArrowDownward } from "react-icons/md";

const subLinks = [
  {
    title: "python",
    link: "/catalog/python",
  },
  {
    title: "Web-dev",
    link: "/catalog/Web-development",
  },
];

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  // const [subLinks, setSubLinks] = useState([]);
  const fetchSubLinks = async () => {
    try {
      const response = await apiConnector(categories.CATEGORIES_API, "GET");
      console.log("Prinitin response from fetchSubLinks", response);
      // setSubLinks(response.data);
    } catch (err) {
      console.log("could not fetch cateogries");
    }
  };
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    // console.log(window.location.pathname);
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
        {/* image */}
        <Link to="/">
          <img
            src={logo}
            alt="Logo image for navbar"
            width={160}
            loading="lazy"
          />
        </Link>

        {/* navlinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25 ">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <MdArrowDownward />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {subLinks && subLinks.length ? (
                          subLinks.map((subLink, index) => {
                            return (
                              <Link
                                to={`${subLink.link}`}
                                key={index}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 transition-all duration-200"
                              >
                                <p>{subLink.title}</p>
                              </Link>
                            );
                          })
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* login signup dashboard */}
        <div className="flex gap-x-4 items-center ">
          {user && user?.acountType != "Instructor" && (
            <Link to="/dashboard/cart" className={`relative`}>
              <FaCartArrowDown />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-25 text-richblack-25 rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
}
