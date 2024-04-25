import { useParams } from 'react-router-dom';
import style from './GameCard.module.scss';

export default function GameCard() {
    const {id} = useParams()
    return(
        <div>
            {id}
        </div>
    )
}