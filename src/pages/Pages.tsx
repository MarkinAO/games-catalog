import { Route, Routes } from 'react-router-dom';
import Cards from './Home/Cards';
import GameCard from './GameCard/GameCard';

export default function Pages() {
    return(
        <Routes>
            <Route path='/' element={<Cards />} />
            <Route path='/:slug' element={<GameCard />} />
        </Routes>
    )
}