import React, { memo, useEffect, useRef } from "react";
import './Select.scss'

function Select(props){
    const classRef= useRef()
    const {array , nameclass,state} =props
    const [item, setItem] =state
    
    useEffect(()=>{
        nameclass.forEach(element => {
            classRef.current.classList.add(element)
        })
    },[])
   
    return(
        <>
             <ul className={'selectList'} ref={classRef}>
                {
                    array.map((item,index)=>
                        <li className="insuranceItem selectItem" key={index} onMouseOver={()=>{setItem(item)}}>{item}</li>
                    )
                }           
            </ul>
        </>
    )
}
export default memo(Select)