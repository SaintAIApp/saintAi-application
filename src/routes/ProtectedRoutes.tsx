import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slices/authSlice";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authObject = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user,token} = authObject; 
  if (!token) {
    return <Navigate to="/" />;
  }
  if(user && !user.isActive){
    return <Navigate to={"/verifyOTP"}/>;
  }

  try {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      
      alert("Session Expired, please login again");
      dispatch(logout());
      navigate("/")
    }
  } catch (error) {
    console.log(error)
    navigate("/")
  }
  return children;
};