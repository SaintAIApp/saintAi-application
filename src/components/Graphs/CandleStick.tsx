
import Chart from "react-apexcharts";

const StockChart = ({ openModal, data }: any) => {
  if (!data.data) {
    return;
  }
  const series = [{
    name: data.symbol,
    data: Object.keys(data.data).map(key => ({
      x: new Date(key).getTime(),
      y: [
        parseFloat(data.data[key]["1. open"]),
        parseFloat(data.data[key]["2. high"]),
        parseFloat(data.data[key]["3. low"]),
        parseFloat(data.data[key]["4. close"])
      ]
    }))
  }];

  const options = {
    grid: {
      borderColor: "#292929",
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
      theme: "dark",
      style: {
        fontSize: "12px",
        backgroundColor: "#333",
        color: "#fff",
      },
      marker: {
        show: true,
      },
      x: {
        show: true,
      },
      y: {
        formatter: function (val: any) {
          return val;
        }
      }
    },
    chart: {
      type: "candlestick",
      height: 350,
      width: "100%",
    },
    title: {
      text: `${data.symbol}`,
      align: "left",
      style: {
        fontSize: "16px",
        fontWeight: "normal",
        color: "#fff"
      },
    },
    xaxis: {
      type: "datetime"
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };

  return (
    <div className="flex w-full">
      <div className='w-full mr-4 mb-3'>
        {/* @ts-expect-error Unmatched type options */}
        <Chart options={options} series={series} type="candlestick" height={350} width={"100%"} />
        <div className="flex justify-end w-full">
          <button
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              openModal?.("crypto", data.symbol);

            }}
            className="bg-dark text-primary w-fit px-5 py-1 rounded-md flex z-10"
            style={{ border: "0.7px solid rgb(54 151 102)" }}
          >Analysis</button>
        </div>
      </div>
    </div>
  );
};

export default StockChart;
