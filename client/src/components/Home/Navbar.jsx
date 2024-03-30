import React from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserOptions from "./UserOptions";
import { ChevronDown } from "../utils/Icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

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
          <NavLink to="/">
            <p className="cursor-pointer hover:text-[#818181]">Home</p>
          </NavLink>
          <Dropdown>
            <DropdownTrigger>
              <div className="cursor-pointer flex gap-2 items-center">
                <p className="hover:text-[#818181]">Categories</p>
                <div>
                  <ChevronDown fill="currentColor" size={16} />
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                onPress={() => {
                  navigate("/project/all?category=software");
                }}
                key="software"
              >
                Software
              </DropdownItem>
              <DropdownItem
                onPress={() => {
                  navigate("/project/all?category=hardware");
                }}
                key="hardware"
              >
                Hardware
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavLink to="/">
            <p className="cursor-pointer hover:text-[#818181]">Institute</p>
          </NavLink>
          {!user || user.isStudent ? (
            <NavLink to="myProjects">
              <p className="cursor-pointer hover:text-[#818181]">My Projects</p>
            </NavLink>
          ) : (
            <NavLink to="dashboard">
              <p className="cursor-pointer hover:text-[#818181]">Dashboard</p>
            </NavLink>
          )}
        </div>
      </div>

      {!isLoggedIn ? (
        <div className="flex justify-between gap-3 items-center pr-2">
          <p
            className={location != "login" && location != "signup" && "hidden"}
          >
            {location == "login" ? "Not registered?" : "Already registered?"}
          </p>
          {location != "signup" && (
            <NavLink to="signup">
              <Button className="text-white bg-orange rounded-md drop-shadow font-rem text-md">
                Sign up
              </Button>
            </NavLink>
          )}
          {location != "login" && (
            <NavLink to="login">
              <Button
                className={`bg-${
                  location != "signup" ? "grey text-black" : "orange text-white"
                } rounded-md drop-shadow font-rem text-md `}
              >
                Login
              </Button>
            </NavLink>
          )}
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
