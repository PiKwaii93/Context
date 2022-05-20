import React from 'react';
import { SideContext } from '../Context/Contexts';


export default function ConsumerFunction() {
    return(
        <SideContext.Consumer>
            {value => <h1 style={{color: "pink"}}>{value}</h1>}
        </SideContext.Consumer>
    )
}