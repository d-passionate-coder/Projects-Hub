import React from "react";
import Button from "../utils/Button";
import { nanoid } from "nanoid";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";

const studentNav = [
  { id: nanoid(), name: "Home" },
  { id: nanoid(), name: "Categories" },
  { id: nanoid(), name: "Institute" },
  { id: nanoid(), name: "My Projects", path: "myProjects" },
];

const TeacherNav = [
  { id: nanoid(), name: "Home" },
  { id: nanoid(), name: "Categories" },
  { id: nanoid(), name: "Institute" },
  { id: nanoid(), name: "Dashboard", path: "dashboard" },
];
const Navbar = () => {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const items = user?.isStudent ? studentNav : TeacherNav;

  const location = useLocation().pathname.split("/")[1] || "/";

  return (
    <nav className="flex justify-between items-center bg-background2 w-full h-20 font-rem drop-shadow relative p-5 z-10">
      <div className="flex justify-between ml-10">
        <NavLink to="/">
          <img
            className="h-14 w-[4.5rem]"
            src="/assets/images/finalLogo.png"
            alt=""
          />
        </NavLink>
        <div className="ml-20 flex justify-around gap-14 items-center">
          {items.map((item) => (
            <NavLink to={item.path ? item.path : "/"}>
              <p className="cursor-pointer hover:text-[#818181]" key={item.id}>
                {item.name}
              </p>
            </NavLink>
          ))}
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="flex justify-between gap-3 items-center pr-2">
          <p
            className={location != "login" && location != "signup" && "hidden"}
          >
            {location == "login" ? "Not registered?" : "Already registered?"}
          </p>
          <NavLink to="signup">
            <Button show={location != "signup"} text={"Sign up"} />
          </NavLink>
          <NavLink to="login">
            <Button
              show={location != "login"}
              color={
                location != "login" && location != "signup" ? "grey" : "orange"
              }
              text={"Login"}
            />
          </NavLink>
        </div>
      ) : (
        <div>
          <UserOptions email={user.email} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
