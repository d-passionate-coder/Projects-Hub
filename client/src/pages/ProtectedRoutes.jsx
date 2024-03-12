import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation().pathname;
  const redirectUrl = encodeURIComponent(location);

  return !isLoggedIn ? (
    <Navigate to={`/login/?redirect=${redirectUrl}`} />
  ) : (
    <>
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
