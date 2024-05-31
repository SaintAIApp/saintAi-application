import { useNavigate } from "react-router-dom";
import imgSrc from "../../../public/logo.png";
// import NavBar from "../common/NavBar";

const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = (e:any) => {
        e.preventDefault();
        navigate("/loaddata");
    };

    return (
        <>
            <section>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="relative w-full rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-purple bg-opacity-70">
                        <div className="absolute h-full w-full inset-0 flex z-0">
                            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90 bg-blur"></div>
                            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
                            {/* <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div> */}
                            <div className="absolute h-44 w-44 bg-shape1 top-[50px] right-0 z-0 bg-blue-400 opacity-100 bg-blur"></div>
                        </div>
                        <div className="relative z-10 p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className="flex items-center flex-row justify-start mb-4">
                                <img className="w-12 h-12 mr-2" src={imgSrc} alt="logo" />
                                <h1 className="text-primary text-3xl font-heading">S.AI.N.T</h1>
                            </div>
                            <h1 className="lg:text-lg text-md text-center">
                                Sign up for S.AI.N.T
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-bold spaceGrotesk">Email address</label>
                                    <input type="email" name="email" id="email" className="bg-purple border border-purple_dark sm:text-sm rounded-lg outline-none block w-full p-2.5 text-white" placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-bold spaceGrotesk">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-purple border border-purple_dark sm:text-sm rounded-lg outline-none block w-full p-2.5" />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 bg-purple border border-purple_dark rounded focus:ring-3 focus:ring-primary-300" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label htmlFor="remember" className="text-white">Remember me</label>
                                        </div>
                                    </div>
                                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</a>
                                </div>
                                <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                                <p className="my-0.5 font-semibold text-center">or</p>
                                <button className="w-full text-black bg-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in with Google</button>
                                <p className="text-md font-medium text-center">
                                    Don't have an account? <a href="/signup" className="font-bold text-[#618ef0] hover:underline">Sign up here</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
