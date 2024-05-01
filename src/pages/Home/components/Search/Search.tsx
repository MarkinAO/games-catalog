import { useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import { searchQuery, setQuery as setQueryInStore } from '../../../../redux/gamesSlice';


export default function Search() {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.games.filters);

    return(
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(searchQuery({...filters, query: query, count: 0}))
                console.log('Search:' ,{...filters, query: query, count: 0})
            }}
            className={style.form}
            >
            <input 
                type="text" 
                value={query} 
                onChange={(e) => {
                    setQuery(e.target.value);
                    dispatch(setQueryInStore(e.target.value));
                }}
                className={style.search}
                placeholder='Поиск'
            />
        </form>
    )
}