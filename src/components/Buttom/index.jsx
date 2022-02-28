import { memo, useEffect, useRef } from 'react'
import './Buttom.scss'


 function Buttom(props){
    const spanRef=useRef()
    const iconRef= useRef()
    const {spanClass,iconClass,content} = props
    useEffect(()=>{
        spanClass.forEach(element => {
            spanRef.current.classList.add(element)
        });
        iconClass.forEach(element=>{
            iconRef.current.classList.add(element)
        })
    },[])
   
    console.log(spanClass)
    return(
        
        <span className="btn btns" ref={spanRef}>
             <i className="mdi  font-20 mr-1" ref={iconRef}></i>{content}
        </span>
    )
}
export default memo(Buttom)