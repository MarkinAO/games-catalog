import { useParams } from 'react-router-dom';
import style from './GameCard.module.scss';
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Slider from './components/Sider/Slider';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function GameCard() {
    const { slug } = useParams();
    const games = useSelector((state: RootState) => state.games.games);
    const game = games.find(game => game.slug === slug);
    const players = game && game.tags.find(el => el.name.toLowerCase() === 'multiplayer') ? 'Доступен' : 'Не доступен';
    
    return(
        <div className={style.container}>
            {game &&
                <>
                    <h1>{game.name}</h1>
                    <Slider images={game.short_screenshots} />
                    <div className={style.description}>
                        <div><b>Рейтинг:</b> {game.rating}</div>                        
                        <p>
                            <b>Язык: </b>
                            {game.tags[0].language}
                        </p>
                        <p>
                            <b>Мультиплеер: </b>
                            {players}
                        </p>
                        <div className={style.platforms}>
                            <b>Доступно на платформах:</b>
                            {game.platforms.map(el => {
                                return <span key={uuidv4()}>{el.platform.name}</span>
                            })}                            
                        </div>
                    </div>
                </>                
            }
            <div className={style.buttonWrap}>
                <Link to={'/'} className={style.backButton}>Назад</Link>
            </div>            
        </div>
    )
}