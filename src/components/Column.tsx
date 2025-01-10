import React from "react";

import News from "../components/NewsCard";
// import { Pagination } from "antd";
import StockChart from "./Graphs/CandleStick";
import { FixedSizeList as List } from "react-window";

export const Column = ({
  openModal,
  curCategory,
  list,
}: {
  curCategory: string;
  list: any;
  setIsChatBoxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphSelected?: React.Dispatch<React.SetStateAction<any>>;
    openModal?: (type: string, url: string) => void;
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const data = list[index];
    return (
      <div style={style}>
        <StockChart openModal={openModal} key={index} data={data} />
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center flex-col items-center md:items-start mb-2">
      {curCategory === "news" && (
        <div className="container w-full gap-2 z-10 md:z-0 grid grid-cols-1 p-3 md:p-0 ">
          {list?.map((e: any, i: number) => (
            <News
              openModal={openModal}
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


      {(curCategory === "stocks" || curCategory === "crypto") && (
        <div className="h-full overflow-y-auto w-full z-10">
          <List
            height={document.documentElement.clientHeight}
            itemCount={list.length}
            itemSize={430} // Adjust based on the height of your row
            width="100%"
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};
