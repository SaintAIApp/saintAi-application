import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateCurCategory } from "../redux/slices/widgetSlice";
import { GoGraph } from "react-icons/go";
// import { FaBitcoin } from "react-icons/fa";

import { FaBitcoin, FaNewspaper } from "react-icons/fa6";

const index = () => {
  const dispatch = useAppDispatch();
  const { curCategory, genericType } = useAppSelector((state) => {
    return state.widget;
  });
  return (
    <div className="  left-0  w-full  pb-3 z-50 ">
      <ul className="w-full  text-sm h-full  flex justify-start text-white space-x-2 md:space-x-5  cursor-pointer  ">
        <li
          className={`${
            curCategory === "stocks" ? "font-semibold text-[#17B982]" : ""
          } px-3 py-2 flex items-center rounded-full`}
          style={{
            background: curCategory === "stocks" ? "#292929" : "",
          }}
          onClick={() =>
            dispatch(updateCurCategory({ curCategory: "stocks", genericType }))
          }
        >
          <GoGraph className="mr-2" /> Stocks
        </li>
        <li
          className={`${
            curCategory === "crypto" ? "font-semibold text-[#CC9900]" : ""
          } px-2 py-1 flex items-center rounded-full`}
          style={{
            background: curCategory === "crypto" ? "#292929" : "",
          }}
          onClick={() =>
            dispatch(updateCurCategory({ curCategory: "crypto", genericType }))
          }
        >
          <FaBitcoin
            className="mr-2"
            style={{
              color: curCategory === "crypto" ? "#CC9900" : "",
            }}
          />{" "}
          Crypto
        </li>

        <li
          className={`${
            curCategory === "news" ? "font-semibold text-blue" : ""
          } px-2 py-1 flex items-center rounded-full`}
          style={{
            background: curCategory === "news" ? "#292929" : "",
          }}
          onClick={() =>
            dispatch(updateCurCategory({ curCategory: "news", genericType }))
          }
        >
          <FaNewspaper className=" mr-2" /> News Articles
        </li>
      </ul>
      <div></div>
    </div>
  );
};

export default index;
