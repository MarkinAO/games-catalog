import style from "./Card.module.scss";
import type { GameData } from "../../../../model/types";
import Platforms from "../Platforms/Platforms";

interface ICard {
  game: GameData;
}

export default function Card({ game }: ICard) {
  return (
    <>
      <div className={style.container}>
        <div
          className={style.skin}
          style={{ backgroundImage: `url(${game.background_image})` }}
        ></div>
        <h3 className={style.name}>{game.name}</h3>
        <div className={style.rating}>Рейтинг: {game.rating}</div>
        <Platforms data={game.platforms} />
      </div>
    </>
  );
}
