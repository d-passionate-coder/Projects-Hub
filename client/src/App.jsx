import Navbar from "./components/Home/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { setLoginStatus } from "./redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useScrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setLoginStatus({ status: true, user }));
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <NextUIProvider>
        <Navbar />
        <Outlet />
      </NextUIProvider>
    </>
  );
}

export default App;
