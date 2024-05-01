import { useEffect, useState } from 'react';
import style from './Filter.module.scss';
import { setFilters as setNewFilters, searchQuery, setMaskFilters } from '../../../../redux/gamesSlice';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from '../../../../redux/store';
import type { Filters } from '../../../../model/types';
import  { initialStateFilters } from '../../../../model/types';

export default function Filter() {
    const [filters, setFilters] = useState<any>(initialStateFilters);
    const dispatch = useDispatch<AppDispatch>();
    const { query, maskFilters } = useSelector((state: RootState) => state.games);

    useEffect(() => {
        setFilters(maskFilters)
    }, [])

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
                    .filter(el => el !== '')
                    .join(',');

                const platforms = Object.keys(filters)
                    .filter(key => ['PC', 'Xbox', 'PlayStation', 'Linux', 'MAC'].includes(key))
                    .map(key => (filters[key]) ? key : '')
                    .filter(el => el !== '')
                    .join(',')
                    .replace('PC', '1')
                    .replace('MAC', '5')
                    .replace('Linux', '6')
                    .replace('PlayStation', '2')
                    .replace('Xbox', '3')

                const genres = Object.keys(filters)
                    .filter(key => ['Action', 'Indie', 'Adventure', 'RPG', 'Strategy', 'Shooter', 'Casual', 'Simulation', 'Puzzle', 'Arcade', 'Platformer', 'Racing', 'Sports', 'Fighting', 'Family', 'Card'].includes(key))
                    .map(key => filters[key] ? key : '')
                    .filter(el => el !== '')
                    .join(',').toLowerCase();                

                const newFilters: Filters = {
                    platforms: platforms,
                    tags: tags,
                    ordering: filters['Max rating'] ? 'rating' : '',
                    genres: genres
                }
                dispatch(setMaskFilters(filters));
                dispatch(setNewFilters(newFilters));
                dispatch(searchQuery({...newFilters, query: query, count: 0}));
            }}
        >
            <div className={style.tags}>
                {Object.keys(filters)
                    .filter(key => key in initialStateFilters)
                    .map((key) => {
                        const isChecked = maskFilters[key]                      
                        return(
                            <label 
                            key={key} 
                            onClick={(e: any) => onCheckboxChange(e)}
                            style={isChecked ? {border: '2px solid #007bff', color: '#007bff'} : {}}
                        >
                            {key}
                            <input 
                                type="checkbox" name={key} 
                                className={style.hidden}
                                defaultChecked={isChecked} 
                            />
                        </label>
                        )
                    })}
            </div>            
            <button className='button'>Искать</button>
        </form>
    )
}