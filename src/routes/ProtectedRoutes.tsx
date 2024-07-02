import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks"
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authObject = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const {user,token} = authObject; 
  if (!token) {
    return <Navigate to="/login" />;
  }
  if(user && !user.isActive){
    return <Navigate to={"/verifyOTP"}/>;
  }

  try {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.exp * 1000 < Date.now()) {
      alert("Session Expired, please login again");
      navigate("/login")
    }
  } catch (error) {
    console.log(error)
    navigate("/login")
  }
  return children;
};