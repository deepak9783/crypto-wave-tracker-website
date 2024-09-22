import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { get100Coin } from '../../../function/get100Coin';
import "./style.css";

function SelectCoin({crypto1,crypto2,handleCoinchange}) {

    const [allCoin,setAllCoin]  = useState([]);

    const style = {   height: "2.5rem",
    color: "var(--white)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--white)",
    },
    "& .MuiSvgIcon-root": {
      color: "var(--white)",
    },
    "&:hover": {
      "&& fieldset": {
        borderColor: "#3a80e9",
      },
    }};


    useEffect(() => {
        getData();
    },[]);

   async function getData(){
    const myCoins = await  get100Coin();  
    setAllCoin(myCoins);
   }



  return (
      <div className='coin-flex'>
        <p>crypto 1</p>
         <Select
          sx={style}
          value={crypto1}
          label="crypto 1"
          onChange={(event) => handleCoinchange(event,false)}
        >
                 {allCoin && allCoin.map((coin,i) => ( 
  <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
) )}
        </Select>    

        <p>crypto 2</p>
         <Select
          sx={style}
          value={crypto2}
          label="crypto 2"
          onChange={(event) => handleCoinchange(event,true)}
        >
            {allCoin && allCoin.filter((item) => item.id != crypto2).filter((item) => item.id != crypto1).map((coin,i) => ( 
  <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
) )}
        
        </Select>  
    </div>
  )
}

export default SelectCoin;


