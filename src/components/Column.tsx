import React, { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import News from "../components/NewsCard";
import { Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const itemRender = (_: number, type: any, originalElement: any) => {
    if (type === "jump-next" || type === "jump-prev") {
      return null;
    }
    return originalElement;
  };
  const paginatedList = list?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className=" w-full flex justify-center flex-col items-center md:items-start mb-2   ">
      {curCategory === "news" && (
        <div className="container w-full gap-2 grid grid-cols-1 md:grid-cols-1 ">
          {paginatedList?.map((e: any, i: number) => (
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

      {(curCategory === "stocks" || curCategory === "crypto") && (
        <SortableContext
          items={paginatedList ?? []}
          strategy={verticalListSortingStrategy}
        >
          {paginatedList?.map((data: any, index: number) => (
            <StockChart key={index} data={data} />
          ))}
        </SortableContext>
      )}

      <Pagination
        itemRender={itemRender}
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        total={list?.length}
        onChange={handlePageChange}
        className="mt-4"
        // Custom styles to match your theme
        style={{
          marginTop: "16px",
        }}
      />
    </div>
  );
};
