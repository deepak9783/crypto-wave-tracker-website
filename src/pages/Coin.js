import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Header from '../component/Common/Header';
import Loader from '../component/Common/Loader';
import { settingCoinObject } from '../function/convertObject';
import List from '../component/Dashboard/List';
import CoinInfo from '../component/Coin/CoinInfo';
import { getCoinData } from '../function/getCoinData';
import { getPrices } from '../function/getCoinPrices';
import LineChart from '../component/Coin/LineChart';
import { gettingDate } from '../function/convertDate';
import SelectDays from '../component/Coin/SelectDays';
import { settingChartData } from '../function/settingChartData';
import TogglePrice from '../component/Coin/PriceType';






function CoinPage() {
    const {id} = useParams();
    const [isLoading, setisLoading] = useState(true);
    const [coinData , setCoinData]  = useState();
    const [chartData, setChartData] = useState([]); 
    const [days, setDays] =useState(60);
    const [priceType, setPriceType] = useState('Prices');


    useEffect(() => {
        if(id){
            getData();
        }

    },[id]);

    async function  getData (){
      const data = await getCoinData(id);
      if(data){
        settingCoinObject(data,setCoinData);
        const prices = await getPrices(id,days,priceType);
        console.log("hii");
        if(prices.length>0){
          settingChartData(setChartData,prices);
            setisLoading(false);
        }
      }
};



  
    const handleDaysChange =async  (event) => {
      setisLoading(true);
      setDays(event.target.value);
      const prices = await getPrices(id,event.target.value,priceType);
      if(prices.length >0){ 
        settingChartData(setChartData,prices);
        setisLoading(false);
      }
    };


    const handlePriceTypeChange = async (event, newType) => {
      setisLoading(true);
      setPriceType(newType);
      const prices = await getPrices(id,days,newType);
         
      if(prices.length > 0){ 
        settingChartData(setChartData,prices);
        setisLoading(false);
      }
    };

   
    
  return (
    <div>
     <Header/>
     {isLoading ? <Loader/> : 
      <>
      <div className='darkgrey-wrapper' style={{padding:"0rem 1rem"}}>
      <List coin={coinData}/>
      </div>
      <div className='darkgrey-wrapper'>
        <SelectDays days={days} handleDaysChange={handleDaysChange}/>
        <TogglePrice priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/> 
        <LineChart chartData={chartData} priceType={priceType}/> 
      </div>
      <CoinInfo heading={coinData.name} desc={coinData.desc} />
      </>}

    </div>
  )
}

export default CoinPage;

