import { useState, useEffect } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import  {Graph}  from "../components/Graphs/AreaChart";
import News from "../components/NewsCard";
import news from '../mock/news.json'
export const Column = ({
  curCategory,
  list,
  setIsChatBoxOpen,
  setGraphSelected
}: {
  curCategory: string;
  list: any;
  setIsChatBoxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphSelected:React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [graphData, setGraphData] = useState<any[]>([]);

  useEffect(() => {
    const generateRandomData = (count: number) => {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - count);

      const pricesArr: number[] = [];
      const datesArr: any[] = [];

      for (let i = 0; i < count; i++) {
        const price = Math.floor(Math.random() * 100) + 50;
        pricesArr.push(price);

        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        datesArr.push(date.toISOString().slice(0, 10));
      }

      return { pricesArr, datesArr };
    };

    const newGraphData = list.map((task: any) => {
      const { pricesArr, datesArr } = generateRandomData(30);
      return {
        prices: pricesArr,
        dates: datesArr,
        curCategory: curCategory,
        color: task.color,
        key: task.id,
        id: task.id,
        img: task.title,
        name: task.name,
        diff: task.diff,
        type: task.type
      };
    });

    setGraphData(newGraphData);
  }, [curCategory, list]);
  // const [graphSelected, setGraphSelected] = useState<any>(null);
  return (
    <div className="column w-full flex justify-center flex-col items-center md:items-start mb-2 ">
    
      {graphData.length == 0 && curCategory === "news" && (
        <div className="container  w-full gap-2  grid grid-cols-1 md:grid-cols-1 ">
         {
          news.map((e,i)=>(<News key={i} title={e.title}
            description={e.short_description}
            image={e.image}
            date={e.date}
            type={e.type} 
            id={e.id}
            
          />))
         }
        </div>
      )}
      <SortableContext items={graphData} strategy={verticalListSortingStrategy}>
        {graphData.map((data: any) => (
          <Graph
            type={data.type}
            setIsChatBoxOpen={setIsChatBoxOpen} 
            setGraphSelected={setGraphSelected}
            diff={data.diff || "+0%"}
            prices={data.prices}
            dates={data.dates}
            name={data.name || ""}
            curCategory={data.curCategory}
            color={data.color}
            key={data.id}
            id={data.id}
            img={data.img}
          />
        ))}
      </SortableContext>
    </div>
  );
};
