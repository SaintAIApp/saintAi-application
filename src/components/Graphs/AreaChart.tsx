import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BiFullscreen } from "react-icons/bi";

import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { GrDrag } from "react-icons/gr";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

export const Graph = ({
  color,
  id,
  img,
  curCategory,
  prices,
  dates,
  diff,
  name,
  type,
  setGraphSelected,
  setIsChatBoxOpen,
}: {
  curCategory: string;
  color: "#fc2003" | "#038514";
  id: number;
  img: string;
  prices: number[];
  dates: string[];
  diff: string;
  name: string;
  type: string;
  setGraphSelected: React.Dispatch<any>;
  setIsChatBoxOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [pricesList, setPrices] = useState<number[]>(prices);
  const [datesList, setDates] = useState<string[]>(dates);

  useEffect(() => {
    setPrices([...prices]);
    setDates([...dates]);
  }, [curCategory]);

  const [chartState] = useState({
    series: [
      {
        name,
        data: pricesList,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: [color],
        width: "1",
      },
      fill: {
        colors: [color],
        type: "gradient",
        gradient: {
          shadeIntensity: 0.3,
          opacityFrom: 0.5,
          opacityTo: 0.9,
          stops: [0, 100, 90],
        },
      },
      title: {},
      labels: datesList,
      xaxis: {
        type: "datetime",
        
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
    
      },
      grid: {
        borderColor: '#292929',
        strokeDashArray: 0,
        xaxis: {
          lines: {
            show: false,
          }
        },
        yaxis: {
          lines: {
            show: true,
          }
        },
      },
      tooltip: {
        theme: 'dark', // or 'light'
        style: {
          fontSize: '12px',
          backgroundColor: '#333', // Set your desired background color
          color: '#fff', // Set your desired text color
        },
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
        y: {
          formatter: function (val:any) {
            return val;
          }
        }
      }

    },
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {}, [curCategory]);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsChatBoxOpen&& setIsChatBoxOpen(false);
    setGraphSelected({
      color,
      id,
      img,
      curCategory,
      prices,
      dates,
      diff,
      name,
    });
  };

  return (
    <div
      style={style}
      className="px-3 bg-dark w-[90%] md:w-[100%] lg:w-[90%] my-5 md:mb-10 shadow-md rounded-lg border border-darkSecondary "

    >
      <div className="flex space-x-2 items-center">
        <div
          className="max-w-fit h-full"
          ref={setNodeRef}
          {...attributes}
          {...listeners}
        >
          <GrDrag />
        </div>
        <div className="max-w-fit h-full">
          <button onClick={handleClick}>
            <BiFullscreen />
          </button>
        </div>
        <div className="max-w-fit h-full">
          <Link to={`/graph/${type}/${id}`}>
            <RxArrowTopRight />
          </Link>
        </div>
      </div>

      <div className="w-full flex items-center flex-col-reverse md:flex-row">
        <div className="w-full md:w-[80%]">
          {pricesList.length === 0 ? (
            <h1>Loading...</h1>
          ) : (
            <ReactApexChart
              //@ts-ignore
              options={chartState.options}
              series={chartState.series}
              type="area"
              height={200}
            />
          )}
        </div>
        <div className="w-full md:w-[20%] flex pl-4 md:pl-0 items-center md:justify-start md:self-baseline space-x-2 md:flex-col pt-4">
          <div id="left">
            <img
              className="h-12 w-12 object-contain bg-dark"
              src={img}
              alt=""
            />
          </div>
          <div id="right">
            <div id="top ">
              <h1 className="text-lg mt-2">{name}</h1>
            </div>
            <div id="bottom" className="flex md:items-center items-start">
              <span className="text-2xl font-bold mr-2">
                {prices[prices.length - 1]}
              </span>
              <span
                className={`${
                  diff.charAt(0) === "+" ? "text-green-600" : "text-red-500"
                } flex text-xl md:text-lg items-center`}
              >
                {diff}{" "}
                {diff.charAt(0) === "+" ? <FiArrowUp /> : <FiArrowDown />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
