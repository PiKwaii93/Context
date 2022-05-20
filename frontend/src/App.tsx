import React from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from "react";
import useLogin from "./Hook/useLogin";
import {BlogInterface, CommentInterface, FilmInterface, LoginResponseInterface} from "./Interface/ResponsesInterfaces";
import {LocalUserInterface} from "./Interface/LocalUserInterface";
import LoginForm from "./Component/LoginForm";
import HideIfLogged from "./Component/HideIfLogged";
import useRegister from "./Hook/useRegister";
import useGetBlogList from "./Hook/useGetBlogList";
import useGetCommentList from "./Hook/useGetCommentList";
import useGetFilmList from "./Hook/useGetFilmList";
import BlogList from "./Component/BlogList";
import FilmList from "./Component/FilmList";
import CommentList from "./Component/CommentList";
import HideIfNotLogged from "./Component/HideIfNotLogged";
import BlogForm from "./Component/BlogForm";
import CommentForm from "./Component/CommentForm";
import FilmForm from "./Component/FilmForm";
import useGetCookies from "./Hook/useGetCookies";
import useEraseCookie from "./Hook/useEraseCookie";
import Compte from "./Component/Compte";
import Restriction from "./Component/Restriction";
import axios from "axios";
import {
    BrowserRouter, 
    Routes,
    Route,
    Link,
    Outlet,
    useParams,
    useNavigate
  } from "react-router-dom";
import WildCard from './Component/WildCard';
import { SearchForm } from './Component/SearchFrom';
import Reduces from "./Component/Reduces";
import ReducerApp from './Component/ReducerApp';
import ReduxAppReducer from './Component/ReduxAppReducer';
import ReduxAppTest from './Component/ReduxTodos';
import { createStore } from 'redux';
import { ReduxTodoReducerTest } from './Component/ReduxTodos';
import { ReduxTodos } from './Component/ReduxTodos';

export default function App() {


    const [xTokens, setXTokens] = useState();
    const [xUsernames, setXUsernames] = useState();
    const [xRole, setXRole] = useState();
    const [xID, setXID] = useState();


    useEffect(() => {
        let x = document.cookie
        .split(';')
        .map(cookie => cookie.split('='))
        .reduce((accumulator, [key, value]) => ({ ...accumulator, [key.trim()]: decodeURIComponent(value) }), {});

        if(x[""]!="undefined"){

            let info = (x['hetic_JWT']?.split(";"));

            setXUsernames(info[0]);
    
            setXRole(info[1]);
    
            setXID(info[2]);

            setXTokens(info[3]);


        }



    }, [])

    const [loggedUser, setLoggedUser] = useState<LoginResponseInterface>({
        status: 'error',
        token: "",
        username: ""
    })
    const [localUser, setLocalUser] = useState<LocalUserInterface>({password: "", username: ""})
    const [blogList, setBlogList] = useState<BlogInterface[]>([])
    const [commentList, setCommentList] = useState<BlogInterface[]>([])
    const [filmList, setFilmList] = useState<FilmInterface[]>([])
    // Determines if the user wants to LogIn or to Register
    const [needsLogin, setNeedsLogin] = useState<boolean>(true)
    const [needsUpdate, setNeedsUpdate] = useState<boolean>(false)

    const login = useLogin();
    const register = useRegister();
    const getBlogList = useGetBlogList();
    const getCommentList = useGetCommentList();
    const getFilmList = useGetFilmList();
    const cookies = useGetCookies();
    const eraseCookie = useEraseCookie();

    useEffect(() => {
        if (Object.keys(cookies).includes('hetic_token') && Object.keys(cookies).includes('hetic_username')) {
            console.log('got cookies !', loggedUser)
            setLoggedUser(prev => ({
                ...prev,
                username: "username",
                token: "token"
            }));
        }
    }, [])

    useEffect(() => {
        if (needsLogin && localUser.username !== '') {
            console.log('login ?')
            login(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        } else if (!needsLogin && localUser.username !== '') {
            console.log('register ?', localUser.username)
            register(localUser.username, localUser.password)
                .then(data => setLoggedUser(data))
        }
    }, [localUser])

    useEffect(() => {
        getBlogList()
            .then(data => {
                setBlogList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    useEffect(() => {
        getCommentList()
            .then(data => {
                setCommentList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])

    useEffect(() => {
        getFilmList()
            .then(data => {
                setFilmList(data)
                setNeedsUpdate(false)
            })
    }, [needsUpdate])
    

    const handleDisconnect = () => {
        setLoggedUser({
            status: 'error',
            token: "",
            username: ""
        });
        eraseCookie();
    }
    function test(){
        console.log(blogList);
    }
    function test2(){
        console.log(commentList);
    }
    function test3(){
        console.log(filmList);
    }
    function test4(){
        console.log(commentList);
    }

    const ReduxStore = createStore(ReduxTodoReducerTest, filmList);


    return (
        <div className='container mt-5'>
            <BrowserRouter>
                <ul>
                    <li><Link to="/">Accueil</Link></li>
                    <li><Link to="/create-film">Créer un film</Link></li>
                </ul>
                <SearchForm/>   
                <HideIfLogged loggedUser={loggedUser}>
                    <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
                </HideIfLogged>
                <HideIfNotLogged loggedUser={loggedUser}>
                    <button className='btn btn-danger d-block mx-auto mb-3' onClick={handleDisconnect}>Disconnect</button>
                </HideIfNotLogged>
                <Routes>
                    <Route path="/" element={<FilmList/>}/>
                    <Route path="/create-film" element={
                        <HideIfNotLogged loggedUser={loggedUser}>
                            <ReduxAppTest ReduxStore={ReduxStore} loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>
                        </HideIfNotLogged>
                        
                    }/>
                    <Route path="/:titre" element={<WildCard commentList={commentList} ReduxStore={ReduxStore} loggedUser={loggedUser} setNeedsUpdate={setNeedsUpdate}/>} />
                    <Route path="/" element={
                        <HideIfLogged loggedUser={loggedUser}>
                            <LoginForm setLocalUser={setLocalUser} needsLogin={needsLogin} setNeedsLogin={setNeedsLogin}/>
                        </HideIfLogged>
                    }/>
                </Routes>
            </BrowserRouter>

        </div>  
    )
}
