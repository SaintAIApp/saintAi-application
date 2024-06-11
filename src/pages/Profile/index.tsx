import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useUserService from "../../hooks/useUser";
import { updatePlan } from "../../redux/slices/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/Badge";
// import moment from "moment";

const index = () => {
  const { user } = useAppSelector((state) => state.auth);
  const subscription = useAppSelector((state) => state.subscription);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getUserDetails } = useUserService();
  const fetchUserData = async () => {
    try {
      const res = await getUserDetails(user?._id || "");
      if(res.data.data.subscriptionData.length>0)
        dispatch(updatePlan(res.data.data.subscriptionData[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const getPlan = () => {
    const plan = subscription.plan;
    if (plan === "")
      return (
        <span className=" text-slate-400  ">
          Free
        </span>
      );
    else if (plan === "pro")
      return (
        <span className="  px-3 text-white py-1  bg-opacity-50 bg-slate-300 border border-slate-700 rounded-full ">
          Pro
        </span>
      );
    else if (plan === "proPlus")
      return (
        <span className=" flex    w-fit   rounded-full ">
          <h1 className="proPlusText font-bold">
            <span></span> Pro Plus
          </h1>
        </span>
      );
  };
  // const getExpiry = () => {
  //   const currentDate = moment();
  //   const expiryDate = moment(subscription.validUntil);
  //   const differenceInDays = expiryDate.diff(currentDate, "days");
  //   return `${differenceInDays} days`;
  // };

  useEffect(() => {
    if (!user) navigate("/");
    fetchUserData();
  }, []);

  return (
    <section id="profile" className=" min-h-[50rem]">
     {subscription.plan!=="proPlus" && <div className="w-full py-2 border-[0.3px] border-slate-800 rounded-md flex justify-center items-center relative overflow-hidden">
      <div className=" z-0 absolute h-64 w-64 bg-shape1   bottom-[-150px] right-20"></div>
        <div className=" z-0 absolute  h-64 w-64 bg-shape2 bottom-0 left-0 text-sm"></div>
        <span className="text-sm">
        {subscription.plan==="" && "Unlock More Features with Our Pro Plans!  "}
        {subscription.plan==="pro" && "Unlock More Features with Our Pro Plus Plan! "}
        {/* {"Unlock More Features with Our Pro Plans!  "} */}
        <Badge text="View Plans"/>
        </span>
        </div>}
      <div className="relative flex flex-col space-y-4  rounded-md  bg-opacity-70 overflow-hidden p-10">
       
        <div className="relative">
          <div className="">
            <h1 className="text-2xl">Personl Details</h1>
            <div className=" mb-7 ">
              <h1 className="text-lg">
                <span>Email: </span> {user?.email}
              </h1>
              <h1 className="text-lg">
                <span>User Name: </span> {user?.username}
              </h1>
            </div>
          </div>
          <div>
            <h1 className="text-2xl">Subscription Details</h1>

            <div className="">
              <h1 className="text-lg">
                <span className="flex space-x-2 items-center">
                  
                  <span>Plan:</span> {getPlan()}
                </span>
              </h1>
             {subscription.plan!=="free" && subscription.plan!=="" && <h1 className="text-lg">
                <span className="flex space-x-2 mr-1 items-center">

                  {/* <span>Expires In:</span> &nbsp; {getExpiry()} */}
                  <span>Expires In:</span> &nbsp; 29 days
                </span>
              </h1>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
