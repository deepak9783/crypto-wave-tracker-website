import axios from "axios";
import React, { useEffect, useState } from 'react';
import Header from '../component/Common/Header';
import TabsComponent from '../component/Dashboard/Tabs';
import Search from "../component/Dashboard/Search";
import PaginationComponent from "../component/Dashboard/pagination";
import Loader from "../component/Common/Loader";
import BackToTop from "../component/Common/BackToTop";
import { get100Coin } from "../function/get100Coin";

function Dashboardpage() {

  const [coins,setCoins] = useState([]);
  const [Paginationcoins,setPaginationCoins] = useState([]);
  const [search,setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true);


  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginationCoins(coins.slice(previousIndex,previousIndex + 10));
  };

  const onSearchChange= (e) => {
    //console.log(e.target.value);
    
    setSearch(e.target.value);
  }

  var filteredCoin = coins.filter((item) =>
     item.name.toLowerCase().includes( search.toLowerCase())
   ||  item.symbol.toLowerCase().includes(search.toLowerCase() ));

  useEffect(() => {
    getData();
  },[]);

  const getData = async () =>{
    const myCoins = await  get100Coin(); 
    if(myCoins){
      setCoins(myCoins);
      setPaginationCoins(myCoins.slice(0,10));
      setisLoading(false);
    }
  }




  return (
    <>
     <Header/>
     <BackToTop/>
    { isLoading ? (
      <Loader/>
    ) : ( 
    <div>
      <Search  search={search} onSearchChange={onSearchChange}/>
      <TabsComponent coins={search ? filteredCoin : Paginationcoins}/>
      {!search && ( 
      <PaginationComponent  page={page} handlePageChange={handlePageChange}/> )}
    </div>
      )}
     </>
  );
}

export default Dashboardpage;
