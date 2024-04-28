import { Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import GameCard from './GameCard/GameCard';

export default function Pages() {
    return(
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/:slug' element={<GameCard />} />
        </Routes>
    )
}