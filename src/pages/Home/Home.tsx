import style from "./Home.module.scss";
import Card from "./components/Card/Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getGames } from "../../redux/gamesSlice";
import Loader from "../../ui/loader/Loader";
import Search from "./components/Search/Search";
import ScrollUp from "../../ui/scrollUp/ScrollUp";
import Filter from "./components/Filter/Filter";

export default function Cards() {
  const dispatch = useDispatch<AppDispatch>();
  const games = useSelector((state: RootState) => state.games.games);
  const loading = useSelector((state: RootState) => state.games.load);
  
  useEffect(() => {
    if(games.length === 0) dispatch(getGames(0))
  }, [])

  useEffect(() => {

  },[games])

  return (
    <div className={style.wrap}>
      <Search />
      <Filter />
      <ScrollUp />
      {loading && <Loader />}
      {!loading &&
      <div className={style.container}>
        {games.map((card) => {
          return (
            <div className={style.item} key={card.id}>
              <Link to={`/${card.slug}`}>
                  <Card game={card} />
              </Link>            
            </div>
          );
        })}
      </div>}
    </div>    
  );
}
