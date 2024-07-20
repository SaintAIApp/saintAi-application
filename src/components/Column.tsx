import React from "react";

import News from "../components/NewsCard";
// import { Pagination } from "antd";
import StockChart from "./Graphs/CandleStick";

export const Column = ({
  curCategory,
  list,
}: {
  curCategory: string;
  list: any;
  setIsChatBoxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphSelected?: React.Dispatch<React.SetStateAction<any>>;
}) => {
  return (
    <div className=" w-full flex justify-center flex-col items-center md:items-start mb-2   ">
      {curCategory === "news" && (
        <div className="container w-full gap-2 grid grid-cols-1 md:grid-cols-1 ">
          {list?.map((e: any, i: number) => (
            <News
              key={i}
              title={e.title}
              description={e.summary}
              image={e.banner_image}
              date={e.time_published}
              type={
                e.topics && e.topics?.length > 0 ? e.topics[0].topic : "Finance"
              }
              id={e.id}
              url={e.url}
            />
          ))}
        </div>
      )}

      {(curCategory === "stocks" || curCategory === "crypto") &&
        list?.map((data: any, index: number) => (
          <StockChart key={index} data={data} />
        ))}
    </div>
  );
};
