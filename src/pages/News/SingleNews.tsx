// import { Link, useParams } from "react-router-dom";
// import news from "../../mock/news.json";
// import { BsArrowLeft } from "react-icons/bs";
// import News from "../../components/NewsCard";
// import ChatBox from "../../components/Chat/ChatBox";
// import logo from "../../assets/saintlogocircle.png";
// import { useState } from "react";
// const SingleNews = () => {
//   const { id } = useParams();
//   const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);
//   const curNews = news.find((e) => {
//     return e.id === id;
//   });
//   const getBg = () => {
//     switch (curNews?.type) {
//       case "crypto":
//         return { bg: "#fff4a6", text: "#ad5b03" };
//       case "stocks":
//         return { bg: "#a4c7fc", text: "#0347ad" };
//     }
//     return { bg: "yellow", text: "black" };
//   };
//   return (
//     <section className=" py-2">
//       <ChatBox setIsOpen={setIsChatBoxOpen} isOpen={isChatBoxOpen} />
//       <div className="px-[10vw] ">
//         <Link
//           to="/"
//           className="flex z-20 relative  cursor-pointer items-center space-x-2"
//         >
//           {" "}
//           <BsArrowLeft /> &nbsp; Back
//         </Link>
//         <h1 className=" text-2xl md:text-5xl font-semibold my-4">
//           {curNews?.title}
//         </h1>
//         <div className="my-4">
//           <span
//             className="px-2 py-0.5 text-sm w-fit rounded-full"
//             style={{
//               borderColor: getBg().text,
//               borderWidth: "0.7px",
//               background: getBg().bg,
//               color: getBg().text,
//             }}
//           >
//             {curNews?.type}
//           </span>
//           <span className="text-slate-500 text-sm ml-4">{curNews?.date}</span>
//         </div>

//         <div className=" bg-dark rounded-md">
//           <img
//             className=" max-h-96 w-full object-contain"
//             src={curNews?.image}
//           />
//         </div>
//         <div
//           className="my-4 pb-5"
//           style={{ borderBottom: "0.4px solid #b3b3b3" }}
//         >
//           <p className="my-2 ">{curNews?.short_description}</p>
//           <p className="">{curNews?.explanation}</p>
//         </div>
//       </div>
//       <div className="px-[10vw] container w-full gap-3 grid grid-cols-1 md:grid-cols-1 pb-4">
//         <h1 className=" text-2xl font-semibold  my-2 ">Other related news</h1>
//         {news.map(
//           (e) =>
//             e.type === curNews?.type &&
//             e.id !== curNews.id && (
//               <News
//                 title={e.title}
//                 description={e.short_description}
//                 image={e.image}
//                 date={e.date}
//                 type={e.type}
//                 id={e.id}
//               />
//             )
//         )}
//       </div>
     
//       <button
//         onClick={() => {
//           setIsChatBoxOpen((prev: any) => !prev);
//         }}
//         className="fixed bottom-2 z-30 right-8 shadow-xl p-1 rounded-full bg-dar"
//       >
//         <img
//           src={logo}
//           className="h-10 w-10 object-contain  md:h-12 md:w-12 bg-black rounded-full "
//           alt="Chat Button"
//         />
//       </button>
//     </section>
//   );
// };

// export default SingleNews;
