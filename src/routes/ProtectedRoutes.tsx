import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks"
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const authObject = useAppSelector((state) => state.auth);
  const {user,token} = authObject; 
  if (!token) {
    return <Navigate to="/login" />;
  }
  if(user && !user.isActive){
    return <Navigate to={"/verifyOTP"}/>;
  }

  try {
    const decodedToken: any = jwtDecode(token);
    if (decodedToken.expiresIn * 1000 < Date.now()) {
      alert("Session Expired")
      return <Navigate to="/login" />;
    }
  } catch (error) {
    return <Navigate to="/login" />;
  }
  return children;
};