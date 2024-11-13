import { Link, useNavigate } from "react-router-dom";
import imgSrc from "../../assets/saintailogo.png";

import useAuthService from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { validate } from "../../utils/validation";
import { notify } from "../../utils/notify";
import { useAppSelector } from "../../redux/hooks";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state.auth);

  const { forgotOTP, resetPassword } = useAuthService();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmpassword: "",
    email: "",
    otp: "",
  });
  const [errors, setErrors] = useState<{
    email: string | null;
  }>({
    email: "",
  });
  const [resetPasswordErrors, setResetPasswordErrors] = useState<{
    otp: string | null;
    password: string | null;
    confirmpassword: string | null;
  }>({
    otp: "",
    password: "",
    confirmpassword: "",
  });

  const [touched, setTouched] = useState({
    email: false,
  });
  const [resetPasstouched, setResetPassTouched] = useState({
    otp: false,
    password: false,
    confirmpassword: false,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setTouched({ ...touched, [name]: true });
    validate(name, value, errors, setErrors, credentials);
  };
  const handleInputChangeResetPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setResetPassTouched({ ...resetPasstouched, [name]: true });
    validate(
      name,
      value,
      resetPasswordErrors,
      setResetPasswordErrors,
      credentials
    );
  };
  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    if (Object.values(errors).filter((e) => e != null).length > 0) {
      console.log("Input contains errors");
      return;
    }
    try {
      setIsLoading(true);
      const { email } = credentials;
      await forgotOTP(email);
      setOtpSent(true);
    } catch (error: any) {
      console.log(error);
      notify(error.message, false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleResetPassword = async (e: any) => {
    e.preventDefault();
    if (
      Object.values(resetPasswordErrors).filter((e) => e != null).length > 0
    ) {
      console.log("Input contains errors");
      return;
    }
    try {
      setIsLoading(true);
      const { otp, password } = credentials;
      await resetPassword(Number(otp), password);
      notify("Password Updated!", true);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      notify(error.message, false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
    if (!token && user && !user.isActive) {
      navigate("/verifyOtp");
      return;
    }
  }, [navigate, token, user]);

  return (
    <>
      <section className="mb-6">
        <div className=" w-full text-white dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          {/* Radial gradient for the container to give a faded look */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

          <div className="flex flex-col items-center mt-10  md:h-screen lg:py-0">
            <div className="relative w-full min-w-[80vw] md:min-w-[500px] rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-[#473086] bg-opacity-100">
              <div className="absolute h-full w-full inset-0 flex z-0">
                <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
                <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
                {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div> */}
                <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
              </div>
              <div className="relative z-10 p-10 space-y-4 md:space-y-6 sm:p-8">
                <div className="flex items-center flex-row justify-start mb-4">
                  <img className="h-12 mr-2" src={imgSrc} alt="logo" />

                </div>
                <h1 className="lg:text-lg text-md text-center">
                  Reset Password
                </h1>
                {!otpSent && (
                  <form
                    onSubmit={handleSendOtp}
                    className="space-y-4 md:space-y-6"
                  >
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
                        className={`bg-purple border font-semibold  sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white ${errors.email && touched.email
                          ? "border-red-500"
                          : "border-purple_dark"
                          }`}
                        placeholder="name@company.com"
                      />
                      <p
                        className={`text-red-500 transition-opacity duration-300 ${errors.email
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                          }`}
                      >
                        {errors.email as string}
                      </p>
                    </div>

                    <button
                      disabled={
                        isLoading ||
                        Object.values(errors).filter((e) => e !== null).length >
                        0
                      }
                      type="submit"
                      className="w-full disabled:bg-slate-400  text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </button>

                    <p className="text-md font-medium text-center">
                      <Link
                        to="/?m=login"
                        className="font-bold text-[#618ef0] hover:underline"
                      >
                        Cancel
                      </Link>
                    </p>
                  </form>
                )}

                {otpSent && (
                  <form
                    onSubmit={handleResetPassword}
                    className="space-y-4 md:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-bold spaceGrotesk"
                      >
                        OTP
                      </label>
                      <div
                        className={`bg-purple border font-semibold  sm:text-sm rounded-lg outline-none  w-full p-2.5 text-white flex items-center ${resetPasswordErrors.otp && resetPasstouched.otp
                          ? "border-red-500"
                          : "border-purple_dark"
                          }`}
                      >
                        <input
                          value={credentials.otp}
                          onChange={handleInputChangeResetPassword}
                          type={"password"}
                          name="otp"
                          id="otp"
                          placeholder="••••••••"
                          className={` bg-transparent   font-semibold sm:text-sm rounded-lg outline-none block w-full  text-white`}
                        />
                      </div>

                      <p
                        className={`text-red-500 transition-opacity duration-300 ${resetPasswordErrors.otp
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                          }`}
                      >
                        {resetPasswordErrors.otp as string}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-bold spaceGrotesk"
                      >
                        New Password
                      </label>
                      <div
                        className={`bg-purple border font-semibold  sm:text-sm rounded-lg outline-none  w-full p-2.5 text-white flex items-center ${resetPasswordErrors.password &&
                          resetPasstouched.password
                          ? "border-red-500"
                          : "border-purple_dark"
                          }`}
                      >
                        <input
                          value={credentials.password}
                          onChange={handleInputChangeResetPassword}
                          type={showPassword ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className={` bg-transparent   font-semibold sm:text-sm rounded-lg outline-none block w-full  text-white`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {" "}
                          {showPassword ? <GoEyeClosed /> : <GoEye />}{" "}
                        </button>
                      </div>

                      <p
                        className={`text-red-500 transition-opacity duration-300 ${resetPasswordErrors.password
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                          }`}
                      >
                        {resetPasswordErrors.password as string}
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="confirmpassword"
                        className="block mb-2 text-sm font-bold spaceGrotesk"
                      >
                        Confirm New Password
                      </label>
                      <div
                        className={`bg-purple border   sm:text-sm rounded-lg outline-none  w-full p-2.5 text-white flex items-center ${resetPasswordErrors.confirmpassword &&
                          resetPasstouched.confirmpassword
                          ? "border-red-500"
                          : "border-purple_dark"
                          }`}
                      >
                        <input
                          value={credentials.confirmpassword}
                          onChange={handleInputChangeResetPassword}
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmpassword"
                          id="confirmpassword"
                          placeholder="••••••••"
                          className={` bg-transparent font-semibold   sm:text-sm rounded-lg outline-none block w-full  text-white`}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? <GoEyeClosed /> : <GoEye />}{" "}
                        </button>
                      </div>

                      <p
                        className={`text-red-500 transition-opacity duration-300 ${resetPasswordErrors.confirmpassword
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                          }`}
                      >
                        {resetPasswordErrors.confirmpassword as string}
                      </p>
                    </div>

                    <button
                      disabled={
                        isLoading ||
                        Object.values(resetPasswordErrors).filter(
                          (e) => e !== null
                        ).length > 0
                      }
                      type="submit"
                      className="w-full disabled:bg-slate-400  text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      {isLoading ? "Submiting..." : "Change Password"}
                    </button>
                    {/* <p className="my-0.5 font-semibold text-center">or</p>
                                <button className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in with Google</button> */}
                    <p className="text-md font-medium text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setErrors({ email: "" });
                          setTouched({ email: false });
                          setCredentials({
                            username: "",
                            email: "",
                            otp: "",
                            password: "",
                            confirmpassword: "",

                          });
                          setResetPassTouched({ password: false, confirmpassword: false, otp: false });
                          setResetPasswordErrors({ password: "", confirmpassword: "", otp: "" });
                          setOtpSent(false);
                        }}
                        className="font-bold text-[#618ef0] hover:underline"
                      >
                        Cancel
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
