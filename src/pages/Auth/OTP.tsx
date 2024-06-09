import {  Navigate, useNavigate } from "react-router-dom";
import imgSrc from "../../assets/saintailogo.png";
import { useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import useAuthService from "../../hooks/useAuth";
import { notify } from "../../utils/notify";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/slices/authSlice";
// import NavBar from "../common/NavBar";

const OTP = () => {
    const {user} = useAppSelector((state)=>{return state.auth});
    const dispatch = useDispatch();
    const [isLoading,setIsLoading] = useState(false);
    const {verifyOTP,deleteAccount} = useAuthService()
    if( !user)
        return <Navigate to="/login"/>
    if(user && user.isActive)
        return <Navigate to={"/"}/>
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const inputRefs = useRef<any>([]);
  
    const handleChange = (element:any, index:number) => {
      if (isNaN(element.value)) return;
      setOtp([...otp.map((d, idx:number) => (idx === index ? element.value : d))]);
  
      // Focus next input
      if (element.value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (event:any, index:number) => {
      if (event.key === 'Backspace') {
        if (otp[index] === '') {
          if (index > 0) {
            inputRefs.current[index - 1].focus();
          }
        }
        setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
      }
    };
    const handlePaste = (event:any) => {
        const pasteData = event.clipboardData.getData('text').slice(0, 6).split('');
        if (pasteData.length > 0) {
          setOtp([...pasteData, ...otp.slice(pasteData.length)].slice(0, 6));
          pasteData.forEach((value:any, index:number) => {
            if (inputRefs.current[index]) {
              inputRefs.current[index].value = value;
            }
          });
          if (inputRefs.current[pasteData.length - 1]) {
            inputRefs.current[pasteData.length - 1].focus();
          }
        }
        event.preventDefault();
      };
      const handleVerify = async ()=>{
        try {
            setIsLoading(true)
            let otpNumber = "";
            for(let n of otp){
                otpNumber+=(n);
            }
            const res = await verifyOTP(Number(otpNumber));
            dispatch(login({user:res.data.data.user,token:res.data.data.token}))
            setIsLoading(false)
            navigate("/")
        } catch (error:any) {
            console.log(error)
            notify(error.message,false);
            setIsLoading(false)
        }
        
      }
      const handleCancel =async ()=>{
        try {
            await deleteAccount(user._id);
            dispatch(logout());
            navigate("/signup")
            
        } catch (error:any) {
          notify(error.message,false)
        }
      }
    return (
        <>
            <section className="mb-6">
                <div className="flex flex-col items-center mt-10  md:h-screen lg:py-0">
                    <div className="relative w-full rounded-3xl shadow-lg md:mt-0 sm:max-w-md xl:p-0 form border-purple_dark border-[0.7px] overflow-hidden bg-purple bg-opacity-70">
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
                                Verify OTP
                            </h1>
                            <h1>Hey {user && user.username} 👋</h1><h1> OTP is successfully sent to <b>{user && user.email}</b></h1>
                            <div className="flex justify-evenly w-full" onPaste={handlePaste}>
                                {otp.map((data, index) => (
                                    <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={data}
                                    ref={(ref) => inputRefs.current[index] = ref}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    className="md:w-12 md:h-12 h-8 w-8 bg-purple bg-opacity-65  text-lg text-center text-white rounded-lg border-[0.7px] border-purple_dark outline-none focus:border-[1.1px]"

                                    />
                                ))}
                                </div>
                                <button disabled={isLoading || otp.filter((e)=>e==='').length>0} type="button" onClick={handleVerify} className="text-white outline-none bg-primary py-2 rounded-lg w-full disabled:bg-slate-500">{isLoading?"Verifying...":"Verify"}</button>
                                <button type="button" onClick={handleCancel} className=" outline-none text-white py-2 rounded-lg w-full">Cancel</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default OTP;
