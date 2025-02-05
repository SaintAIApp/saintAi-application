import React, { useCallback, useEffect, useState } from "react";
import { PriceCardWithAnimation } from "../../components/PriceCard";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import usePlanService from "../../hooks/usePlans";

const Index: React.FC = () => {
  const navigate = useNavigate();
  // const [solPrice, setSolPrice] = useState<number | null>(null);
  const { getPlans } = usePlanService();
  const [plans, setPlans] = useState<any[]>([]);
  const fetchPlans = useCallback(async () => {
    try {
      const response = await getPlans();
      console.log(response.data); // Debugging
      setPlans(response.data.data); // Simpan data ke state
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }, [getPlans]); // Memastikan hanya berubah jika `getPlans` berubah

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);


  // const calculateSolPrice = (fiatPrice: number) => {
  //   return solPrice ? (fiatPrice / solPrice).toFixed(4) : null;
  // };

  return (
    <section id="pricing" className="pt-8 bg-[#1a1a2e] text-white h-auto min-h-screen pb-8">
      <button onClick={() => { navigate("/"); }} className="absolute top-10 right-10 flex items-center">
        Close <XCircleIcon className="h-7 w-7" />
      </button>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl mt-12 md:mt-0 md:text-5xl text-center">Tier Leader Boards</h1>
        <p className="text-md font-semibold text-center mt-2">Top 5 Miners Monthly, in Each Tier, Receive Rewards</p>
        <p className="container text-lg text-center font-light mt-4 font-body">
          The top 50 miners per month become seat holders in the Pantheon of Mt Olympus and are
          afforded equal voting rights
        </p>
        <div className=" container mx-w-2xl px-5 mt-6 flex flex-col gap-5">
          <div>
            <h5 className="font-bold text-2xl text-center mb-4">Tier 1 - Genesis The Beginning</h5>
            <table className="table table-auto">
              <thead className="bg-purple_dark text-white rounded-lg">
                <tr>
                  <th>Position</th>
                  <th>Miner Name</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st </td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>2st</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h5 className="font-bold text-2xl text-center mb-4">Tier 1 - Genesis The Beginning</h5>
            <table className="table table-auto">
              <thead className="bg-purple_dark text-white rounded-lg">
                <tr>
                  <th>Position</th>
                  <th>Miner Name</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st </td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>2st</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h5 className="font-bold text-2xl text-center mb-4">Tier 1 - Genesis The Beginning</h5>
            <table className="table table-auto">
              <thead className="bg-purple_dark text-white rounded-lg">
                <tr>
                  <th>Position</th>
                  <th>Miner Name</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st </td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>2st</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h5 className="font-bold text-2xl text-center mb-4">Tier 1 - Genesis The Beginning</h5>
            <table className="table table-auto">
              <thead className="bg-purple_dark text-white rounded-lg">
                <tr>
                  <th>Position</th>
                  <th>Miner Name</th>
                  <th>Rewards</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1st </td>
                  <td>Malcolm Lockyer</td>
                  <td>1961</td>
                </tr>
                <tr>
                  <td>2st</td>
                  <td>The Eagles</td>
                  <td>1972</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
                <tr>
                  <td>3st</td>
                  <td>Earth, Wind, and Fire</td>
                  <td>1975</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

{/* <PriceCardWithAnimation
  type="dark"
  delay={0.4}
  plan="Medius"
  planCode="pro"
  price={16.99}
  sol={calculateSolPrice(16.99) ?? "..."}
  benefits={[
    "SaintAI Medius - AI Mining Pass",
    "Limited AI Mine access",
    "Maximum 4 Mine hrs. / day",
    "Access to SaintAI agents MIA",
    "Unlimited Crypto Market, Forex & Stock data access",
    "Unlimited News Access",
    "Power Pass AI Mining upgrades available @ 0.0177 SOL / hr.",
    "Access to power streak mining bonus of 100 $STT"
  ]}
/>
<PriceCardWithAnimation
  type="light"
  delay={0.6}
  plan="Odysseus"
  planCode="proPlus"
  price={139.99}
  sol={calculateSolPrice(139.99) ?? "..."}
  benefits={[
    "Automated AI Mining",
    "Unlimited mine access",
    "Set and Forget, 24 hr. Automated AI Mining",
    "Unlimited Access to SaintAI Agents MIA & PIPA",
    "Unlimited Crypto Market & Stock Market Data Access",
    "Unlimited News Access",
    "Access to Power Streak Mining Bonus of 100 $STT",
  ]}
/> */}
export default Index;
