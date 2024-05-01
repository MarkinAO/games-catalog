import { useEffect, useState } from 'react';
import style from './Search.module.scss';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../../redux/store";
import { searchQuery, setQuery as setQueryInStore } from '../../../../redux/gamesSlice';


export default function Search() {
    const [currentQuery, setCurrentQuery] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const {filters, warning, query} = useSelector((state: RootState) => state.games);

    useEffect(() => {
        query.length > 0 && setCurrentQuery(query)
    }, [])

    return(
        <form 
            onSubmit={(e) => {
                e.preventDefault()
                dispatch(searchQuery({...filters, query: currentQuery, count: 0}))
            }}
            className={style.form}
            >
            <input 
                type="text" 
                value={currentQuery} 
                onChange={(e) => {
                    setCurrentQuery(e.target.value);
                    dispatch(setQueryInStore(e.target.value));
                }}
                className={style.search}
                placeholder='Поиск'
            />
            <div className={style.warning}>{warning}</div>
        </form>
    )
}