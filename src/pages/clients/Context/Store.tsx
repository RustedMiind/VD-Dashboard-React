import { useState } from 'react';
import { createContext } from 'react';
import { ObjectOfArray } from '../../../types/ObjectOfArray';

type childrenProps ={
    children:React.ReactNode;
} 

type IndexValue ={
    index:ObjectOfArray |undefined
    setIndex:React.Dispatch<React.SetStateAction<ObjectOfArray | undefined>>
}
export const TableContext =createContext<IndexValue|null>(null);

export  function  IndexContextProvider ({children}:childrenProps){
    let [index,setIndex]=useState <ObjectOfArray|undefined>(undefined)    
    console.log('sssaaas',index)
    return(
        <TableContext.Provider value={{index,setIndex}} >
            {children}
        </TableContext.Provider>

    )

}