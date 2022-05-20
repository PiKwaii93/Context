import React, { useState } from 'react';
import { valueContext } from '../Context/Contexts';
import Side from "./Side";
import Child from "./Child";
import SideFunction from './SideFunction';
import ConsumerFunction from './ConsumerFunction';
import ContextForm from './ContextForm';


export default function Reduces() {

    const [value, setValue] = useState('');

    return(
        <div>
            <valueContext.Provider value={[value, setValue]}>
                <ContextForm/>
                <Side/>
                <Child/>
                <SideFunction />
                <ConsumerFunction/>
            </valueContext.Provider>

        </div>
    )
}