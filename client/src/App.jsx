import Navbar from "./components/Home/Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { setLoginStatus } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  useScrollToTop();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("checkLogin")
      .then((res) => {
        const user = res.data;
        if (user) {
          dispatch(setLoginStatus({ status: true, user }));
        } else {
          throw new Error("No User found");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NextUIProvider>
        {isLoading ? (
          <div>Server is starting...</div>
        ) : (
          <>
            <Navbar />
            <Outlet />
          </>
        )}
      </NextUIProvider>
    </>
  );
}

export default App;
