import React, { useEffect, useState } from "react";
import { get100Coin } from "../function/get100Coin";
import Header from "../component/Common/Header";
import TabsComponent from "../component/Dashboard/Tabs";
import Button from "../component/Common/Button";
import { NavLink } from "react-router-dom";


function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  const [coins, setCoins] = useState([]);
  

  useEffect(() => {
    if (watchlist) {
      getData();
    }
  }, []);

  const getData = async () => {
    const allCoins = await get100Coin();
    if (allCoins) {
      setCoins(allCoins.filter((coin) => watchlist.includes(coin.id)));
    }
  };

  return (
    <div>
      <Header />
      {watchlist?.length > 0 ? (
        <TabsComponent coins={coins} />
      ) : (
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
       <NavLink to="/Dashboard">
          <Button text={"Dashboard"}
            onClick={()=>console.log("btn clicked")}/>
          </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}

export default Watchlist;