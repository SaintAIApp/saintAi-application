import Button from "../../components/Button";

const index = () => {
  return (
    <section className="my-10">
      <div id="hero" className="flex flex-col space-y-5">
        <h1 className="font-thin text-sm">Endless Scaling</h1>
        <h1 className="text-4xl">A little bit about the</h1>
        <h1 className="text-4xl text-purple_dark">Network</h1>
        <ul className="flex space-x-4 ">
          <li className="rounded-full relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Accesible</span>
          </li>
          <li className="rounded-full relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Blockchain</span>
          </li>
          <li className="rounded-full relative px-4 py-2 border border-white overflow-hidden min-w-32 text-center">
            <div className="absolute h-44 w-44 bg-shape1 top-0 left-0 z-0 opacity-90  bg-blur"></div>
            <span>Mining</span>
          </li>
        </ul>
      </div>
      <div className="my-5 flex flex-col space-y-5">
        <h1 className="text-sm font-thin">Egalitarian</h1>
        <div className=" flex justify-between">
          <h1 className="text-3xl ">
            <span className="text-primary"> SaintAI </span> promotes solo mining
          </h1>
          <Button variant="rounded" text="Saint App" />
        </div>
        <ul className="flex space-x-5 w-full">
          <li className="w-1/4">
            <div className="">
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Purpose
              </h1>
              <p className="text-sm font-thin py-2">
                Participates in the peer-to-peer network and stores a copy of
                the Blockchain. Validates transactions and creates new blocks
              </p>
            </div>
          </li>
          <li className="w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Requirments
              </h1>
              <p className="text-sm py-2 font-thin">
                Requires only software to connect to the network.
              </p>
            </div>
          </li>
          <li className="w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                User Incentive
              </h1>
              <p className="text-sm font-thin py-2">
                Has direct financial incentive for running a node. Earns rewards
                in the form of newly mined cryptocurrency.
              </p>
            </div>
          </li>
          <li className="w-1/4">
            <div>
              <h1 className=" border-b-[2.7px] border-slate-600 py-2">
                Decentralized
              </h1>
              <p className="text-sm font-thin py-2">
                Can be run by anyone, leading to a more decentralized network.
              </p>
            </div>
          </li> 
        </ul>
      </div>
      <div className="flex flex-col space-y-24">
        <div className="flex justify-between ">
          <div id="left">
            <h1 className="text-3xl py-5 ">Secure on Chain Application Software</h1>
            <p className="w-3/4 text-lg text-slate-300">
              <span className="text-primary">SaintAI</span> employs proof of
              analysis (PoA) mining for distributed consensus. Its
              ASIC-resistant algorithm allows mining with consumer-grade
              hardware and the Saint software. While CPUs and GPUs can mine,
              CPUs are more efficient.
            </p>
          </div>
          <div id="right">
            <img className=" h-48 w-48 object-cover  overflow-visible" src="./cube1.png" />
          </div>
        </div>

        <div className="flex justify-between">
          <div id="left">
            <h1 className="text-3xl ">
              {" "}
              <span className="text-primary"> Saint </span> Secure Backbone
            </h1>
            <p className="w-3/4 text-lg text-slate-300">
              Data privacy and security are crucial; no customer data is shared
              or trained on. External use involves representational data, with
              local or virtual private SLMs.
            </p>
          </div>
          <div id="right">
            <img className=" h-48 w-48 object-cover  overflow-visible" src="./cube2.png" />
          </div>
        </div>

        <div className="flex justify-between ">
          <div id="left">
            <h1 className=" text-primary text-3xl">Go Green</h1>
            <p className="w-3/4 text-lg text-slate-300">
              Uses much less energy than traditional mining due to transformer
              model rather than intensive computation.
            </p>
          </div>
          <div id="right">
            <img className=" h-48 w-48 object-cover  overflow-visible" src="./cube3.png" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
