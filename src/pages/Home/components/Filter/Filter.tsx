import { useState } from 'react';
import style from './Filter.module.scss';
import { setFilters as setNewFilters, searchQuery } from '../../../../redux/gamesSlice';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from '../../../../redux/store';
import type { Filters } from '../../../../model/types';

const initialState = {
    Multiplayer: false,
    Singleplayer: false,
    PC: false,
    Xbox: false,
    PlayStation: false,
    Linux: false,
    MAC: false,
    Rus: false,
    'Max rating': false
}

export default function Filter() {
    const [filters, setFilters] = useState<any>(initialState);
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector((state: RootState) => state.games.query);

    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFilters = {...filters, [`${e.target.name}`]: e.target.checked};
        setFilters({...newFilters});
        const label = e.target.parentElement as HTMLLabelElement;
        if (e.target.checked) {
            label.setAttribute('style', 'border: 2px solid #007bff; color: #007bff;');
        } else {
            label.removeAttribute('style');
        }
    }

    return(
        <form 
            className={style.container}
            onSubmit={(e) => {
                e.preventDefault()                
                const tags = Object.keys(filters)
                    .filter(key => ['Multiplayer', 'Singleplayer'].includes(key))
                    .map(key => filters[key] ? key.toLowerCase() : '')
                    .join(',').replace(/^,|,$/g, '').replace(/\,\s*,/g, ',');

                let platforms = Object.keys(filters)
                    .filter(key => ['PC', 'Xbox', 'PlayStation', 'Linux', 'MAC'].includes(key))
                    .map(key => filters[key] ? key : '')
                    .join(',')
                    .replace(/^,|,$/g, '')
                    .replace(/\,\s*,/g, ',')
                    .replace('PC', '1')
                    .replace('MAC', '5')
                    .replace('Linux', '6')
                    .replace('PlayStation', '2')
                    .replace('Xbox', '3')
                while(platforms[0] === ',') {
                    platforms = platforms.slice(1)
                }

                const newFilters: Filters = {
                    platforms: platforms,
                    tags: tags,
                    ordering: filters['Max rating'] ? 'rating' : '',
                    Rus: filters.lang ? '&filter[voice_language]=russian' : ''
                }
                dispatch(setNewFilters(newFilters));
                dispatch(searchQuery({...newFilters, query: query, count: 0}));
            }}
        >
            {Object.keys(filters).filter(key => key in initialState).map((key) => (
                <label key={key} onClick={(e: any) => onCheckboxChange(e)}>
                    {key}
                    <input type="checkbox" name={key} className={style.hidden} />
                </label>
            ))}
            <button>Применить</button>
        </form>
    )
}