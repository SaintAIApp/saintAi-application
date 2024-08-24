import moment from "moment";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../components/Badge";
import Button from "../../components/Button";
import DialogComponent from "../../components/CancelSubscriptionDialog";
import usePaymentServices from "../../hooks/usePayment";
import useUserService from "../../hooks/useUser";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { clearPlan, updatePlan } from "../../redux/slices/subscriptionSlice";
import { notify } from "../../utils/notify";
import DeleteAccountDialog from "../../components/DeleteAccountDialog";
import { BiChevronRight } from "react-icons/bi";
import useAuthService from "../../hooks/useAuth";

const Profile = () => {
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPlan());

  };
  const states = useAppSelector((state) => state);
  const { auth, subscription } = states;
  const { user } = auth;
  const { deleteAccount } = useAuthService();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { getUserDetails } = useUserService();
  const { cancelSubscription } = usePaymentServices();
  const [subDialogOpen, setSubDialogOpen] = useState(false);
  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);


  const fetchUserData = useCallback(async () => {
    try {
      const { data } = await getUserDetails(user?._id || "");
      const subscriptionData = data.data.subscriptionData;
      const userGroup = data.data.userGroup;
      //If user has already made any payments in Past
      if (subscriptionData.length > 0) {
        const { customerId, userId, validUntil } = subscriptionData[subscriptionData.length - 1];
        dispatch(updatePlan({ plan: userGroup.name, customerId: customerId, userId: userId, validUntil: validUntil }));
      }
      else {
        dispatch(clearPlan());
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, getUserDetails, user]);

  const getPlan = () => {
    const plan = subscription.plan;
    if (plan === "" || plan.toLowerCase() === "free") return <span className="text-slate-400">Genesis</span>;
    else if (plan.toLowerCase() === "pro")
      return (
        <span className="  proText rounded-full text-sm">
          Medius
        </span>
      );
    else if (plan.toLowerCase() === "proplus")
      return (
        <span className="flex w-fit rounded-full">
          <h1 className="proPlusText font-bold">
            <span></span> Odysseus
          </h1>
        </span>
      );
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription();
      if (res.status === 200) {
        dispatch(updatePlan({ validUntil: new Date(Date.now()), plan: "", userId: user?._id || "", customerId: subscription.customerId }));
        notify("Subscription cancelled", true);
        setSubDialogOpen(false); // Close the dialog on successful cancellation
      }
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      if (!user) return;
      await deleteAccount(user?._id);
      dispatch(logout());
    } catch (error: any) {
      notify(error.message, false);
    }
  };

  const getExpiry = () => {
    const currentDate = moment();
    const expiryDate = moment(subscription.validUntil);
    const differenceInDays = expiryDate.diff(currentDate, "days");
    if (differenceInDays < 0)
      return `Your plan expired ${-differenceInDays} days ago`;
    return `${differenceInDays} days`;
  };

  useEffect(() => {
    if (!user) navigate("/");
    fetchUserData();
  }, [fetchUserData, navigate, user]);

  return (
    <section id="profile" className="px-2 pb-10 mt-6 container mx-auto">
      {(subscription.plan !== "proPlus" || moment(subscription.validUntil).isBefore(Date.now())) && (
        <div className="w-full  mb-6 md:py-2 md:px-0 px-2 py-2 border-[0.3px] border-slate-800 rounded-md flex justify-center items-center relative overflow-hidden">
          <div className="z-0 absolute h-64 w-64 bg-shape1 bottom-[-150px] right-20"></div>
          <div className="z-0 absolute h-64 w-64 bg-shape2 bottom-0 left-0 text-sm"></div>
          <span className="text-sm mr-3">
            {subscription.plan === "" || moment(subscription.validUntil).isBefore(Date.now())
              ? "Unlock more features with our Odysseus plans!"
              : subscription.plan === "pro"
                ? "Unlock more features with our Odysseus plan!"
                : ""}
          </span>
          <Badge text="View Plans" />
        </div>
      )}
      <h1 className="text-3xl ml-2 mb-4 font-semibold font-[SpaceGrotesk]">Profile</h1>
      <div className="grid mt-8 gap-4 grid-cols-1 lg:grid-cols-2">
        <ProfileSection title="Personal">
          <p className="text-md md:text-lg">
            <span className="font-bold select-none">Email <BiChevronRight className="inline-block" /> </span> {user?.email}
          </p>
          <p className="text-md md:text-lg">
            <span className="font-bold select-none">Username <BiChevronRight className="inline-block" /> </span> {user?.username}
          </p>
          <div className="flex flex-row gap-2"> {auth.token && user && (
            <>
              <Button variant="primary" onClick={handleLogout} className="bg-purple text-white py-2 px-3 rounded-xl mt-4" text={"Log out"} />
              <DeleteAccountDialog onConfirm={handleDeleteAccount} open={deleteAccountDialogOpen} onOpenChange={setDeleteAccountDialogOpen} />
            </>
          )}</div>
        </ProfileSection>
        <ProfileSection title="Subscription">
          <p className="text-md lg:text-lg">
            <span className="flex space-x-2 items-center">
              <span className="font-bold select-none">Plan <BiChevronRight className="inline-block" /></span> {getPlan()}
            </span>
          </p>
          {true && (
            <div>
              <p className="text-md lg:text-lg">
                <span className="flex space-x-2 mr-1 items-center">
                  <span className="font-bold select-none">Expires in <BiChevronRight className="inline-block" /></span> &nbsp; {getExpiry()}
                </span>
              </p>
              {true && <DialogComponent
                open={subDialogOpen}
                onOpenChange={setSubDialogOpen}
                onConfirm={handleCancelSubscription}
              />}
            </div>
          )}
        </ProfileSection>
      </div>
    </section >
  );
};

function ProfileSection({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <h1 className="text-xl md:text-2xl ml-2 mb-2 lg:ml-4 font-[SpaceGrotesk]">{title}</h1>
      <div className="bg-dark pl-2 py-4 lg:pl-4 rounded-md border border-gray-100/20">
        {children}
      </div>
    </div>
  );
}

export default Profile;
