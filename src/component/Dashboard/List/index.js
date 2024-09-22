import React,{ useState } from 'react';
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import {convertNumber} from "../../../function/convertNumber";
import { NavLink } from 'react-router-dom';






function List({coin}) {

  return (
    <NavLink to={`/coin/${coin.id}`}>
     <tr className='List-row'>
      <Tooltip title="Coin Logo">
          <td className='td-image'>
                <img src={coin.image} className='coin-logo coin-logo-id'/>
         </td>
         </Tooltip>
         <Tooltip title="Coin Info" placement="bottom-start">
         <td className='td-infor'>
                <div className='name-col'>
                    <p className='coin-symbol td-p'>{coin.symbol}</p>
                    <p className='coin-name td-p'>{coin.name}</p>
                 </div>
            </td>
            </Tooltip>
            <Tooltip title="Price Change In 24Hrs" placement="bottom-start">
          { coin.price_change_percentage_24h>0 ? ( 
             <td className='chip-flex'>
                    <div className='price-chip block'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    <div className='icon-chip td-icon'> 
                      <TrendingUpRoundedIcon/>
                    </div>
                 </td>
                  ): (
                    <div className='chip-flex'>
                    <div className='price-chip chip-red block2'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                    <div className='icon-chip chip-red td-icon'> 
                      <TrendingDownRoundedIcon/>
                    </div>
                 </div>
                 )}

                </Tooltip>    
                   <Tooltip title="Current Price">
                <td>
                <h3 className='coin-price td-centre-align' style={{color:coin.price_change_percentage_24h<0 ?
                  "var(--red)" 
                  : "var(--green)" }}
                  >
                    ${coin.current_price.toLocaleString()}
                    </h3>
                </td>
                </Tooltip>
                <Tooltip title="Total Volume" placement="bottom-end">
                        <td>
                        <p className='total-volume td-right-align td-total-volume'>
                      {coin.total_volume.toLocaleString()}
                      </p>
                        </td>
                 </Tooltip>
                 <Tooltip title="Market Cap" placement="bottom-end">
                        <td className='desktop-td-mkt'>
                        <p className='total-volume td-right-align'>
                      {coin.market_cap.toLocaleString()}
                      </p>
                        </td>
                     </Tooltip>

                     <Tooltip title="Market Cap" placement="bottom-end">
                        <td className='mobile-td-mkt'>
                        <p className='total-volume td-right-align'>
                      ${convertNumber(coin.market_cap)}
                      </p>
                        </td>
                     </Tooltip>
      
    </tr>
    </NavLink>
  )
}

export default List;
