import style from "./Cards.module.scss";
import Card from "./components/Card/Card";
import type { GameData } from "../../model/types";

interface ICards {
  cards: GameData[];
}

export default function Cards({ cards }: ICards) {
  return (
    <div className={style.container}>
      {cards.map((card) => {
        return (
          <div className={style.item} key={card.id}>
            <Card game={card} />
          </div>
        );
      })}
    </div>
  );
}
