import React from 'react';
import { SideContext } from '../Context/Contexts';


export default class Side extends React.Component {
    render(){
        return(
            <h1 style={{color: "blue"}}>{this.context}</h1>
        )
    }
}

Side.contextType = SideContext ;