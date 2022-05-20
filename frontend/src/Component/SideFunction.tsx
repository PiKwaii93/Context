import React from 'react';
import { valueContext } from '../Context/Contexts';


export default function SideFunction(){
    const myContext = React.useContext(valueContext);

    return(
        <h1 style={{color: 'red'}}>{myContext}</h1>
    )
}