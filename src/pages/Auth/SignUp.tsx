import { Link, useNavigate } from "react-router-dom";
import imgSrc from "../../../public/logo.png";
// import NavBar from "../common/NavBar";
import useAuthService from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { validate } from "../../utils/validation";
import { notify } from "../../utils/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { login } from "../../redux/slices/authSlice";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {user,token} = useAppSelector((state)=>state.auth);

  const { signup } = useAuthService();
  const [isLoading,setIsLoading] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const [termsAccepted,setTermsAccepted] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
  });
  const [errors, setErrors] = useState<{
    username: string | null;
    password: string | null;
    confirmpassword: string | null;
    email: string | null;
  }>({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmpassword: false,
    email: false,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setTouched({ ...touched, [name]: true });
    validate(name,value,errors,setErrors,credentials);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Submit")
    if (Object.values(errors).filter((e)=>e!=null).length>0) { 
        console.log("Input contains errors")
        return;
    }
    try {
      setIsLoading(true);
      const { username, password, email } = credentials;
      const res = await signup(username, email,password);
      console.log(res)
    //   if(res.status===401){
    //     notify("Invalid token or token has expired!",false);
    //     navigate("/login");
    //   }
    console.log(res);
    dispatch(login({user:res.data.data,token:null}));
      setTimeout(()=>{
          notify("OTP sent successfully!",true);
      },1000)
      navigate("/verifyOTP");
      setCredentials({username:"",confirmpassword:"",password:"",email:""})
      setErrors({username:"",confirmpassword:"",password:"",email:""})
      setTouched({username:false,email:false,password:false,confirmpassword:false});
    } catch (error:any) {
        console.log(error)
        notify(error.message,false);
    }
    finally{
        setIsLoading(false);
       
    }
  };
  useEffect(()=>{
    if(token){
        navigate("/");
        return;
    }
    if(!token && user && !user.isActive){
        navigate("/verifyOtp")
        return;
    }
  },[])

  return (
    <>
      <section className="mb-6">
        <div className="flex flex-col items-center justify-center  md:h-screen lg:py-0">
          <div className="relative w-full rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-purple bg-opacity-70">
            <div className="absolute h-full w-full inset-0 flex z-0">
              <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
              <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
              {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div> */}
              <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
            </div>
            <div className="relative z-10 p-10 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex items-center flex-row justify-start mb-4">
                <img className="w-12 h-12 mr-2" src={imgSrc} alt="logo" />
                <h1 className="text-primary text-3xl font-heading">S.AI.N.T</h1>
              </div>
              <h1 className="lg:text-lg text-md text-center">
                Create an account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-bold spaceGrotesk"
                  >
                    User Name
                  </label>
                  <input
                    value={credentials.username}
                    type="text"
                    name="username"
                    id="username"
                    onChange={handleInputChange}
                    className={`bg-purple border  sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white ${
                      errors.username && touched.username
                        ? "border-red-500"
                        : "border-purple_dark"
                    }`}
                    placeholder="john doe"
                  />
                 <p className={`text-red-500 transition-opacity duration-300 ${errors.username ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                      {errors.username as string}
                    </p>

                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-bold spaceGrotesk"
                  >
                    Email address
                  </label>
                  <input
                    value={credentials.email}
                    onChange={handleInputChange}
                    type="email"
                    name="email"
                    id="email"
                    className={`bg-purple border  sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-purple_dark"
                      }`}
                    placeholder="name@company.com"
                  />
                   <p className={`text-red-500 transition-opacity duration-300 ${errors.email ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                      {errors.email as string}
                    </p>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-bold spaceGrotesk"
                  >
                    Password
                  </label>
                  <div className={`bg-purple border  sm:text-sm rounded-lg outline-none  w-full p-2.5 text-white flex items-center ${ 
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-purple_dark"
                      }`}>
                  <input
                    value={credentials.password}
                    onChange={handleInputChange}
                    type={showPassword?"text":"password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className={` bg-transparent   sm:text-sm rounded-lg outline-none block w-full  text-white`}
                  />
                  <button type="button" onClick={()=>setShowPassword(!showPassword)}> {showPassword? <GoEyeClosed/> :<GoEye/>} </button>
                  </div>
                
                   <p className={`text-red-500 transition-opacity duration-300 ${errors.password ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                      {errors.password as string}
                    </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-bold spaceGrotesk"
                  >
                    Confirm Password
                  </label>
                  <div className={`bg-purple border  sm:text-sm rounded-lg outline-none  w-full p-2.5 text-white flex items-center ${ 
                        errors.confirmpassword && touched.confirmpassword
                          ? "border-red-500"
                          : "border-purple_dark"
                      }`}>
                  <input
                    value={credentials.confirmpassword}
                    onChange={handleInputChange}
                    type={showConfirmPassword?"text":"password"}
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className={` bg-transparent   sm:text-sm rounded-lg outline-none block w-full  text-white`}
                  />
                  <button type="button" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}> {showConfirmPassword? <GoEyeClosed/> :<GoEye/>} </button>
                  </div>
                
                   <p className={`text-red-500 transition-opacity duration-300 ${errors.confirmpassword ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                      {errors.confirmpassword as string}
                    </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        defaultChecked={termsAccepted}
                        onChange={(e)=>{setTermsAccepted(e.target.checked)}}
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 bg-purple border border-purple_dark rounded focus:ring-3 focus:ring-primary-300"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-white">
                        Yes, I agree to the{" "}
                        <Link
                          className=" font-semibold"
                          to="https://www.google.com"
                        >
                          {" "}
                          Terms of Services
                        </Link>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                    disabled={isLoading || !termsAccepted || Object.values(errors).filter(e=>e!==null).length>0}
                  type="submit"
                  className="w-full disabled:bg-slate-400  text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  { isLoading?"Submitting...":"Submit"}
                </button>
                {/* <p className="my-0.5 font-semibold text-center">or</p>
                                <button className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in with Google</button> */}
                <p className="text-md font-medium text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-[#618ef0] hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
