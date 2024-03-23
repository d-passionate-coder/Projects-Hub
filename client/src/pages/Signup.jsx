import React from "react";
import { useState, useEffect } from "react";
import InputBox from "../components/utils/InputBox";
import collegeData from "../constants/engineering_colleges.json";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import registerUser from "../redux/actions/signup";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [formData, setformData] = useState({
    isStudent: true,
    firstName: "",
    lastName: "",
    institute: "",
    studentId: "",
    email: "",
    password: "",
  });

  const {
    isStudent,
    firstName,
    lastName,
    institute,
    studentId,
    email,
    password,
  } = formData;

  const handleChange = (e) => {
    setformData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <div className="bg-background flex justify-around py-20">
      <div className="p-8 w-[30rem] rounded-lg shadow bg-white">
        <p className="font-remBold text-center text-[2rem]">Let's go!</p>
        <form
          className="p-8 px-10 font-poppins w-auto text-[0.87rem] flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-2 items-center">
            <p className="text-nowrap">I'm a</p>
            <div className="flex justify-between items-center w-full border border-[#E1E3E6] border-2 h-8 px-3 rounded-lg">
              <p className="text-[0.8rem]">
                {isStudent ? "Student" : "Faculty"}
              </p>
              <img
                src="/assets/svg/flip.svg"
                alt="flip"
                onClick={() =>
                  setformData((prev) => {
                    return { ...prev, isStudent: !prev.isStudent };
                  })
                }
                className="cursor-pointer"
              />
            </div>
          </div>
          <label htmlFor="firstName">First Name</label>
          <InputBox
            type={"text"}
            id={"firstName"}
            name={"firstName"}
            placeholder={"Phunsukh"}
            value={firstName}
            onChange={handleChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <InputBox
            type={"text"}
            id={"lastName"}
            name={"lastName"}
            placeholder={"Wangdu"}
            value={lastName}
            onChange={handleChange}
          />
          <label htmlFor="institute">Select Institute</label>
          <div className="flex gap-3 items-center border border-[#E1E3E6] border-2 rounded-lg h-8 px-3">
            <select
              className="w-full focus:outline-none text-xs"
              name="institute"
              id="institute"
              value={institute}
              onChange={handleChange}
            >
              <option selected>Your institute</option>
              {collegeData.map((item) => (
                <option value={item.name}>{item.name}</option>
              ))}
            </select>
          </div>
          {isStudent && (
            <>
              <label htmlFor="studentId">Student ID</label>
              <InputBox
                type={"text"}
                id={"studentId"}
                name={"studentId"}
                placeholder={"Enter student ID"}
                value={studentId}
                onChange={handleChange}
              />
            </>
          )}
          <label htmlFor="email">Email ID</label>
          <div>
            <InputBox
              type={"email"}
              id={"email"}
              name={"email"}
              placeholder={"example@site.com"}
              value={email}
              onChange={handleChange}
            />
            <p className="text-[0.75rem] text-[#999999] py-1">
              *one which is registered in college
            </p>
          </div>
          <label htmlFor="password">Create Password</label>
          <InputBox
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={"Minimum 8 characters"}
            value={password}
            onChange={handleChange}
          />
          <button className="bg-orange text-white w-full flex justify-center items-center rounded-lg drop-shadow cursor-pointer p-1 mt-4 text-base">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
