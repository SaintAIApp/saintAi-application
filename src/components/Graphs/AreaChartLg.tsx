import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BiArrowBack } from "react-icons/bi";
import { BsFullscreenExit } from "react-icons/bs";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Link } from "react-router-dom";

const Index = ({setIsChatBoxOpen, graphSelected, setGraphSelected ,small}: {
  graphSelected: any,
  setGraphSelected?: any,
  small?:boolean,
  setIsChatBoxOpen?:any
}) => {
  let {
    color,
    title,
    prices,
    dates,
    diff,
    name
  } = graphSelected;
  if(title===undefined)
    title = graphSelected.img
  console.log(graphSelected)
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
  const [chartState] = useState({
    series: [
      {
        name,
        data: prices || generateRandomData(30).pricesArr,
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
        width: "1"
      },
      fill: {
        colors: [color],
        type: "gradient",
        gradient: {
          shadeIntensity: 0.4,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
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
      title: {},
      labels: dates || generateRandomData(30).datesArr,
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  });
  const handleClose = () => {   setGraphSelected(null); setIsChatBoxOpen(true);}


  return (
    <div className={`p-3 ${ small ? "w-[80%] md:w-[40%] lg:w-[60%] ml-10":"w-[90%] md:w-[70%] lg:w-[90%]" }  my-5 md:my-10 shadow-md rounded-lg border border-darkSecondary bg-dark`}>
      <div className="flex space-x-2">
        <div className="max-w-fit">
        {small?<Link to="/analysis">
            <BiArrowBack/>
            </Link>:<button onClick={handleClose}>
        <BsFullscreenExit />
        </button>}
        </div>
      </div>

      <div className="w-full flex items-center flex-col-reverse md:flex-row">
        <div className="w-full md:w-[80%]">
          {prices && prices.length === 0 ? (
            <h1>Loading...</h1>
          ) : (

            <ReactApexChart
            //@ts-ignore
              options={chartState.options}
              series={chartState.series}
              type="area"
              height={450}
            />
          )}
        </div>
        <div className="w-full md:w-[20%] flex pl-4 md:pl-0 items-center md:justify-start md:self-baseline space-x-2 md:flex-col pt-4">
          <div id="left">
          <img
            className="h-12 w-12 object-contain bg-darkSecondary"
            src={title}
            alt=""
          />
          </div>
          <div id="right">
            <div id="top ">
              <h1 className="text-lg mt-2">{name}</h1>
            </div>
            <div id="bottom" className="flex md:items-center items-start">
              <span className="text-2xl font-bold mr-2">
                {prices && prices[prices.length - 1]}
              </span>
              <span
                className={`${
                  diff.charAt(0) === "+" ? "text-green-600" : "text-red-500"
                  } flex text-xl md:text-lg items-center`}
              >
                {diff} {diff.charAt(0) === "+" ? <FiArrowUp /> : <FiArrowDown />}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index;
