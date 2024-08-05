import { Link, useNavigate } from "react-router-dom";
import imgSrc from "../../assets/saintailogo.png";
import useAuthService from "../../hooks/useAuth";
import { useAppDispatch } from "../../redux/hooks";
import { setCurrentModal } from "../../redux/slices/modalSlice";
import { useEffect, useState } from "react";
import { login } from "../../redux/slices/authSlice";
import { notify } from "../../utils/notify";
import loader from "../../assets/loader.webp";
import { GoEye, GoEyeClosed } from "react-icons/go";

const Login = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { loginUser } = useAuthService();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await loginUser(email, password);
      dispatch(login({ user: res.data.user, token: res.data.token }));
      // setCurrentModal(null)
      navigate("/");
    } catch (error: any) {
      alert("Invalid Credentials");
      notify(error.message, false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <>
      {/* <section className="relative mb-4">

      <div className=" w-full  bg-black dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex flex-col items-center mx-auto md:h-screen  mt-0 md:mt-10 lg:py-0"> */}

      <div className="relative w-full rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-[#473086] bg-opacity-100">
        <div className="absolute h-full w-full inset-0 flex z-0">
          <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
          <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
          {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div> */}
          <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
        </div>
        <div className="relative z-10 p-10 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex items-center flex-row justify-start mb-4">
            <img className="h-12" src={imgSrc} alt="logo" />
            {/* <h1 className="text-primary text-3xl font-heading">S.AI.N.T</h1> */}
          </div>
          <h1 className="lg:text-lg text-md text-center">
            Hey! Welcome back
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-bold spaceGrotesk"
              >
                Email address
              </label>
              <input
                value={email}
                type="email"
                name="email"
                id="email"
                onChange={(e) => { setEmail(e.target.value); }}
                className="bg-purple border border-purple_dark sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white font-semibold"
                placeholder="name@company.com"
              />
            </div>


            <div className="flex sm:mb-0 md:mb-4 items-start space-x-0 md:space-x-2 justify-between w-full md:flex-row flex-col space-y-2 md:space-y-0">

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-bold spaceGrotesk"
                >
                  Password
                </label>
                <div
                  className={`bg-purple border font-semibold sm:text-sm rounded-lg outline-none w-full p-2.5 text-white flex items-center border-purple_dark`}
                >
                  <input
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-transparent font-semibold sm:text-sm rounded-lg outline-none block w-full text-white"

                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 bg-purple border border-purple_dark rounded focus:ring-3 focus:ring-primary-300"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-white">
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to={"/resetPassword"}
                className="text-sm font-medium text-primary-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <button
              disabled={email.length == 0 || password.length === 0 || isLoading}
              type="submit"
              className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-slate-400 flex justify-center"
            >
              {!isLoading ? <p> Sign in</p> : <img className="h-4 w-4" src={loader} />}
            </button>
            {/* <p className="my-0.5 font-semibold text-center">or</p>
                               <button className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in with Google</button> */}
            <p className="text-md font-medium text-center">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => { dispatch(setCurrentModal("signup")); }}

                className="font-bold text-[#618ef0] hover:underline"
              >
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}



      {/* </section> */}
    </>
  );
};

export default Login;
