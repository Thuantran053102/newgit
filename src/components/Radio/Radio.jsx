
import React, { useRef, useEffect, memo } from "react";
import style from './Radio.scss'


function Radio(props){
 
    const {array,start} = props
    const [retailPrice,setRetailPrice] = start
    return(
    <>
        {
            array.map((item)=>{
                return(
                <div key={item.id}  className='custom-control custom-radio align-content-end mt-1'>
                    <input type='radio'checked={retailPrice === item.id}onChange={()=>setRetailPrice(item.id)} className='custom-control-input'/>
                    {item.namePrice}
                </div>
                )
            })
        }
    </>
    )
}
export default memo(Radio)