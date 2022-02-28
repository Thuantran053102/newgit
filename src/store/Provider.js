import { useReducer } from "react";
import  reducer , { innitState } from "./reducer";
import Context from "./Context";

function Provider({children}){

    const [state,dispatch] = useReducer(reducer,innitState)
    //thg context sẽ nhận vào một cái useReducer và cho tất cả thg component con của nó có thể truy cập và dùng thg reducer của nó

    return(
        <Context.Provider value={[state,dispatch]}>
            {children}
        </Context.Provider>
    )
}

export default Provider
