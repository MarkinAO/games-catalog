import style from "./Cards.module.scss";
import Card from "./components/Card/Card";
import type { GameData } from "../../model/types";
import { Link } from "react-router-dom";

interface ICards {
  cards: GameData[];
}

export default function Cards({ cards }: ICards) {
  return (
    <div className={style.container}>
      {cards.map((card) => {
        return (
          <div className={style.item} key={card.id}>
            <Link to={`/${card.id}`}>
                <Card game={card} />
            </Link>            
          </div>
        );
      })}
    </div>
  );
}
