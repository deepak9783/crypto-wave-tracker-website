import { gettingDate } from "./convertDate"

export const settingChartData = (setChartData,prices1,prices2) => {

  if(prices2){
    setChartData({  
      labels: prices1.map((prices) => gettingDate(prices[0])),
      datasets: [{
        label:"crypto1",
        data: prices1.map((prices) => prices[1]),
        borderWidth: 1,
        fill: false,
        tension: 0.25,
        borderColor: "#3a80e9",
        pointRadius: 0,
        yAxisID: 'crypto1',
      },
      {
        label:"crypto2",
        data: prices2.map((prices) => prices[1]),
        borderWidth: 1,
        fill: false,
        tension: 0.25,
        borderColor: " #61c96f",
        pointRadius: 0,
        yAxisID: 'crypto2',
      },
    ],
  });
  }
  else{
   {(prices1 || prices2) && setChartData({ 
      labels: prices1.map((prices) => gettingDate(prices[0])),
      datasets: [{
        data: prices1.map((prices) => prices[1]),
        borderWidth: 1,
        fill: true,
        backgroundColor: "rgba(58, 128, 233,0.1)",
        tension: 0.25,
        borderColor: "#3a80e9",
        pointRadius: 0,
        yAxisID: 'crypto1',
      }]
    });}
  }

}