import React, { useEffect, useState } from "react";
import { get100Coin } from '../function/get100Coin';
import Header from '../component/Common/Header';
import SelectCoin from '../component/Compare/SelectCoin';
import SelectDays from '../component/Coin/SelectDays';
import { getCoinData } from '../function/getCoinData';
import { settingCoinObject } from '../function/convertObject';
import { getPrices } from '../function/getCoinPrices';
import Loader from '../component/Common/Loader';
import List from "../component/Dashboard/List";
import CoinInfo from "../component/Coin/CoinInfo";
import LineChart from "../component/Coin/LineChart";
import { settingChartData } from "../function/settingChartData";
import TogglePrice from "../component/Coin/PriceType";


function Compare() {
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  // id states
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  // data states
  const [coin1Data, setCoin1Data] = useState({});
  const [coin2Data, setCoin2Data] = useState({});
  // days state
  const [days, setDays] = useState(30);
  const [priceType, setPriceType] = useState("prices");
//chart data
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const coins = await get100Coin();
    if (coins) {
      setAllCoins(coins);
      const data1 = await getCoinData(crypto1);
      const data2 = await getCoinData(crypto2);
      console.log("both1",data1,data2);
      
      settingCoinObject(data1, setCoin1Data);
      settingCoinObject(data2, setCoin2Data);
      if (data1 && data2) {
        // getPrices
        const prices1 = await getPrices(crypto1, days, priceType);
        const prices2 = await getPrices(crypto2, days, priceType);
       
        settingChartData(setChartData, prices1, prices2);
        setLoading(false);
      }
    }
  };

  const handleCoinchange = async (e, isCoin2) => {
    setLoading(true);
    if (isCoin2) {
      const newCrypto2 = e.target.value;
      // crypto2 is being changed
      setCrypto2(newCrypto2);
      // fetch coin2 data
      const data2 = await getCoinData(newCrypto2);
      console.log("both2",data2);
     { data2 && settingCoinObject(data2, setCoin2Data);
      // fetch prices again
      const prices1 = await getPrices(crypto1, days, priceType);
      const prices2 = await getPrices(newCrypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2);}
    } else {
      const newCrypto1 = e.target.value;
      // crypto1 is being changed
      setCrypto1(newCrypto1);
      // fetch coin1 data
      const data1 = await getCoinData(newCrypto1);
      console.log("both3",data1);
     { data1 && settingCoinObject(data1, setCoin1Data);
      // fetch coin prices
      const prices1 = await getPrices(newCrypto1, days, priceType);
      const prices2 = await getPrices(crypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2);}
    }
    setLoading(false);
  };

  const handleDaysChange = async (e) => {
    const newDays = e.target.value;
    setLoading(true);
    setDays(newDays);
    const prices1 = await getPrices(crypto1, newDays, priceType);
    const prices2 = await getPrices(crypto2, newDays, priceType);
     settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };

  const handlePriceTypeChange = async (e) => {
    const newPriceType = e.target.value;
    setLoading(true);
    setPriceType(newPriceType);
    const prices1 = await getPrices(crypto1, days, newPriceType);
    const prices2 = await getPrices(crypto2, days, newPriceType);
    settingChartData(setChartData, prices1, prices2);
    setLoading(false);
  };


  return (
    <div>
      <Header />
      {loading || !coin1Data?.id || !coin2Data?.id ? (
        <Loader />
      ) : (
        <>
        <div className="coin-days-flex">
          <SelectCoin
            allCoins={allCoins}
            crypto1={crypto1}
            crypto2={crypto2}
            handleCoinchange={handleCoinchange}
          />
          <SelectDays days={days} handleDaysChange={handleDaysChange} />
          </div>
          <div className='darkgrey-wrapper' style={{padding:"0rem 1rem"}}>
          <List coin={coin1Data} />
        </div>

      <div className='darkgrey-wrapper' style={{padding:"0rem 1rem"}}>
      <List coin={coin2Data} />
      </div>
      <div className='darkgrey-wrapper'>
      <TogglePrice priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/> 
      <LineChart chartData={chartData} priceType={priceType} multiAxis={true}/> 
      </div>
      <CoinInfo heading={coin1Data.name} desc={coin1Data.desc} />
      <CoinInfo heading={coin2Data.name} desc={coin2Data.desc} />
        </>
      )}
    
    </div>
  );
}

export default Compare;