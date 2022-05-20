import React from 'react';
import { useState, useEffect } from 'react';
import useGetFilmList from '../Hook/useGetFilmList';
import { FilmInterface } from '../Interface/ResponsesInterfaces';
import { createStore } from 'redux';
import { ReduxTodoReducerTest } from '../Component/ReduxTodos';


export function test(){
    const [filmList, setFilmList] = useState<FilmInterface[]>([]);
    const getFilmList = useGetFilmList();

    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    useEffect(() => {
        getFilmList()
            .then(data => {
                setFilmList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate]);

    return(filmList);

}

export function meow(){
    const ReduxStore = createStore(ReduxTodoReducerTest, test());
    return ReduxStore.getState();
}

export const ThemeContext = React.createContext("Maurice");
export const SideContext = React.createContext("Side Thing");

export const valueContext = React.createContext();