import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/login";

const user = {
  avatar:
    "https://i.pinimg.com/originals/17/f3/9c/17f39c6f7a4a5457f39dba2368f0d077.jpg",
};

const UserOptions = ({ name }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setAnchorEl(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          aria-controls="fade-menu"
          aria-haspopup="true"
          onClick={handleClick}
          startIcon={<ArrowDropDownIcon />}
        >
          {name}
          <Avatar
            src={user.avatar}
            style={{
              marginLeft: "10px",
            }}
            sx={{ width: 40, height: 40 }}
          />
        </Button>
      </div>

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserOptions;
