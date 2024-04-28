import { useState } from 'react';
import style from './Search.module.scss';
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../redux/store";
import { searchQuery } from '../../../../redux/gamesSlice';

export default function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    return(
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(searchQuery({query, count: 0}))
            }}
            className={style.form}
            >
            <input 
                type="text" 
                value={query} 
                onChange={(e) => {setQuery(e.target.value)}}
                className={style.search}
                placeholder='Поиск'
            />
        </form>
    )
}