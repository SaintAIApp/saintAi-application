
import Chart from "react-apexcharts";

const StockChart = ({ data }: any) => {
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
      <div className='w-full mr-4'>
        {/* @ts-expect-error Unmatched type options */}
        <Chart options={options} series={series} type="candlestick" height={350} width={"100%"} />
      </div>
    </div>
  );
};

export default StockChart;
