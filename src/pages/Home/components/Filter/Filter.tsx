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
    Action: false,
    Indie: false,
    Adventure: false,
    RPG: false,
    Strategy: false,
    Shooter: false,
    Casual: false,
    Simulation: false,
    Puzzle: false,
    Arcade: false,
    Platformer: false,
    Racing: false,
    Sports: false,
    Fighting: false,
    Family: false,
    Card: false,
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

                let genres = Object.keys(filters)
                    .filter(key => ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Sports', 'Fighting', 'Family', 'Card'].includes(key))
                    .map(key => filters[key] ? key : '')
                    .join(',').toLowerCase();
                while(genres[0] === ',' || genres[genres.length - 1] === ',') {
                    if(genres[0] === ',') genres = genres.slice(1)
                    if(genres[genres.length - 1] === ',') genres = genres.slice(0, -1)
                }

                const newFilters: Filters = {
                    platforms: platforms,
                    tags: tags,
                    ordering: filters['Max rating'] ? 'rating' : '',
                    genres: genres
                }
                dispatch(setNewFilters(newFilters));
                dispatch(searchQuery({...newFilters, query: query, count: 0}));
            }}
        >
            <div className={style.tags}>
                {Object.keys(filters).filter(key => key in initialState).map((key) => (
                    <label key={key} onClick={(e: any) => onCheckboxChange(e)}>
                        {key}
                        <input type="checkbox" name={key} className={style.hidden} />
                    </label>
                ))}
            </div>            
            <button>Искать</button>
        </form>
    )
}