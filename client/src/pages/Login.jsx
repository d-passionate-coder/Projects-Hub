import { useEffect, useState } from "react";
import InputBox from "../components/utils/InputBox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/actions/login";
import { Button } from "@nextui-org/react";

const Login = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (user) navigate(redirectUrl);
  }, [user]);

  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    dispatch(loginUser(formData));
  };

  return (
    <div className="bg-background flex justify-around py-20">
      <div className="p-8 w-[30rem] rounded-lg shadow bg-white">
        <p className="font-remBold text-center text-[2rem]">Welcome back!</p>
        <form
          className="p-8 px-10 font-poppins w-auto text-[0.87rem] flex flex-col gap-4"
          onSubmit={handleSubmit}
          method="POST"
        >
          <label htmlFor="email">Email ID</label>
          <InputBox
            type={"email"}
            id={"email"}
            name={"email"}
            placeholder={"example@site.com"}
            value={email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <InputBox
            type={"password"}
            id={"password"}
            name={"password"}
            placeholder={"Enter your password"}
            value={password}
            onChange={handleChange}
          />
          {/* <button className="bg-orange text-white w-full flex justify-center items-center rounded-lg drop-shadow cursor-pointer p-1 mt-4 text-base">
            Login
          </button> */}
          {loading ? (
            <Button
              className="bg-orange  text-white text-base font-rem h-8 rounded-lg"
              isLoading
            >
              Login
            </Button>
          ) : (
            <Button
              className="bg-orange text-white text-base font-rem h-8 rounded-lg"
              type="submit"
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
