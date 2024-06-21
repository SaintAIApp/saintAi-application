
const index = ({curCategory,changeCategory}:{
    curCategory:string,
    changeCategory: (s:string)=>void
}) => {
  return (
    <div className=" bg-black ">
          <ul className="w-full text-sm h-full  flex justify-center bg-black text-white space-x-5  cursor-pointer  ">
              <li
                className={`${
                  curCategory === "stocks" ? "font-semibold" : ""
                } px-2 py-1`}
                style={{
                  borderBottom:
                    curCategory === "stocks" ? "1px solid white" : "",
                }}
                onClick={() => changeCategory("stocks")}
              >
                Stocks
              </li>
              <li
                className={`${
                  curCategory === "crypto" ? "font-semibold" : ""
                } px-2 py-1`}
                style={{
                  borderBottom:
                    curCategory === "crypto" ? "1px solid white" : "",
                }}
                onClick={() => changeCategory("crypto")}
              >
                Crypto
              </li>
              <li
                className={`${
                  curCategory === "forex" ? "font-semibold" : ""
                } px-2 py-1`}
                style={{
                  borderBottom:
                    curCategory === "forex" ? "1px solid white" : "",
                }}
                onClick={() => changeCategory("forex")}
              >
                Forex
              </li>
              <li
                className={`${
                  curCategory === "news" ? "font-semibold" : ""
                } px-2 py-1`}
                style={{
                  borderBottom: curCategory === "news" ? "1px solid white" : "",
                }}
                onClick={() => changeCategory("news")}
              >
                News Articles
              </li>
            </ul>
    </div>
  )
}

export default index