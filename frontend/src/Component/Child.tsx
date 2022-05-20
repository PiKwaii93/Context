import React from 'react';
import { ThemeContext } from '../Context/Contexts';


export default class Child extends React.Component {
    static contextType = ThemeContext;

    render() {
        return <h1 style={{color: 'green'}}>{this.context}</h1>
    }
}