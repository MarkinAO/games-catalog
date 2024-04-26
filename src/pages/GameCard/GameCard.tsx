import { useParams } from 'react-router-dom';
import style from './GameCard.module.scss';
import type { GameData } from '../../model/types';

interface IGameCard {
    data: GameData
}

export default function GameCard() {
    const {id} = useParams()

    return(
        <div className={style.container}>
            {/* <h1>{data.name}</h1> */}
            {id}
        </div>
    )
}