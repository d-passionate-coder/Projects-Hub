import React from "react";
import {
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/login";

export default function UserOptions({ email }) {
  const dispatch = useDispatch();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name="Jason Hughes"
          size="sm"
          src="https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{email}</p>
        </DropdownItem>
        <DropdownItem key="logout" color="danger">
          <p onClick={() => dispatch(logoutUser())}>Log Out</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
