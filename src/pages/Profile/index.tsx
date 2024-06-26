import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useUserService from "../../hooks/useUser";
import { clearPlan, updatePlan } from "../../redux/slices/subscriptionSlice";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/Badge";
import moment from "moment";
import usePaymentServices from "../../hooks/usePayment";
import { notify } from "../../utils/notify";
import DialogComponent from "../../components/Dialog";
import { logout } from "../../redux/slices/authSlice";

const Profile = () => {
  const handleLogout = ()=>{
    dispatch(logout());
    dispatch(clearPlan());

  }
  const states = useAppSelector((state) => state);
  const {auth,subscription} = states;
  const {user} = auth;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getUserDetails } = useUserService();
  const { cancelSubscription } = usePaymentServices();
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const fetchUserData = async () => {
    try {
      const res = await getUserDetails(user?._id || "");
      if (res.data.data.subscriptionData.length > 0)
        dispatch(updatePlan(res.data.data.subscriptionData[0]));
    } catch (error) {
      console.log(error);
    }
  };

  const getPlan = () => {
    const plan = subscription.plan;
    if (plan === "") return <span className="text-slate-400">Free</span>;
    else if (plan === "pro")
      return (
        <span className="px-3 text-white py-1 bg-opacity-50 bg-slate-300 border border-slate-700 rounded-full">
          Pro
        </span>
      );
    else if (plan === "proPlus")
      return (
        <span className="flex w-fit rounded-full">
          <h1 className="proPlusText font-bold">
            <span></span> Pro Plus
          </h1>
        </span>
      );
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription();
      if (res.status === 200) {
        dispatch(updatePlan({validUntil:new Date(Date.now()),plan:"",userId:user?._id||"",customerId:subscription.customerId}))
        notify("Subscription cancelled", true);
        setIsDialogOpen(false); // Close the dialog on successful cancellation
      }
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  const getExpiry = () => {
    const currentDate = moment();
    const expiryDate = moment(subscription.validUntil);
    const differenceInDays = expiryDate.diff(currentDate, "days");
    if(differenceInDays<0)
      return `Your plan expired ${-1*differenceInDays} days ago`
    return `${differenceInDays} days`;
  };

  useEffect(() => {
    if (!user) navigate("/");
    fetchUserData();
  }, []);

  return (
    <section id="profile" className="min-h-[50rem] font-roboto z-20">
      {(subscription.plan !== "proPlus" || moment(subscription.validUntil).isBefore(Date.now())) && (
        <div className="w-full py-2 border-[0.3px] border-slate-800 rounded-md flex justify-center items-center relative overflow-hidden">
          <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-150px] right-20"></div>
          <div className="z-0 absolute h-64 w-64 bg-shape2 bottom-0 left-0 text-sm"></div>
          <span className="text-sm">
            {subscription.plan === "" || moment(subscription.validUntil).isBefore(Date.now())
              ? "Unlock More Features with Our Pro Plans!"
              : subscription.plan === "pro"
              ? "Unlock More Features with Our Pro Plus Plan!"
              : ""}
            <Badge text="View Plans" />
          </span>
        </div>
      )}
      <div className="relative z-20 w-full flex flex-col space-y-4 rounded-md bg-opacity-70 overflow-hidden p-0 md:p-10">
        <div className="relative w-full">
          <div className="bg-dark flex flex-col space-y-2 p-3 rounded-md mt-3 md:mt-6">
            <h1 className="text-md md:text-2xl">Personal Details</h1>
            <div className="mb-7">
              <h1 className="text-md md:text-lg">
                <span>Email: </span> {user?.email}
              </h1>
              <h1 className="text-md md:text-lg">
                <span>User Name: </span> {user?.username}
              </h1>
              <h1> {auth.token && user && (
                
                <button className="text-red-400" onClick={handleLogout}>Logout</button>
              )}</h1>
            </div>

               

          </div>

          {/* SUBSCRIPTION DETAILS */}
          <div className="bg-dark p-3 rounded-md mt-3 md:mt-6 flex flex-col space-y-2">
            <h1 className="text-md md:text-2xl">Subscription Details</h1>
            <div>
              <h1 className="text-lg">
                <span className="flex space-x-2 items-center">
                  <span>Plan:</span> {getPlan()}
                </span>
              </h1>
              {subscription.plan !== "free" && subscription.plan !== ""  && (
                <div>
                  <h1 className="text-lg">
                    <span className="flex space-x-2 mr-1 items-center">
                      <span>Expires In:</span> &nbsp; {getExpiry()}
                    </span>
                  </h1>
                  { !moment(subscription.validUntil).isBefore(Date.now()) && <DialogComponent
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    onConfirm={handleCancelSubscription}
                  />}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
