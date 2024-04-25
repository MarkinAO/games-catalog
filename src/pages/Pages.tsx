import { Route, Routes } from 'react-router-dom';
import Cards from './Home/Cards';
import GameCard from './GameCard/GameCard';

import { useEffect, useState } from 'react';
import axios from 'axios';

const url = `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}`

export default function Pages() {
    const [list, setList] = useState([]);
    useEffect(() => {
        axios.get(url).then(res => {
        if(res.status === 200) {
            setList(res.data.results)
            console.log(res.data.results)
        }
        })
    }, [])

    return(
        <Routes>
            <Route path='/' element={<Cards cards={list}/>} />
            <Route path='/:id' element={<GameCard />} />
        </Routes>
    )
}