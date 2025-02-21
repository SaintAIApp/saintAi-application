import React, { useCallback, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useLeaderboard from "../../hooks/useLeaderboard";
interface Miner {
  _id: string;
  user_id: string;
  coin_stt: number;
  name: string;
  position: number;
}

interface Leaderboards {
  [key: number]: Miner[];
}
const Index: React.FC = () => {
  const navigate = useNavigate();
  // const [solPrice, setSolPrice] = useState<number | null>(null);
  const { getLeaderboards } = useLeaderboard();
  const [leaderboards, setLeaderboards] = useState<Leaderboards>({});
  const fetchLeaderboards = useCallback(async () => {
    try {
      const response = await getLeaderboards();
      const data = response.data.data;

      const updatedData: Leaderboards = {};
      for (let tier = 5; tier >= 1; tier--) {
        const existingData = data[tier] && data[tier].length > 0 ? data[tier] : [];
        const filledData = [
          ...existingData.map((miner: Miner, index: number) => ({ ...miner, position: index + 1 })),
          ...Array.from({ length: 5 - existingData.length }, (_, index) => ({
            _id: "",
            user_id: "",
            coin_stt: 0,
            name: "",
            position: existingData.length + index + 1
          }))
        ];
        updatedData[tier] = filledData;
      }
      setLeaderboards(updatedData);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  }, [getLeaderboards]); // Memastikan hanya berubah jika `getPlans` berubah

  useEffect(() => {
    fetchLeaderboards();
  }, [fetchLeaderboards]);

  const tierNames: { [key: number]: string } = {
    5: "Odysseus The King",
    4: "Kratos The Power",
    3: "Medius The Middle Ground",
    2: "Oneiros The Dreamer",
    1: "Genesis The Beginning"
  };
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
          {Object.keys(leaderboards)
            .map(Number)
            .map(tier => (
              <div key={tier} className="mb-8">
                <h5 className="font-bold text-2xl text-center mb-4">Tier {tier} - {tierNames[tier]}</h5>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead className="bg-purple_dark text-white">
                <tr>
                      <th className="border border-gray-300 px-4 py-2">Position</th>
                      <th className="border border-gray-300 px-4 py-2">Miner Name</th>
                      <th className="border border-gray-300 px-4 py-2">Rewards</th>
                </tr>
              </thead>
              <tbody>
                    {leaderboards[tier].map((miner, index) => (
                      <tr key={index} className="border border-gray-300 text-center">
                        <td className="border px-4 py-2">{miner.position}{miner.position === 1 ? "st" : miner.position === 2 ? "nd" : miner.position === 3 ? "rd" : "th"}</td>
                        <td className="border px-4 py-2">{miner.name || "-"}</td>
                        <td className="border px-4 py-2">{miner.coin_stt || "-"}</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
            ))}
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
