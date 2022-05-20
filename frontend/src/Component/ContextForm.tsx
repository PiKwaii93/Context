import {useContext } from 'react';
import { valueContext } from '../Context/Contexts';

export default function ContextForm() {

    const [localValue, setLocalValue] = useContext(valueContext);

    return(
        <form onSubmit={e => e.preventDefault()}>
            <input onChange={e => setLocalValue(e.target.value)} value={localValue}/>
        </form>
    )
}